import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";

/*
Detect whether the user is scrolling up or down.

useRef is used instead of state for the previous scroll position,
so the scroll listener is not removed and recreated on every scroll event.
*/
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const previousScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setScrollDirection("up");
        previousScrollY.current = 0;
        return;
      }

      const isScrollingDown = currentScrollY > previousScrollY.current;

      if (isScrollingDown && currentScrollY > 80) {
        setScrollDirection("down");
      }

      if (!isScrollingDown) {
        setScrollDirection("up");
      }

      previousScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
}

export default function Shop() {
  const scrollDirection = useScrollDirection();

  const [isRefineOpen, setIsRefineOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("Category");

  /*
Prevent page scrolling while the filter drawer is open.
*/
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isRefineOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isRefineOpen]);

  const products = [
    {
      id: 1,
      name: "Wool Crest Sweater",
      price: "$295",
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 2,
      name: "Polo Collar Cardigan",
      price: "$275",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 3,
      name: "Nylon Active Short",
      price: "$155",
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 4,
      name: "Canvas Tote Bag",
      price: "$125",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 5,
      name: "Herringbone Overcoat",
      price: "$895",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 6,
      name: "Striped Oxford Shirt",
      price: "$185",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 7,
      name: "Double Pleated Trouser",
      price: "$395",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      id: 8,
      name: "Leather Penny Loafer",
      price: "$275",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
      ],
    },
  ];

  const filterGroups = {
    Category: ["Outerwear", "Knitwear", "Shirting", "Bottoms", "Accessories"],
    Size: ["XS", "S", "M", "L", "XL", "XXL"],
    Color: ["Black", "Navy", "Olive", "Cream", "Grey"],
  };

  const toggleAccordion = (category) => {
    setActiveAccordion((currentCategory) =>
      currentCategory === category ? null : category,
    );
  };

  const closeRefineDrawer = () => {
    setIsRefineOpen(false);
  };

  return (
    <div className="min-h-screen w-full pb-24 text-ald-black">
      {/* Fixed Filter Bar */}
      <div
        className={`fixed left-0 right-0 top-0 z-30 border-b border-gray-100 bg-white pt-16 transition-transform duration-300 ease-in-out md:pt-20 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {" "}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between bg-white px-4 py-4 text-[11px] font-medium uppercase tracking-widest md:px-8 md:text-[12px]">
          {" "}
          <span>Shop All</span>
          <div className="flex gap-6 md:gap-8">
            <button
              type="button"
              className="flex items-center gap-1 transition-opacity hover:opacity-70"
            >
              Sort
              <ChevronDown className="h-3 w-3" />
            </button>

            <button
              type="button"
              onClick={() => setIsRefineOpen(true)}
              className="transition-opacity hover:opacity-70"
            >
              Refine
            </button>
          </div>
        </div>
      </div>

      {/* Top spacing matches the fixed filter bar height */}
      <main className="mx-auto max-w-[1600px] px-4 pt-28 md:px-8 md:pt-36">
        <div className="grid grid-cols-2 gap-x-2 gap-y-10 md:gap-x-4 md:gap-y-16 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group flex flex-col">
              {/* Horizontal product image slider */}
              <div className="flex aspect-[4/5] w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {product.images.map((image, index) => (
                  <Link
                    key={image}
                    to={`/product/${product.id}`}
                    className="block h-full w-full flex-shrink-0 snap-start bg-gray-200"
                    aria-label={`View ${product.name}, image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>

              <div className="mt-3 flex items-start justify-between px-1 text-[10px] uppercase tracking-widest md:text-[11px]">
                <Link
                  to={`/product/${product.id}`}
                  className="w-2/3 pr-2 font-semibold leading-snug transition-opacity group-hover:opacity-70"
                >
                  {product.name}
                </Link>

                <span className="font-normal">{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Drawer backdrop */}
      {isRefineOpen && (
        <button
          type="button"
          aria-label="Close refine filters"
          onClick={closeRefineDrawer}
          className="fixed inset-0 z-40 bg-black/20"
        />
      )}

      {/* Refine Drawer */}
      <aside
        aria-hidden={!isRefineOpen}
        className={`fixed right-0 top-0 z-50 h-full w-full transform bg-[#f4f4f0] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:w-[400px] ${
          isRefineOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-gray-300 px-6 py-6">
            <span className="text-[11px] font-bold uppercase tracking-widest md:text-[12px]">
              Refine
            </span>

            <button
              type="button"
              onClick={closeRefineDrawer}
              aria-label="Close refine drawer"
              className="transition-opacity hover:opacity-70"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {/* Drawer content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="space-y-6">
              {Object.entries(filterGroups).map(([category, items]) => {
                const isOpen = activeAccordion === category;

                return (
                  <section
                    key={category}
                    className="border-b border-gray-300 pb-4"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(category)}
                      className="flex w-full items-center justify-between text-[11px] font-medium uppercase tracking-widest md:text-[12px]"
                    >
                      {category}

                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "mt-4 max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-3 text-[12px]">
                        {items.map((item) => (
                          <li key={item}>
                            <label className="group flex cursor-pointer items-center gap-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-black"
                              />
                              <span className="transition-opacity group-hover:opacity-70">
                                {item}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          {/* Drawer footer */}
          <footer className="border-t border-gray-300 bg-[#f4f4f0] p-6">
            <button
              type="button"
              onClick={closeRefineDrawer}
              className="w-full bg-black py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gray-800"
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={closeRefineDrawer}
              className="mt-4 w-full text-center text-[11px] uppercase tracking-widest text-gray-500 transition-colors hover:text-black"
            >
              Clear All
            </button>
          </footer>
        </div>
      </aside>
    </div>
  );
}
