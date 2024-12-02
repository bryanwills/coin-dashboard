"use client";

import React, { useState, useEffect } from "react";
import CoinTable from "../components/CoinTable";
import CreateCoinForm from "../components/CreateCoinForm";

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await fetch("/api/coins");
      if (!response.ok) throw new Error("Failed to fetch coins");
      const data = await response.json();
      setCoins(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.year.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Coin Dashboard</h1>
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search coins by name or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <button
          onClick={() => setShowCreateForm(true)}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Create New Coin
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {showCreateForm && (
        <CreateCoinForm
          onClose={() => {
            setShowCreateForm(false);
            fetchCoins(); // Refresh coins after adding a new one
          }}
        />
      )}
      <CoinTable coins={filteredCoins} refreshCoins={fetchCoins} />
    </div>
  );
}
