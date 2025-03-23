export interface Cart {
  id: number;
  product: {
    name: string;
    price: number;
    imageUrl?: string;  // ✅ Se permite opcionalmente
  };
  quantity: number;
  total: number;
}

