import { gql } from '@apollo/client';

export const DELETE_SIDE_DISH = gql`
  mutation ($deleteSideDishInput: DeleteSideDishInput!) {
    deleteSideDish(input: $deleteSideDishInput)
  }
`;
