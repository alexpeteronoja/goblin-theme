import React from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const isFreeShipping = subtotal >= 200;
  const shippingProgress = Math.min((subtotal / 200) * 100, 100);

  return (
    <div className="w-full bg-[#f4f4f0] min-h-screen text-ald-black pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <h1 className="text-[20px] font-bold uppercase tracking-[0.2em] mb-2 text-center md:text-left">Cart</h1>
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-12 text-center md:text-left">Available Now</p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[12px] uppercase tracking-widest mb-8">Your cart is currently empty.</p>
            <Link 
              to="/shop" 
              className="bg-black text-white px-12 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
            
            {/* Left Column: Cart Items */}
            <div className="w-full lg:w-[60%] flex flex-col gap-8">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-6 border-b border-gray-300 pb-8 last:border-0">
                  {/* Image */}
                  <div className="w-[120px] md:w-[150px] aspect-[4/5] bg-gray-200 flex-shrink-0">
                    <img 
                      src={item.product.images ? item.product.images[0] : item.product.images || item.product.image || "https://images.unsplash.com/photo-1555689986-343db3594cd2?auto=format&fit=crop&w=300&q=80"} 
                      alt={item.product.title || item.product.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-start">
                    <div className="flex justify-between items-start mb-1">
                      <Link 
                        to={`/product/${item.product.id}`}
                        className="text-[13px] md:text-[14px] text-black font-semibold uppercase tracking-widest leading-snug hover:opacity-70 transition-opacity"
                      >
                        {item.product.title || item.product.name}
                      </Link>
                    </div>
                    <p className="text-[11px] md:text-[12px] text-gray-500 uppercase tracking-widest mb-6">
                      {item.selectedColor?.name || 'PRISTINE'} / {item.selectedSize}
                    </p>
                    
                    {/* Price & Quantity */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-auto gap-4">
                      <div className="flex items-center text-[13px] md:text-[14px]">
                        <button 
                          className="px-3 py-1 hover:opacity-70 border border-gray-300"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-y border-gray-300">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:opacity-70 border border-gray-300"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[11px] text-gray-500 uppercase tracking-widest ml-6 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <span className="text-[13px] md:text-[14px] font-medium tracking-widest">
                        ${(parseFloat((item.product.price || "").replace(/[^0-9.-]+/g,"")) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-[40%] flex flex-col">
              <div className="bg-[#f4f4f0] lg:sticky lg:top-32 border-t lg:border-t-0 border-gray-300 pt-8 lg:pt-0">
                <h2 className="text-[13px] md:text-[14px] font-bold uppercase tracking-widest mb-8">Order Summary</h2>
                
                <p className="text-[11px] md:text-[12px] text-gray-500 uppercase tracking-widest mb-4">
                  Taxes calculated at checkout
                </p>
                
                <div className="flex justify-between items-center text-[13px] md:text-[14px] uppercase tracking-widest font-bold mb-8">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="mb-8 flex flex-col">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-widest mb-3 font-medium text-center">
                    {isFreeShipping ? "Your order is eligible for free shipping" : `You are $${(200 - subtotal).toFixed(2)} away from free shipping`}
                  </span>
                  <div className="w-full h-[3px] bg-gray-300">
                    <div 
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button className="w-full bg-transparent border border-black text-black text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-100">
                    Update Cart
                  </button>
                  <Link to="/checkout" className="w-full bg-black text-white text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-800 text-center block">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
