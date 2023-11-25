import { gql } from '@apollo/client';

export const UPDATE_BROKEN_RICE = gql`
  mutation ($updateBrokenRiceInput: UpdateBrokenRiceInput!) {
    updateBrokenRice(input: $updateBrokenRiceInput) {
      id
    }
  }
`;
