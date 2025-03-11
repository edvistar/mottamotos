export interface Imagen {
  id: number;
  productId: number;
  imageUrl: string;
  localImageUrl: string;
  description: string;
  seleccionado: boolean; // Para la selección
}
