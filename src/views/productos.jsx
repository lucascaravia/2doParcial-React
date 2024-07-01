import React, { useState, useEffect } from "react";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from server
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item._id === product._id);

    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setAllProducts(updatedProducts);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }

    setCountProducts(countProducts + 1);
    setTotal(total + product.price);
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out bg-gray-100"
        >
          <figure className="h-48">
            <img
              className="w-full object-cover product-image"
              src={product.img}
              alt={product.name}
            />
          </figure>
          <div className="p-4 flex flex-col justify-between">
            <h2 className="text-lg font-medium text-gray-800 product-name">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2 product-description">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-800 font-semibold product-price">
                ${product.price}
              </p>
              <button
                className="px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white add-to-cart-btn"
                onClick={() => onAddProduct(product)}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
