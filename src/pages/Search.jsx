import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("MEN'S");

  // Prevent main page scroll when we are just looking at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Mock results
  const mockResults = [
    {
      id: 1,
      name: "Wool Crest Sweater",
      price: "$295",
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      id: 6,
      name: "Striped Oxford Shirt",
      price: "$185",
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      id: 8,
      name: "Leather Penny Loafer",
      price: "$275",
      images: [
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
      ],
    },
  ];

  return (
    <div className="w-full bg-[#f4f4f0] min-h-screen text-ald-black pt-24 md:pt-32 pb-24">
      {/* Search Header Container (Sticky) */}
      <div className="sticky top-[60px] md:top-[80px] z-30 bg-[#f4f4f0] pb-4">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-4 mb-4">
            <h1 className="text-2xl lg:text-3xl uppercase tracking-widest font-normal mb-4 md:mb-0">
              {query.toUpperCase()}
            </h1>
            <div className="text-[11px] uppercase tracking-widest font-medium text-gray-500">
              {mockResults.length} RESULTS FOUND
            </div>
          </div>

          <div className="flex gap-8 text-[11px] uppercase tracking-widest font-bold">
            <button
              onClick={() => setActiveTab("MEN'S")}
              className={`pb-1 border-b-2 transition-colors ${activeTab === "MEN'S" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}
            >
              MEN'S ({mockResults.length})
            </button>
            <button
              onClick={() => setActiveTab("WOMEN'S")}
              className={`pb-1 border-b-2 transition-colors ${activeTab === "WOMEN'S" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}
            >
              WOMEN'S (0)
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8">
        {mockResults.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[12px] uppercase tracking-widest mb-8 text-gray-500">
              No results found for "{query}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-10 md:gap-x-4 md:gap-y-16">
            {mockResults.map((product) => (
              <div key={product.id} className="flex flex-col group">
                {/* Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-full aspect-[4/5] bg-gray-200 block overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>

                {/* Product Info */}
                <div className="mt-3 flex justify-between items-start text-[10px] md:text-[11px] uppercase tracking-widest px-1">
                  <Link
                    to={`/product/${product.id}`}
                    className="font-semibold w-2/3 pr-2 leading-snug group-hover:opacity-70 transition-opacity"
                  >
                    {product.name}
                  </Link>
                  <span className="font-normal">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
