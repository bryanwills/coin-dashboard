import React from 'react';

type Coin = {
  id: number;
  name: string;
  value: number;
  year: number;
};

type CoinTableProps = {
  coins: Coin[];
};

export default function CoinTable({ coins }: CoinTableProps) {
  return (
    <table className="table-auto border-collapse border border-gray-200 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Value</th>
          <th className="border border-gray-300 px-4 py-2">Year</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id}>
            <td className="border border-gray-300 px-4 py-2">{coin.id}</td>
            <td className="border border-gray-300 px-4 py-2">{coin.name}</td>
            <td className="border border-gray-300 px-4 py-2">{coin.value}</td>
            <td className="border border-gray-300 px-4 py-2">{coin.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

