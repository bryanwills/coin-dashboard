import React, { useState, useEffect } from "react";
import CoinTable from "./CoinTable";
import CreateCoinForm from "./CreateCoinForm";

type Coin = {
  id: number;
  name: string;
  year: number;
  denomination: string;
  price: number;
  condition: string;
  potential_value?: number;
  images?: string[];
};

export default function Layout() {
  const [coins, setCoins] = useState<Coin[]>([]);

  const fetchCoins = async () => {
    try {
      const response = await fetch("/api/coins");
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Coin Dashboard</h1>
      <CreateCoinForm refreshCoins={fetchCoins} />
      <div className="mt-8">
        <CoinTable coins={coins} refreshCoins={fetchCoins} />
      </div>
    </div>
  );
}
