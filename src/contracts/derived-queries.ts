/**
 * Functions using the basic fetchers to perform specific asynchronous functionalities and link them to
 * react-query queries, which will ensure that data is regularly updated.
 */

import { BigNumber } from '@ethersproject/bignumber';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { Signer } from 'ethers';
import { skillsContract, summonersContract, summonersContractFetcherWithSigner } from 'contracts';
import { SummonerClass, SummonerClassList } from '@utilities';

export const useBuySummoner = (signer?: Signer) => {
  const queryClient = useQueryClient();
  return useMutation('buySummoner',
    (args: { price: BigNumber, listId: BigNumber }) => {
      return summonersContractFetcherWithSigner<any>('buy', args.price, args.listId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllSummoners');
      },
    },
  )
}
