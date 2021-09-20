import { BigNumber } from '@ethersproject/bignumber';
import { Status } from '@utilities';

export interface Summoner {
  listId: string;
  tokenID: string;
  owner: string;
  buyer: string;
  price: string;
  payout: string;
  status: Status;
}
