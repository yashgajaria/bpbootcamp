import { gql } from "apollo-server-express";

const entityType = gql`

  type EntityResponseDTO {
    id: ID!
    productName: String!
    price: Int!
    amountInStock: Int!
    productDescription: String!
  }

  input EntityRequestDTO {
    productName: String!
    price: Int!
    amountInStock: Int!
    productDescription: String!
  }

  extend type Query {
    entity(id: ID!): EntityResponseDTO!
    entities: [EntityResponseDTO!]!
  }

  extend type Mutation {
    createEntity(entity: EntityRequestDTO!): EntityResponseDTO!
    updateEntity(id: ID!, entity: EntityRequestDTO!): EntityResponseDTO!
    deleteEntity(id: ID!): ID
  }
`;

export default entityType;
