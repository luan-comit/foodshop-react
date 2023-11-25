import { gql } from '@apollo/client';

export const DELETE_BROKEN_RICE = gql`
  mutation ($deleteBrokenRiceInput: DeleteBrokenRiceInput!) {
    deleteBrokenRice(input: $deleteBrokenRiceInput)
  }
`;
