import { gql } from '@apollo/client';

export const GET_SIDE_DISH = gql`
  query Get_SideDish($sideDishId: ObjectID!) {
    sideDish(id: $sideDishId) {
      id
      name
      priceCents
    }
  }
`;
