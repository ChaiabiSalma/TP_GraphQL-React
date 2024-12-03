import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import '../styles/styles.css'; // Import des styles globaux

const ADD_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      type
    }
  }
`;

function AddCompte() {
  const [solde, setSolde] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [type, setType] = useState('COURANT');
  const [addCompte] = useMutation(ADD_COMPTE);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dateCreation) {
      alert('La date de création est requise');
      return;
    }

    const formattedDate = new Date(dateCreation).toISOString().split('T')[0];

    addCompte({
      variables: {
        compte: {
          solde: parseFloat(solde),
          dateCreation: formattedDate,
          type,
        },
      },
    })
      .then(() => {
        setSolde('');
        setDateCreation('');
        setType('COURANT');
      })
      .catch((error) => {
        console.error('Erreur Apollo:', error.message);
      });
  };

  return (
    <div className="container">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Solde"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateCreation}
          onChange={(e) => setDateCreation(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="COURANT">Courant</option>
          <option value="EPARGNE">Epargne</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddCompte;
