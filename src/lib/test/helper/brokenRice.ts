import { ObjectId } from 'bson';

import { BrokenRice } from '../../../types/schema';
import { createTestSideDish } from './sideDish';

const sideDish = createTestSideDish();

export const createTestBrokenRice = (data: Partial<BrokenRice> = {}): BrokenRice & { __typename: string } => ({
  __typename: 'BrokenRice',
  id: new ObjectId().toHexString(),
  name: 'A brokenRice',
  description: 'test brokenRice',
  imgSrc: 'image URL',
  sideDishes: [sideDish],
  priceCents: 3_50,
  ...data,
});
