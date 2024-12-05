import React, { useState } from "react";

type Coin = {
  name: string;
  year: number;
  denomination: string;
  price: number;
  condition: string;
  potential_value?: number;
  images?: File[];
};

type CreateCoinFormProps = {
  refreshCoins: () => void; // Function to refresh coin data
};

export default function CreateCoinForm({ refreshCoins }: CreateCoinFormProps) {
  const [coin, setCoin] = useState<Coin>({
    name: "",
    year: new Date().getFullYear(),
    denomination: "",
    price: 0.0,
    condition: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCoin({ ...coin, [name]: name === "price" || name === "year" ? parseFloat(value) : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all coin fields
    Object.entries(coin).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    // Append images
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await fetch("/api/coins", {
        method: "POST",
        body: formData,
      });
      refreshCoins();
      setCoin({
        name: "",
        year: new Date().getFullYear(),
        denomination: "",
        price: 0.0,
        condition: "",
      });
      setImages([]);
    } catch (error) {
      console.error("Failed to create coin:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-600 bg-gray-800 rounded-lg">
      <div>
        <label className="block text-white">Name:</label>
        <input
          type="text"
          name="name"
          value={coin.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div>
        <label className="block text-white">Year:</label>
        <input
          type="number"
          name="year"
          value={coin.year}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div>
        <label className="block text-white">Denomination:</label>
        <input
          type="text"
          name="denomination"
          value={coin.denomination}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div>
        <label className="block text-white">Price:</label>
        <input
          type="number"
          name="price"
          value={coin.price}
          onChange={handleInputChange}
          required
          step="0.01"
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div>
        <label className="block text-white">Condition:</label>
        <input
          type="text"
          name="condition"
          value={coin.condition}
          onChange={handleInputChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div>
        <label className="block text-white">Potential Value:</label>
        <input
          type="number"
          name="potential_value"
          value={coin.potential_value || ""}
          onChange={handleInputChange}
          step="0.01"
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div>
        <label className="block text-white">Images:</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 text-white"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
      >
        Create Coin
      </button>
    </form>
  );
}
