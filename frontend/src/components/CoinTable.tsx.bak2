import React, { useState } from "react";

type Coin = {
  id: number;
  name: string;
  year: number;
  value?: number;
};

type CoinTableProps = {
  coins: Coin[];
  refreshCoins: () => void; // Function to refresh coin data
};

export default function CoinTable({ coins, refreshCoins }: CoinTableProps) {
  const [editCoin, setEditCoin] = useState<Coin | null>(null);

  const deleteCoin = async (id: number) => {
    try {
      await fetch(`/api/coins/${id}`, { method: "DELETE" });
      refreshCoins();
    } catch (error) {
      console.error("Failed to delete coin:", error);
    }
  };

  const updateCoin = async (coin: Coin) => {
    try {
      await fetch(`/api/coins/${coin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coin),
      });
      setEditCoin(null);
      refreshCoins();
    } catch (error) {
      console.error("Failed to update coin:", error);
    }
  };

  return (
    <table className="w-full text-left bg-gray-800 rounded-lg overflow-hidden">
      <thead className="bg-gray-700">
        <tr>
          <th className="p-4">ID</th>
          <th className="p-4">Name</th>
          <th className="p-4">Year</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id} className="hover:bg-gray-600">
            <td className="p-4">{coin.id}</td>
            <td className="p-4">
              {editCoin?.id === coin.id ? (
                <input
                  type="text"
                  defaultValue={coin.name}
                  onChange={(e) =>
                    setEditCoin({ ...coin, name: e.target.value })
                  }
                  className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
                />
              ) : (
                coin.name
              )}
            </td>
            <td className="p-4">
              {editCoin?.id === coin.id ? (
                <input
                  type="number"
                  defaultValue={coin.year}
                  onChange={(e) =>
                    setEditCoin({ ...coin, year: parseInt(e.target.value, 10) })
                  }
                  className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
                />
              ) : (
                coin.year
              )}
            </td>
            <td className="p-4 space-x-2">
              {editCoin?.id === coin.id ? (
                <button
                  onClick={() => updateCoin(editCoin)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditCoin(coin)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCoin(coin.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

