import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOTAL_SOLDE, GET_TRANSACTION_STATS } from '../queries/queries';

function Stats() {
  // Requête pour obtenir les statistiques du solde total
  const { loading: loadingSolde, error: errorSolde, data: dataSolde } = useQuery(GET_TOTAL_SOLDE);

  // Requête pour obtenir les statistiques des transactions
  const { loading: loadingStats, error: errorStats, data: dataStats } = useQuery(GET_TRANSACTION_STATS);

  // Affichage en cas de chargement
  if (loadingSolde || loadingStats) return <p>Chargement des statistiques...</p>;

  // Affichage en cas d'erreur
  if (errorSolde || errorStats) return <p>Erreur : {errorSolde?.message || errorStats?.message}</p>;

  // Extraire les données de solde total
  const { count, sum, average } = dataSolde?.totalSolde || {};

  // Formater le solde total et la moyenne à 2 chiffres après la virgule
  const formattedSum = sum ? sum.toFixed(2) : '0.00';
  const formattedAverage = average ? average.toFixed(2) : '0.00';

  // Extraire les statistiques des transactions
  const { count: countTransactions, sumDepots, sumRetraits } = dataStats?.transactionStats || {};

  // Formater les dépôts et retraits à 2 chiffres après la virgule
  const formattedSumDepots = sumDepots ? sumDepots.toFixed(2) : '0.00';
  const formattedSumRetraits = sumRetraits ? sumRetraits.toFixed(2) : '0.00';

  return (
    <div className="stats-container">
      <h2>Statistiques</h2>
      <div className="stats-card">
        <h3>Solde Total</h3>
        <p><strong>Nombre de comptes :</strong> {count}</p>
        <p><strong>Solde total :</strong> {formattedSum} DH</p>
        <p><strong>Solde moyen :</strong> {formattedAverage} DH</p>
      </div>
      <div className="stats-card">
        <h3>Transactions</h3>
        <p><strong>Nombre de transactions :</strong> {countTransactions}</p>
        <p><strong>Total des dépôts :</strong> {formattedSumDepots} DH</p>
        <p><strong>Total des retraits :</strong> {formattedSumRetraits} DH</p>
      </div>
    </div>
  );
}

export default Stats;
