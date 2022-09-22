/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTicket = /* GraphQL */ `
  query GetTicket($id: ID!) {
    getTicket(id: $id) {
      id
      names
      location
      issue
      createdAt
      updatedAt
    }
  }
`;
export const listTickets = /* GraphQL */ `
  query ListTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        names
        location
        issue
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
