import { BigNumber } from '@ethersproject/bignumber';
import { Status } from '@utilities';

export interface Summoner extends Array<number | string | BigNumber> {
  listId: BigNumber;
  tokenID: BigNumber;
  owner: string;
  buyer: string;
  price: BigNumber;
  payout: BigNumber;
  status: Status;
}
