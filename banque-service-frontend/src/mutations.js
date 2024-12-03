// src/mutations.js
import { gql } from '@apollo/client';

export const ADD_COMPTE = gql`
  mutation AddCompte($solde: Float!, $type: String!) {
    saveCompte(compte: { solde: $solde, type: $type, dateCreation: "2024-11-25" }) {
      id
      solde
      type
    }
  }
`;

export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transactionRequest: TransactionInput!) {
    addTransaction(transactionRequest: $transactionRequest) {
      id
      montant
      type
    }
  }
`;
