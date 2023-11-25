import { gql } from '@apollo/client';

export const CREATE_BROKEN_RICE = gql`
  mutation ($createBrokenRiceInput: CreateBrokenRiceInput!) {
    createBrokenRice(input: $createBrokenRiceInput) {
      id
    }
  }
`;
