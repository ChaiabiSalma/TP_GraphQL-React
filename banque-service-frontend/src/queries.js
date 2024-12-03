// src/queries.js
import { gql } from '@apollo/client';

export const GET_COMPTES = gql`
  query GetComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const GET_TRANSACTION_STATS = gql`
  query GetTransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;

export const GET_TOTAL_SOLDE = gql`
  query GetTotalSolde {
    totalSolde {
      count
      sum
      average
    }
  }
`;

export const GET_COMPTES_BY_TYPE = gql`
  query GetComptesByType($type: TypeCompte) {
    compteByType(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    allTransactions {
      id
      montant
      date
      type
      compte {
        id
      }
    }
  }
`;
