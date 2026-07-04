import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import useCartStore from "../store/useCartStore";

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black">
      <button
        className="w-full cursor-pointer py-4 flex justify-between items-center text-left transition-colors hover:text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 text-base text-gray-700 font-serif leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Product() {
  const { id } = useParams();

  // Mock product matching the ALD aesthetic
  const product = {
    id,
    title: "Long-Sleeve Linen Shirt",
    price: "$295",
    colors: [
      { name: "Pristine", hex: "#f4f4f0" },
      { name: "Blue", hex: "#6d86a6" },
      { name: "Olive", hex: "#636657" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    details: [
      "• Long-sleeve linen shirt in Pristine",
      "• Button front closure",
      "• Aimé Leon Dore crest patch at chest",
      "• 100% Linen",
      "• Machine wash",
      "• Made in Portugal",
    ],
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
  };

  const recentlyViewed = [
    {
      id: "2",
      title: "Double Pleated Pinstripe Suit Trouser",
      price: "$395",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      title: "Wool Double Breasted Blazer",
      price: "$895",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "4",
      title: "Leather Penny Loafer",
      price: "$275",
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "5",
      title: "Cotton Chino Pant",
      price: "$225",
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "6",
      title: "Crest Ivy Cap",
      price: "$65",
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="w-full  min-h-screen text-ald-black">
      <div className="max-w-[1730px] mx-auto pt-20 md:pt-32 pb-24 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 xl:gap-24 relative">
          {/* Mobile Title & Price (Hidden on Desktop) */}
          <div className="w-full px-4 sm:px-6 lg:px-0 flex lg:hidden flex-col order-2 mt-6 mb-4">
            <h1 className="text-[14px] font-medium text-black mb-1">
              {product.title}
            </h1>
            <p className="text-[14px] text-black">{product.price}</p>
          </div>

          {/* Center Column: Images (Slider on mobile, Independent scroll on desktop) */}
          <div className="w-full lg:w-[45%] flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[calc(100vh-140px)] snap-x snap-mandatory lg:snap-none gap-0 lg:gap-4 order-1 lg:order-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className="w-full snap-center shrink-0 aspect-4/5 lg:aspect-auto"
              >
                <img
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
            ))}
          </div>

          {/* Right Column: Variants & Add to Bag (Scrolls normally with the page) */}
          <div className="w-full px-4 sm:px-6 lg:px-0 lg:w-[30%] flex flex-col order-3 pt-2 lg:pt-4">
            <div className="mb-6 lg:mb-8">
              <h2 className="text-sm mb-3 font-medium">
                Color: {selectedColor.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-11 h-11 lg:w-12 lg:h-12 border ${
                      selectedColor.name === color.name
                        ? "border-black"
                        : "border-transparent"
                    } p-0.5 transition-all`}
                    aria-label={color.name}
                  >
                    <div
                      className="w-full h-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 lg:mb-8 relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full appearance-none rounded-none bg-transparent border border-black px-4 py-3 lg:py-4 text-[12px] text-black focus:outline-none cursor-pointer"
              >
                <option value="" disabled>
                  Select Size
                </option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black border-l border-black">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <button
              onClick={handleAddToBag}
              className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-[0.2em] py-4 lg:py-5 transition-colors hover:bg-gray-800 mb-6 lg:mb-0"
            >
              Add To Bag
            </button>
          </div>

          {/* Left Column: Accordions & Desktop Title/Price (Independent scroll on desktop) */}
          <div className="w-full px-4 sm:px-6 lg:px-0 lg:w-[25%] flex flex-col order-4 lg:order-1 pt-2 lg:pt-4 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            <div className="hidden lg:flex flex-col">
              <h1 className="text-lg font-medium text-black mb-1">
                {product.title}
              </h1>
              <p className="text-lg text-black mb-8">{product.price}</p>
            </div>

            <div className="w-full border-t border-black">
              <AccordionItem title="Product Details" defaultOpen={true}>
                <div className="pt-2 text-sm">
                  <ul className="list-none space-y-1">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </AccordionItem>
              <AccordionItem title="Sizing" defaultOpen={false}>
                <div className="pt-2 text-sm">
                  <p>True to size. Model is 6'1" and wearing a size Medium.</p>
                </div>
              </AccordionItem>
              <AccordionItem title="Shop the Look" defaultOpen={false}>
                <div className="pt-4 flex flex-col">
                  <div className="w-24 h-32 bg-gray-200 mb-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src="https://images.unsplash.com/photo-1555689986-343db3594cd2?auto=format&fit=crop&w=300&q=80"
                      alt="Double Pleated Pinstripe Suit Trouser"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs uppercase font-medium">
                    Double Pleated Pinstripe
                  </span>
                  <span className="text-xs text-gray-500">Suit Trouser</span>
                  <span className="text-xs uppercase mt-1 text-gray-500">
                    Sold Out
                  </span>
                </div>
              </AccordionItem>
              <AccordionItem title="Delivery and Returns" defaultOpen={false}>
                <div className="pt-2 text-sm">
                  <p>
                    Standard shipping takes 3-5 business days. Free returns
                    within 14 days of purchase.
                  </p>
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      {/* RECENTLY VIEWED SECTION */}
      <div className="max-w-[1730px] mx-auto px-4 sm:px-6 md:px-8 pb-24 lg:px-8">
        <h3 className="text-[10px] md:text-lg font-semibold tracking-wider uppercase mb-6 text-black">
          Recently Viewed
        </h3>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {recentlyViewed.map((item) => (
            <div
              key={item.id}
              className="min-w-45 md:min-w-55 lg:min-w-65 snap-start flex flex-col cursor-pointer group"
            >
              <div className="w-full aspect-4/5 overflow-hidden bg-gray-200 mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex justify-between items-start text-[11px] md:text-base text-black">
                <h4 className="font-normal pr-4">{item.title}</h4>
                <span className="font-normal whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
