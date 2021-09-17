/**
 * Functions using the basic fetchers to perform specific asynchronous functionalities and link them to
 * react-query queries, which will ensure that data is regularly updated.
 */

import { useMutation, useQuery, useQueries, useQueryClient } from 'react-query';
import { Signer } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { skillsContractFetcher, summonersContractFetcher, summonersContractFetcherWithSigner } from '@contract';
import { Summoner } from '@models';
import { SummonerClass, SummonerClassList } from '@utilities';

export const useGetAllSummoners = () => (
  useQuery('getAllSummoners', async () => summonersContractFetcher<Summoner[]>('getAllSummoners'))
);

export const useBuySummoner = (signer?: Signer) => {
  const queryClient = useQueryClient();
  return useMutation('buySummoner',
    (args: { price: BigNumber, listId: BigNumber }) => {
      if (signer) {
        return summonersContractFetcherWithSigner<any>(signer, 'buy', args.price, args.listId);
      } else {
        return summonersContractFetcher<any>('buy', args.price, args.listId);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllSummoners');
      },
    },
  )
}

export const useGetClassSkills = () => {
  const summonerClasses = SummonerClassList.filter(c => c !== SummonerClass.ALL);
  return useQueries(summonerClasses.map(summonerClass => ({
    queryKey: ['getClassSkills', summonerClass],
    queryFn: () => skillsContractFetcher<boolean[]>('class_skills', summonerClass),
  })));
}

export const useGetClassSkillNames = () => {
  const summonerClasses = SummonerClassList.filter(c => c !== SummonerClass.ALL);
  return useQueries(summonerClasses.map(summonerClass => ({
    queryKey: ['getClassSkillNames', summonerClass],
    queryFn: () => skillsContractFetcher<string[]>('class_skills_by_name', summonerClass),
  })));
}
