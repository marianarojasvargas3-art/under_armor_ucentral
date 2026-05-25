export interface UserRegister {
  nombre: string;
  email: string;
  edad: number;
  genero: 'hombre' | 'mujer';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gender: 'hombre' | 'mujer';
}

export interface HistoryItem {
  user: UserRegister;
  product: Product;
  timestamp: string;
}
