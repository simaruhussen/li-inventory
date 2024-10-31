"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

interface Product {
  _id: string;
  ProductName: string;
  ProductPrice: number;
  ProductBarcode: string;
}

const Products: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [role, setRole] = useState<string | null>("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setProductData(data);
      } else {
        console.error("Failed to retrieve data. Status code:", res.status);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/deleteproduct/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          getProducts();
        } else {
          console.error("Failed to delete product. Status code:", response.status);
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const filteredProducts = productData.filter(
    (product) =>
      product.ProductBarcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ProductPrice.toString().includes(searchQuery)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products Inventory</h1>
      <div className="flex justify-between items-center mb-4">
        <Link href="/insertproduct">
          <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" href="/insertproduct">+ Add New Product</Link>
        </Link>
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search by Name, Price or Barcode"
            className="w-full px-4 py-2 border rounded-l-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute top-2 right-3 text-gray-500">
            <FaSearch />
          </span>
        </div>
      </div>
      <div className="overflow-auto max-h-[38rem]">
        <table className="w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">#</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Product Price</th>
              <th className="p-4">Product Barcode</th>
              <th className="p-4">Update</th>
              {(role === "Admin" || role === "Super Admin") && <th className="p-4">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((element, index) => (
                <tr key={element._id} className="border-t">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{element.ProductName}</td>
                  <td className="p-4">{element.ProductPrice}</td>
                  <td className="p-4">{element.ProductBarcode}</td>
                  <td className="p-4">
                    <Link href={`/updateproduct/${element._id}`} className="btn btn-primary">
                      
                      <i className="fa-solid fa-pen-to-square"></i>Edit                      
                    </Link>
                  </td>
                  {(role === "Admin" || role === "Super Admin") && (
                    <td className="p-4">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteProduct(element._id)}
                      >
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
