import { gql } from '@apollo/client';

export const UPDATE_SIDE_DISH = gql`
  mutation ($updateSideDishInput: UpdateSideDishInput!) {
    updateSideDish(input: $updateSideDishInput) {
      id
      name
      priceCents
    }
  }
`;
