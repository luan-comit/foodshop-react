import { gql } from "@apollo/client"

const GET_BROKEN_RICE_RESPONSE = gql`
  query BrokenRicePage($limit: Int!, $cursor: String, $totalCount: Int) {
    brokenRicePage(limit: $limit, cursor: $cursor, totalCount: $totalCount) {
      brokenRices {
        name
        id
        sideDishes {
          name
          id
          priceCents
        }
        priceCents
        description
        imgSrc
      }
      connection {
        cursor
        totalCount
        hasNextPage
      }
    }
  }
`

export { GET_BROKEN_RICE_RESPONSE }
