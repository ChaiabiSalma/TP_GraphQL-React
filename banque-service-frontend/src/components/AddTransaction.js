import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import '../styles/styles.css'; // Import des styles globaux

const ADD_TRANSACTION = gql`
  mutation AddTransaction($transactionRequest: TransactionInput!) {
    addTransaction(transactionRequest: $transactionRequest) {
      id
      montant
      type
      date
    }
  }
`;

function AddTransaction() {
  const [compteId, setCompteId] = useState('');
  const [montant, setMontant] = useState('');
  const [type, setType] = useState('DEPOT');
  const [date, setDate] = useState('');
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      alert('La date est requise');
      return;
    }

    const formattedDate = new Date(date).toISOString().split('T')[0];

    addTransaction({
      variables: {
        transactionRequest: {
          compteId: parseInt(compteId),
          montant: parseFloat(montant),
          type,
          date: formattedDate,
        },
      },
    })
      .then(() => {
        setCompteId('');
        setMontant('');
        setType('DEPOT');
        setDate('');
      })
      .catch((error) => {
        console.error('Erreur Apollo:', error.message);
      });
  };

  return (
    <div className="container">
      <h2>Ajouter une Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID Compte"
          value={compteId}
          onChange={(e) => setCompteId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Montant"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="DEPOT">Dépôt</option>
          <option value="RETRAIT">Retrait</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddTransaction;
