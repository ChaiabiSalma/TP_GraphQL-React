import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompteList from './components/CompteList';
import TransactionList from './components/TransactionList';
import AddCompte from './components/AddCompte';
import AddTransaction from './components/AddTransaction';
import Stats from './components/Stats'; // Importer le composant Stats

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/CompteList">Comptes</Link>
          </li>
          <li>
            <Link to="/TransactionList">Transactions</Link>
          </li>
          <li>
            <Link to="/AddCompte">Ajouter un Compte</Link>
          </li>
          <li>
            <Link to="/AddTransaction">Ajouter une Transaction</Link>
          </li>
          <li>
            <Link to="/Stats">Statistiques</Link> {/* Lien vers les statistiques */}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Bienvenue</h1>} />
        <Route path="/CompteList" element={<CompteList />} />
        <Route path="/TransactionList" element={<TransactionList />} />
        <Route path="/TransactionList/:compteId" element={<TransactionList />} />
        <Route path="/AddCompte" element={<AddCompte />} />
        <Route path="/AddTransaction" element={<AddTransaction />} />
        <Route path="/Stats" element={<Stats />} /> {/* Ajouter la route pour les statistiques */}
      </Routes>
    </Router>
  );
}

export default App;
