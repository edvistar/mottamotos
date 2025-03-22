export interface Cart {
  id: number;
  product: {  // ✅ Asegúrate de que `product` tenga estas propiedades
    name: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
  total: number;
}
