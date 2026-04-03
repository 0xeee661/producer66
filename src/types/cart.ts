export interface Beat {
  id: string;
  title: string;
  price: number;
  image?: string;
  producer?: string;
}

export interface CartItem extends Beat {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (beat: Beat) => void;
  removeFromCart: (beatId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}
