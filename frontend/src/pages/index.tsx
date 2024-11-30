import { useState, useEffect } from 'react';
import { fetchCoins, deleteCoin } from '../hooks/useCoins';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    loadCoins();
  }, [sortBy, order]);

  const loadCoins = async () => {
    const data = await fetchCoins(sortBy, order);
    setCoins(data);
  };

  const handleDelete = async (id: number) => {
    await deleteCoin(id);
    loadCoins();
  };

  return (
    <Layout>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Top 20 Coins</h2>
        <div className="flex space-x-4 my-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 bg-gray-700 text-white"
          >
            <option value="price">Price</option>
            <option value="denomination">Denomination</option>
            <option value="year">Year</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="p-2 bg-gray-700 text-white"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {coins.map((coin: any) => (
          <div key={coin.id} className="p-4 bg-gray-900 rounded">
            <h3 className="text-lg font-bold">{coin.name}</h3>
            <p>Year: {coin.year}</p>
            <p>Denomination: {coin.denomination}</p>
            <p>Price: ${coin.price.toFixed(2)}</p>
            <p>Condition: {coin.condition}</p>
            <button
              onClick={() => handleDelete(coin.id)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;

