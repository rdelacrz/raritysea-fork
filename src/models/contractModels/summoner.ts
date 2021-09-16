import { BigNumber } from '@ethersproject/bignumber';
import { Status } from '@utilities';

export interface Summoner {
  listId: BigNumber;
  tokenID: BigNumber;
  owner: string;
  buyer: string;
  price: BigNumber;
  payout: BigNumber;
  status: Status;
}
