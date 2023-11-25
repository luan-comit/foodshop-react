import { ObjectId } from 'bson';

import { SideDish } from '../../../types/schema';

export const createTestSideDish = (data: Partial<SideDish> = {}): SideDish & { __typename: string } => ({
  __typename: 'SideDish',
  id: new ObjectId().toHexString(),
  name: 'A sideDish',
  priceCents: 3_50,
  ...data,
});
