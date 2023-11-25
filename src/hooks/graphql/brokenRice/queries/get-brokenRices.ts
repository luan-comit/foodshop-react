import { gql } from '@apollo/client';

const GET_BROKEN_RICES = gql`
  query BrokenRices {
    brokenRices {
      id
      name
      description
      sideDishes {
        id
        name
      }
      imgSrc
      priceCents
    }
  }
`;

export { GET_BROKEN_RICES };
