import { gql } from '@apollo/client';

// Requête pour récupérer tous les comptes
export const GET_COMPTES = gql`
  query GetComptes {
    allComptes {
      id
      solde
      type
      dateCreation
    }
  }
`;

// Requête pour récupérer toutes les transactions
// Requête pour récupérer toutes les transactions
export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    allTransactions {
      id
      montant
      type
      date
      compte {
        id
        type
        solde
      }
    }
  }
`;


// Requête pour récupérer les transactions par compte
export const GET_TRANSACTIONS_BY_COMPTE = gql`
  query GetTransactionsByCompte($compteId: ID!) {
    compteTransactions(compteId: $compteId) {
      id
      montant
      type
      date
      compte {
        id
      }
    }
  }
`;

// Requête pour récupérer les comptes par type
export const GET_COMPTES_BY_TYPE = gql`
  query GetComptesByType($type: TypeCompte) {
    compteByType(type: $type) {
      id
      solde
      type
      dateCreation
    }
  }
`;

// Requête pour récupérer les statistiques sur le solde total
export const GET_TOTAL_SOLDE = gql`
  query GetTotalSolde {
    totalSolde {
      count
      sum
      average
    }
  }
`;

// Requête pour récupérer les statistiques des transactions
export const GET_TRANSACTION_STATS = gql`
  query GewtTransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;


