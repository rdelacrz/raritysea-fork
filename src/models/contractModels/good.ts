import { BigNumber } from '@ethersproject/bignumber';

export interface Good {
  id: BigNumber;
  cost: BigNumber;
  weight: BigNumber;
  name: string;
  description: string;
}
