import React, { useEffect, useState } from 'react';
import ProductCard from "./ProductCard";
import { getHomeProducts } from "../api/product";

export default function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getHomeProducts();
        console.log("received: ", data);
        setTopProducts(data.topProducts); // Set top products from API response
        setPopularProducts(data.popularProducts); // Set popular products from API response
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="px-4 space-y-8"> {/* Added horizontal padding */}
      <section>
        <h2 className="text-2xl font-bold">Top Products</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="m-4 text-2xl font-bold">Popular Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
