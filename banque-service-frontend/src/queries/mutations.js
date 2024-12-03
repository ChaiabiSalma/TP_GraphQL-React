import { gql } from '@apollo/client';

export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;
