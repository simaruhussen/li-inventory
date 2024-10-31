"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InsertProduct() {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productBarcode, setProductBarcode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 12);
    setProductBarcode(value);
  };

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName || !productPrice || !productBarcode) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/insertproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName: productName,
          ProductPrice: productPrice,
          ProductBarcode: productBarcode,
        }),
      });

      if (response.status === 201) {
        alert("Product added successfully");
        setProductName("");
        setProductPrice("");
        setProductBarcode("");
        router.push("/products");
      } else if (response.status === 422) {
        alert("Product is already added with that barcode.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Enter Product Information</h1>

      <form onSubmit={addProduct}>
        <div className="mb-4">
          <label htmlFor="product_name" className="block text-lg font-semibold">
            Product Name
          </label>
          <input
            type="text"
            onChange={handleNameChange}
            value={productName}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            id="product_name"
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_price" className="block text-lg font-semibold">
            Product Price
          </label>
          <input
            type="number"
            onChange={handlePriceChange}
            value={productPrice}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            id="product_price"
            placeholder="Enter Product Price"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_barcode" className="block text-lg font-semibold">
            Product Barcode
          </label>
          <input
            type="text"
            onChange={handleBarcodeChange}
            value={productBarcode}
            maxLength={12}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            id="product_barcode"
            placeholder="Enter Product Barcode"
            required
          />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Link href="/products" className="text-blue-500 hover:underline">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Inserting..." : "Insert"}
          </button>
        </div>

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </form>
    </div>
  );
}
