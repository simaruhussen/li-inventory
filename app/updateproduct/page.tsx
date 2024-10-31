"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function UpdateProduct() {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productBarcode, setProductBarcode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { id } = useParams();

  // Fetch the product details on component mount
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProductName(data.ProductName);
          setProductPrice(data.ProductPrice);
          setProductBarcode(data.ProductBarcode);
          console.log("Data Retrieved:", data);
        } else {
          console.error("Failed to retrieve data. Status code:", res.status);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    getProduct();
  }, [id]);

  // Handle the form submission to update the product
  const updateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName || !productPrice || !productBarcode) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/api/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName: productName,
          ProductPrice: productPrice,
          ProductBarcode: productBarcode,
        }),
      });

      if (response.ok) {
        alert("Product updated successfully.");
        router.push("/products");
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Update Product Information</h1>

      <form onSubmit={updateProduct}>
        <div className="mb-4">
          <label htmlFor="product_name" className="block text-lg font-semibold">
            Product Name
          </label>
          <input
            type="text"
            onChange={(e) => setProductName(e.target.value)}
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
            onChange={(e) => setProductPrice(e.target.value)}
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
            onChange={(e) => setProductBarcode(e.target.value.slice(0, 12))}
            value={productBarcode}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            id="product_barcode"
            placeholder="Enter Product Barcode"
            maxLength={12}
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
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </form>
    </div>
  );
}
