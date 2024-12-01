"use client";

import React, { useEffect, useState } from 'react';
import CoinTable from '../components/CoinTable';

type Coin = {
  id: number;
  name: string;
  value: number;
  year: number;
};

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('/api/coins');
        if (!response.ok) throw new Error('Failed to fetch coins');
        const data = await response.json();
        setCoins(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Coin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {coins.length > 0 ? (
        <CoinTable coins={coins} />
      ) : (
        <p>Loading coins...</p>
      )}
    </div>
  );
}

