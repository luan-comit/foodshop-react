import { gql } from '@apollo/client';

export const CREATE_SIDE_DISH = gql`
  mutation ($createSideDishInput: CreateSideDishInput!) {
    createSideDish(input: $createSideDishInput) {
      name
      priceCents
    }
  }
`;
