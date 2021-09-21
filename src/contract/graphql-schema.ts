import { makeExecutableSchema } from '@graphql-tools/schema';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { compatibleRPCUrl, summonersContractAbi, summonersContractAddress, attributesContractAbi, attributesContractAddress, rarityContractAbi, rarityContractAddress, goldContractAbi, goldContractAddress, skillsContractAbi, skillsContractAddress } from '@contract';
import { AbilityScore, ClassSkillSet, Summoner } from '@models';
import { Status, SummonerClassList } from '@utilities';

const schema = `
  type Summoner {
    listId: String!
    tokenID: String!
    owner: String!
    buyer: String!
    price: String!
    payout: String!
    status: Int!
  }

  type AbilityScore {
    strength: Int!
    dexterity: Int!
    constitution: Int!
    intelligence: Int!
    wisdom: Int!
    charisma: Int!
  }

  type SummonerData {
    summoner: Summoner!
    abilityScore: AbilityScore!
    class: String!
    level: String!
    xp: String
    gold: String
    skills: [Int!]!
  }

  type ClassSkillSet {
    id: Int!
    skillName: String
    active: Boolean!
  }

  type Query {
    summonerDataList: [SummonerData]!
    classSkills: [[ClassSkillSet!]!]!
  }
`;

const web3 = new Web3(new Web3.providers.HttpProvider(compatibleRPCUrl));

const resolvers = {
  Summoner: {
    listId: (summoner: any) => summoner.listId,
    tokenID: (summoner: any) => summoner.tokenID,
    owner: (summoner: any) => summoner.owner,
    buyer: (summoner: any) => summoner.buyer,
    price: (summoner: any) => summoner.price,
    payout: (summoner: any) => summoner.payout,
    status: (summoner: any) => summoner.status,
  },
  AbilityScore: {
    strength: (abilityScore: AbilityScore) => abilityScore.strength,
    dexterity: (abilityScore: AbilityScore) => abilityScore.dexterity,
    constitution: (abilityScore: AbilityScore) => abilityScore.constitution,
    intelligence: (abilityScore: AbilityScore) => abilityScore.intelligence,
    wisdom: (abilityScore: AbilityScore) => abilityScore.wisdom,
    charisma: (abilityScore: AbilityScore) => abilityScore.charisma,
  },
  SummonerData: {
    summoner: (summoner: Summoner) => summoner,
    abilityScore: async (summoner: Summoner) => {
      const attributesContract = new web3.eth.Contract(attributesContractAbi as unknown as AbiItem, attributesContractAddress);
      return attributesContract.methods.ability_scores(summoner.tokenID.toString()).call();
    },
    class: async (summoner: Summoner) => {
      const rarityContract = new web3.eth.Contract(rarityContractAbi as unknown as AbiItem, rarityContractAddress);
      return rarityContract.methods.class(summoner.tokenID.toString()).call();
    },
    level: async (summoner: Summoner) => {
      const rarityContract = new web3.eth.Contract(rarityContractAbi as unknown as AbiItem, rarityContractAddress);
      return rarityContract.methods.level(summoner.tokenID.toString()).call();
    },
    gold: async (summoner: Summoner) => {
      const goldContract = new web3.eth.Contract(goldContractAbi as unknown as AbiItem, goldContractAddress);
      return goldContract.methods.balanceOf(summoner.tokenID.toString()).call();
    },
    skills: async (summoner: Summoner) => {
      const skillsContract = new web3.eth.Contract(skillsContractAbi as unknown as AbiItem, skillsContractAddress);
      return skillsContract.methods.get_skills(summoner.tokenID.toString()).call();
    },
  },
  ClassSkillSet: {
    id: (classSkillSet: ClassSkillSet) => classSkillSet.id,
    skillName: (classSkillSet: ClassSkillSet) => classSkillSet.skillName,
    active: (classSkillSet: ClassSkillSet) => classSkillSet.active,
  },
  Query: {
    summonerDataList: async () => {
      const summonerContract = new web3.eth.Contract(summonersContractAbi as unknown as AbiItem, summonersContractAddress);
      const summoners = await summonerContract.methods.getAllSummoners().call() as Summoner[];
      return summoners.filter(s => s.status.toString() === Status.LISTED.toString());
    },
    classSkills: async () => {
      const skillsContract = new web3.eth.Contract(skillsContractAbi as unknown as AbiItem, skillsContractAddress);

      const classSkills: ClassSkillSet[][] = [];
      for (const summonerClass of SummonerClassList.slice(1)) {
        const activeSkills = await skillsContract.methods.class_skills(summonerClass).call() as boolean[];
        const skillNames = await skillsContract.methods.class_skills_by_name(summonerClass).call() as string[];
        let skillNameIndex = 0;
        
        const classSkillSets = activeSkills.map((active, id) => {
          const classSkillSet: ClassSkillSet = { id, active };
          if (active && skillNameIndex < skillNames.length) {
            classSkillSet.skillName = skillNames[skillNameIndex];
            skillNameIndex += 1;
          }
          return classSkillSet;
        });

        classSkills.push(classSkillSets);
      }

      return classSkills;
    },
  },
}

export const graphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
