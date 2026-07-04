import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

export default function CartDrawer() {
  const { items, isDrawerOpen, toggleDrawer, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen]);

  const subtotal = getCartTotal();
  const isFreeShipping = subtotal >= 200; // Assuming $200 is threshold
  const shippingProgress = Math.min((subtotal / 200) * 100, 100);

  const handleCheckout = () => {
    toggleDrawer(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    toggleDrawer(false);
    navigate('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity"
          onClick={() => toggleDrawer(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#f4f4f0] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-8 flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-[12px] uppercase tracking-widest font-bold">Cart</h2>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Available Now</span>
          </div>
          <button onClick={() => toggleDrawer(false)} className="hover:opacity-70 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 [&::-webkit-scrollbar]:hidden">
          {items.length === 0 ? (
            <p className="text-[12px] uppercase tracking-widest text-center mt-12">Your cart is currently empty.</p>
          ) : (
            <div className="flex flex-col gap-8 pb-8">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4">
                  {/* Image */}
                  <div className="w-[100px] aspect-[4/5] bg-gray-200 flex-shrink-0">
                    <img 
                      src={item.product.images ? item.product.images[0] : item.product.images || item.product.image || "https://images.unsplash.com/photo-1555689986-343db3594cd2?auto=format&fit=crop&w=300&q=80"} 
                      alt={item.product.title || item.product.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-start pt-1">
                    <h3 className="text-[12px] text-black font-semibold uppercase tracking-widest mb-1 leading-snug">
                      {item.product.title || item.product.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                      {item.selectedColor?.name || 'PRISTINE'} / {item.selectedSize}
                    </p>
                    
                    {/* Price & Quantity Row */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center text-[12px]">
                        <button 
                          className="px-2 py-1 hover:opacity-70"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 hover:opacity-70"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[10px] text-gray-500 uppercase tracking-widest ml-4 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <span className="text-[12px] font-medium tracking-widest">
                        ${(parseFloat((item.product.price || "").replace(/[^0-9.-]+/g,"")) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-[#f4f4f0] px-6 py-6 border-t border-gray-300">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center mb-4">
              Taxes calculated at checkout
            </p>
            
            <div className="flex justify-between items-center text-[12px] uppercase tracking-widest font-bold mb-6">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="mb-6 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest mb-2 font-medium">
                {isFreeShipping ? "Your order is eligible for free shipping" : `You are $${(200 - subtotal).toFixed(2)} away from free shipping`}
              </span>
              <div className="w-full h-[2px] bg-gray-300">
                <div 
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <button 
                onClick={() => toggleDrawer(false)}
                className="flex-1 bg-transparent border border-black text-black text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-100"
              >
                Update
              </button>
              <button 
                onClick={handleCheckout}
                className="flex-1 bg-black text-white text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>

            <button 
              onClick={handleViewCart}
              className="w-full text-center text-[10px] uppercase tracking-widest font-bold underline hover:opacity-70 transition-opacity"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
