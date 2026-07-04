import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

// Custom Floating Label Input Component
const FloatingInput = ({ label, type = 'text', required = false, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative w-full mb-3.5">
      <input
        type={type}
        id={id}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="block w-full px-3 pb-2 pt-6 text-[13px] border border-gray-300 rounded-[4px] bg-white text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 ${
          isFocused || hasValue
            ? 'top-2 text-[10px]'
            : 'top-1/2 -translate-y-1/2 text-[13px]'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 200 ? 0 : 15; // Mock shipping logic
  const total = subtotal + shipping;

  const handlePayNow = (e) => {
    e.preventDefault();
    alert("This is a frontend replica. Payment processing is mocked.");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse bg-white font-sans text-[#333333]">
      
      {/* Right Column: Order Summary (Dark Green) */}
      <div className="w-full lg:w-[45%] xl:w-[42%] bg-[#0a3822] text-white lg:min-h-screen px-6 py-8 lg:px-12 lg:py-14 order-1 lg:order-none relative lg:fixed lg:right-0 lg:top-0 lg:bottom-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        
        <Link to="/" className="hidden lg:block text-white font-bold tracking-[0.2em] uppercase text-2xl mb-10">
          AIMÉ LEON DORE
        </Link>

        {/* Line Items */}
        <div className="flex flex-col gap-4 mb-6">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-[4px] bg-white bg-opacity-10 border border-white border-opacity-20 flex-shrink-0">
                <img 
                  src={item.product.images ? item.product.images[0] : item.product.images || item.product.image || "https://images.unsplash.com/photo-1555689986-343db3594cd2?auto=format&fit=crop&w=300&q=80"}
                  alt={item.product.title || item.product.name}
                  className="w-full h-full object-cover rounded-[4px]"
                />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-[11px] font-medium text-white">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 text-[13px] font-medium">
                <p>{item.product.title || item.product.name}</p>
                <p className="text-[11px] text-gray-300 opacity-80 mt-1">
                  {item.selectedColor?.name || 'PRISTINE'} / {item.selectedSize}
                </p>
              </div>
              <div className="text-[13px] font-medium">
                ${(parseFloat((item.product.price || "").replace(/[^0-9.-]+/g,"")) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Discount Code */}
        <div className="flex gap-3 py-6 border-y border-white border-opacity-20 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="w-full px-3 py-3.5 text-[13px] border border-white border-opacity-20 rounded-[4px] bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-white focus:bg-opacity-20 transition-all"
            />
          </div>
          <button className="px-5 py-3.5 bg-white bg-opacity-20 text-white font-medium text-[13px] rounded-[4px] hover:bg-opacity-30 transition-colors">
            Apply
          </button>
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Shipping</span>
            <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between items-center mt-3 pt-4 border-t border-white border-opacity-20">
            <span className="text-base font-semibold">Total</span>
            <span className="text-xl font-semibold">
              <span className="text-[11px] text-gray-400 mr-2 font-normal">USD</span>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Left Column: Form (White/Light Gray) */}
      <div className="w-full lg:w-[55%] xl:w-[58%] px-5 py-8 lg:px-12 lg:py-14 order-2 lg:order-none lg:mr-[45%] xl:mr-[42%]">
        <Link to="/" className="lg:hidden text-black font-bold tracking-[0.2em] uppercase text-2xl mb-8 block text-center">
          AIMÉ LEON DORE
        </Link>
        
        <div className="max-w-[560px] mx-auto lg:mx-0 lg:ml-auto">
          
          <form onSubmit={handlePayNow}>
            
            {/* Express Checkout */}
            <div className="mb-8">
              <div className="flex gap-3 mb-4">
                <button type="button" className="flex-1 h-12 bg-[#5a31f4] rounded-[4px] flex items-center justify-center hover:opacity-90 transition-opacity">
                  <span className="text-white font-bold text-lg tracking-tight">shop</span><span className="text-white font-bold text-lg bg-[#5a31f4] rounded-md px-1 ml-0.5" style={{boxShadow: 'inset 0 0 0 2px white'}}>Pay</span>
                </button>
                <button type="button" className="flex-1 h-12 bg-[#ffc439] rounded-[4px] flex items-center justify-center hover:opacity-90 transition-opacity">
                  <span className="text-[#003087] font-bold italic text-lg tracking-tight">PayPal</span>
                </button>
                <button type="button" className="flex-1 h-12 bg-black rounded-[4px] flex items-center justify-center hover:opacity-90 transition-opacity">
                  <span className="text-white font-semibold text-lg tracking-tight">G Pay</span>
                </button>
              </div>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-[12px]">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-medium">Contact</h2>
                <Link to="/account" className="text-[12px] text-blue-600 hover:underline">Log in</Link>
              </div>
              <FloatingInput label="Email" type="email" id="email" required />
              <div className="flex items-center mt-2">
                <input type="checkbox" id="newsletter" className="w-4 h-4 rounded-[4px] border-gray-300 text-black focus:ring-black cursor-pointer" />
                <label htmlFor="newsletter" className="ml-2 text-[13px] text-gray-600 cursor-pointer">Email me with news and offers</label>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Delivery</h2>
              <FloatingInput label="Country/Region" type="text" id="country" required />
              <div className="flex gap-3">
                <FloatingInput label="First name (optional)" type="text" id="firstName" />
                <FloatingInput label="Last name" type="text" id="lastName" required />
              </div>
              <FloatingInput label="Address" type="text" id="address" required />
              <FloatingInput label="Apartment, suite, etc. (optional)" type="text" id="apartment" />
              <div className="flex gap-3">
                <FloatingInput label="City" type="text" id="city" required />
                <FloatingInput label="State" type="text" id="state" required />
                <FloatingInput label="ZIP code" type="text" id="zip" required />
              </div>
              <FloatingInput label="Phone" type="tel" id="phone" required />
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Shipping method</h2>
              <div className="w-full bg-[#f8f8f8] border border-gray-300 rounded-[4px] p-4 text-center text-[13px] text-gray-500">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            {/* Payment */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-1">Payment</h2>
              <p className="text-[12px] text-gray-500 mb-4">All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-300 rounded-[4px] overflow-hidden bg-white">
                {/* Credit Card Option */}
                <div className="p-4 border-b border-gray-300 flex items-center justify-between bg-[#f4f4f4] cursor-pointer">
                  <div className="flex items-center">
                    <input type="radio" id="cc" name="payment" defaultChecked className="w-4 h-4 accent-black cursor-pointer" />
                    <label htmlFor="cc" className="ml-3 text-[13px] font-medium cursor-pointer">Credit card</label>
                  </div>
                  <div className="flex gap-1">
                    {/* Mock card icons */}
                    <div className="w-8 h-5 bg-white border border-gray-300 rounded-[2px]"></div>
                    <div className="w-8 h-5 bg-white border border-gray-300 rounded-[2px]"></div>
                    <div className="w-8 h-5 bg-white border border-gray-300 rounded-[2px]"></div>
                  </div>
                </div>
                {/* Active CC Fields */}
                <div className="p-4 bg-gray-50">
                  <FloatingInput label="Card number" type="text" id="ccNumber" required />
                  <div className="flex gap-3">
                    <FloatingInput label="Expiration date (MM / YY)" type="text" id="ccExp" required />
                    <FloatingInput label="Security code" type="text" id="ccCvv" required />
                  </div>
                  <FloatingInput label="Name on card" type="text" id="ccName" required />
                </div>
                
                {/* PayPal Option */}
                <div className="p-4 border-b border-gray-300 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" id="paypal" name="payment" className="w-4 h-4 accent-black cursor-pointer" />
                  <label htmlFor="paypal" className="ml-3 text-[13px] font-medium cursor-pointer">PayPal</label>
                </div>
                
                {/* Klarna Option */}
                <div className="p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" id="klarna" name="payment" className="w-4 h-4 accent-black cursor-pointer" />
                  <label htmlFor="klarna" className="ml-3 text-[13px] font-medium cursor-pointer flex gap-1 items-center">
                    <span className="font-bold bg-[#ffb3c7] px-2 py-0.5 rounded-[12px] text-[10px]">Klarna.</span>
                    Pay flexibly
                  </label>
                </div>
              </div>
            </div>

            {/* Call To Action */}
            <button 
              type="submit" 
              className="w-full bg-black text-white text-base font-bold py-4 rounded-[4px] hover:bg-gray-800 transition-colors mt-2"
            >
              Pay now
            </button>
            
          </form>
          
          <div className="mt-8 border-t border-gray-200 pt-4 flex gap-4 text-[11px] text-gray-500 justify-center lg:justify-start">
            <Link to="#" className="hover:underline hover:text-black">Refund policy</Link>
            <Link to="#" className="hover:underline hover:text-black">Privacy policy</Link>
            <Link to="#" className="hover:underline hover:text-black">Terms of service</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
