import { gql } from '@apollo/client';

const GET_SIDE_DISHES = gql`
  query SideDishes {
    sideDishes {
      id
      name
      priceCents
    }
  }
`;

export { GET_SIDE_DISHES };
