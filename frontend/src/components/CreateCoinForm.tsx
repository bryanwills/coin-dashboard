import React, { useState } from "react";

type CreateCoinFormProps = {
  onClose: () => void;
};

export default function CreateCoinForm({ onClose }: CreateCoinFormProps) {
  const [name, setName] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [denomination, setDenomination] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [condition, setCondition] = useState("");
  const [potentialValue, setPotentialValue] = useState<number | "">("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("year", year.toString());
    formData.append("denomination", denomination);
    formData.append("price", price.toString());
    formData.append("condition", condition);
    formData.append("potential_value", potentialValue.toString());
    images.forEach((image, index) => formData.append(`images[${index}]`, image));

    try {
      const response = await fetch("/api/coins", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Coin created successfully!");
        onClose();
      } else {
        alert("Failed to create coin.");
      }
    } catch (error) {
      console.error("Error creating coin:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded">
      <h2 className="text-2xl mb-4">Create New Coin</h2>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10) || "")}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Denomination</label>
        <input
          type="text"
          value={denomination}
          onChange={(e) => setDenomination(e.target.value)}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || "")}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Condition</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Potential Value</label>
        <input
          type="number"
          step="0.01"
          value={potentialValue}
          onChange={(e) => setPotentialValue(parseFloat(e.target.value) || "")}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Create
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
