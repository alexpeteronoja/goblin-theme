import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedGrid() {
  const items = [
    {
      id: 1,
      title: 'Leon Dore',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/shop/leon-dore'
    },
    {
      id: 2,
      title: 'Uniform',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/shop/uniform'
    },
    {
      id: 3,
      title: 'Footwear',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/shop/footwear'
    },
    {
      id: 4,
      title: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/shop/accessories'
    }
  ];

  return (
    <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {items.map((item) => (
          <Link key={item.id} to={item.link} className="group relative block overflow-hidden aspect-[4/5] md:aspect-square">
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <h2 className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest text-center">
                {item.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
