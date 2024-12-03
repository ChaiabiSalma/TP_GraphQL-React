import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPTES } from '../queries/queries';  // Assurez-vous du bon chemin
import { DELETE_COMPTE } from '../mutations';  // Import de la mutation DELETE_COMPTE
import { Link } from 'react-router-dom';  // Import de Link
import '../styles/styles.css';  // Import des styles globaux

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_COMPTES);  // Récupérer les comptes

  // Définir la mutation deleteCompte
  const [deleteCompte] = useMutation(DELETE_COMPTE, {
    // Mise à jour du cache après la suppression
    update(cache, { data: { deleteCompte } }) {
      // Lire les données actuelles du cache (les comptes)
      const { allComptes } = cache.readQuery({ query: GET_COMPTES });

      // Filtrer le compte supprimé
      cache.writeQuery({
        query: GET_COMPTES,
        data: { allComptes: allComptes.filter((compte) => compte.id !== deleteCompte.id) },
      });
    },
    // Gestion des erreurs
    onError: (err) => {
      alert(`Erreur: ${err.message}`);  // Affiche un message d'erreur en cas d'échec
    },
  });

  // Fonction de gestion de la suppression d'un compte
  const handleDelete = (id) => {
    deleteCompte({ variables: { id } })  // Appel de la mutation avec l'ID du compte
      .then(() => {
        alert('Compte supprimé avec succès');
      })
      .catch((err) => {
        alert(`Erreur: ${err.message}`);  // Affiche un message d'erreur si la suppression échoue
      });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <div className="container">
      <h2>Liste des Comptes</h2>
      {data.allComptes.map((compte) => (
        <div key={compte.id} className="card">
          <h3>Compte ID: {compte.id}</h3>
          {/* Formater le solde à 2 chiffres après la virgule */}
          <p>Solde: {compte.solde ? compte.solde.toFixed(2) : '0.00'} DH</p>
          <p>Type: {compte.type}</p>
          <p>Date de création: {compte.dateCreation}</p>
          {/* Bouton pour supprimer le compte */}
          <button onClick={() => handleDelete(compte.id)} className="delete-btn">
            Supprimer
          </button>
          {/* Lien pour voir les transactions */}
          <Link to={`/TransactionList/${compte.id}`} className="view-transactions-btn">
            Voir les Transactions
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CompteList;
