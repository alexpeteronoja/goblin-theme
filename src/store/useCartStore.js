import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  isDrawerOpen: false,

  addToCart: (product, selectedSize, selectedColor) => {
    const { items } = get();
    // Unique ID based on product ID, size, and color
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor.name}`;
    
    const existingItem = items.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
      set({
        items: items.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ),
        isDrawerOpen: true
      });
    } else {
      set({
        items: [...items, { product, selectedSize, selectedColor, quantity: 1, cartItemId }],
        isDrawerOpen: true
      });
    }
  },

  removeFromCart: (cartItemId) => {
    const { items } = get();
    set({
      items: items.filter(item => item.cartItemId !== cartItemId)
    });
  },

  updateQuantity: (cartItemId, newQuantity) => {
    const { items } = get();
    if (newQuantity <= 0) {
      set({ items: items.filter(item => item.cartItemId !== cartItemId) });
    } else {
      set({
        items: items.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      });
    }
  },

  toggleDrawer: (isOpen) => {
    set({ isDrawerOpen: isOpen });
  },

  getCartTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      // Assuming price is a string like "$295"
      const priceNumeric = parseFloat(item.product.price.replace(/[^0-9.-]+/g,""));
      return total + (priceNumeric * item.quantity);
    }, 0);
  },

  getCartCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  }
}));

export default useCartStore;
