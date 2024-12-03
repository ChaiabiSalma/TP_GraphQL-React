import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS_BY_COMPTE, GET_TRANSACTIONS } from '../queries/queries'; // Assurez-vous que le chemin d'import est correct

function TransactionList() {
  const { compteId } = useParams(); // Récupérer l'ID du compte depuis l'URL

  // Déterminer quelle requête utiliser : GET_TRANSACTIONS_BY_COMPTE ou GET_TRANSACTIONS
  const { loading, error, data } = useQuery(compteId ? GET_TRANSACTIONS_BY_COMPTE : GET_TRANSACTIONS, {
    variables: compteId ? { compteId } : undefined, // Passer la variable compteId si elle existe
  });

  if (loading) return <p>Chargement des transactions...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  // En fonction de l'URL, on récupère les transactions
  const transactions = compteId ? data?.compteTransactions : data?.allTransactions;

  return (
    <div className="container">
      <h2>{compteId ? `Transactions du Compte ID: ${compteId}` : 'Toutes les Transactions'}</h2>
      <div className="transaction-container">
        {transactions && transactions.length === 0 ? (
          <p>Aucune transaction disponible</p>
        ) : (
          transactions?.map((transaction) => (
            <div key={transaction.id} className="card">
              <h3>Transaction #{transaction.id}</h3>
              <p><strong>Montant :</strong> {transaction.montant} DH</p>
              <p><strong>Type :</strong> {transaction.type}</p>
              <p><strong>Date :</strong> {new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
