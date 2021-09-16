/**
 * Functions using the basic fetchers to perform specific asynchronous functionalities.
 */

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Signer } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { summonersContractFetcher, summonersContractFetcherWithSigner } from '@contract';
import { Summoner } from '@models';

export const useGetAllSummoners = () => (
  useQuery('getAllSummoners', async () => summonersContractFetcher<Summoner[]>('getAllSummoners'))
);

export const useBuySummoner = (signer?: Signer) => {
  const queryClient = useQueryClient();
  return useMutation('buySummoner',
    (args: { payableAmount: BigNumber, listId: BigNumber }) => {
      if (signer) {
        return summonersContractFetcherWithSigner<any>(signer, 'buy', args.payableAmount, args.listId);
      } else {
        return summonersContractFetcher<any>('buy', args.payableAmount, args.listId);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllSummoners');
      },
    },
  )
}
