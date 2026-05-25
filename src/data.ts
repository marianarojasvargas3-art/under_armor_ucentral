import { Product } from './types';
import jacketImg from './assets/images/ua_storm_jacket_1779672680263.png';
import shoeImg from './assets/images/ua_velociti_shoe_1779672658093.png';
import tankImg from './assets/images/ua_racer_tank_1779672698212.png';
import leggingsImg from './assets/images/ua_meridian_leggings_1779672717581.png';
import visorImg from './assets/images/ua_play_up_visor_1779672737742.png';
import toteImg from './assets/images/ua_favorite_tote_1779672757682.png';

export const PRODUCTS: Product[] = [
  // HOMBRE
  {
    id: 'h1',
    name: 'Chaqueta Cortavientos UA Legacy',
    category: 'Chaquetas',
    description: 'Súper ligera, repele el agua y corta el viento sin perder transpirabilidad. Diseñada para mantenerte caliente, protegido y enfocado en condiciones extremas.',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
    gender: 'hombre'
  },
  {
    id: 'h2',
    name: 'Zapatillas de Running UA Charged Bandit',
    category: 'Calzado',
    description: 'Amortiguación Charged Cushioning® cargada de alta respuesta para un retorno de energía explosivo. Construcción de malla ultratranspirable para carreras veloces.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
    gender: 'hombre'
  },
  {
    id: 'h3',
    name: 'Camiseta Deportiva UA Tech™ 2.0',
    category: 'Ropa',
    description: 'Tejido UA Tech™ de secado ultra rápido, increíblemente suave y con un tacto natural. Cuenta con tecnología antiolor e ingeniería de ventilación avanzada.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    gender: 'hombre'
  },
  {
    id: 'h4',
    name: 'Pantalón Corto UA Launch Run',
    category: 'Ropa',
    description: 'Pantalón corto de alto rendimiento con forro de malla interno. Diseñado para ofrecer una libertad de movimiento absoluta, ligereza y transporte inteligente del sudor.',
    image: 'https://images.unsplash.com/photo-1471286174240-e6458ed7d01d?q=80&w=800&auto=format&fit=crop',
    gender: 'hombre'
  },
  {
    id: 'h5',
    name: 'Gorra Deporte UA Blitzing Classic',
    category: 'Accesorios',
    description: 'Banda de sudoración HeatGear® elástica integrada para absorber el calor de tu cabeza. Estilo clásico con visera precurvada y el logotipo deportivo bordado en relieve.',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce3a?q=80&w=800&auto=format&fit=crop',
    gender: 'hombre'
  },
  {
    id: 'h6',
    name: 'Mochila Impermeable UA Hustle 5.0',
    category: 'Accesorios',
    description: 'La tecnología UA Storm repele el agua con un acabado altamente resistente al desgaste y la abrasión. Cuenta con funda acolchada para portátil y compartimentos dedicados.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    gender: 'hombre'
  },
  
  // MUJER
  {
    id: 'm1',
    name: 'Chaqueta Deportiva UA Storm ColdGear',
    category: 'Chaquetas',
    description: 'Tejido elástico de doble capa con un interior cepillado ultra cálido y un exterior de secado rápido. Repelente al agua y ergonómico para entrenamientos con viento.',
    image: jacketImg,
    gender: 'mujer'
  },
  {
    id: 'm2',
    name: 'Zapatillas UA Flow Velociti Wind',
    category: 'Calzado',
    description: 'Revolucionaria amortiguación de una sola pieza que elimina la suela de goma pesada. Ofrece un tacto ultraligero de alta velocidad con un agarre firme e inmediato sin entresuela pesada.',
    image: shoeImg,
    gender: 'mujer'
  },
  {
    id: 'm3',
    name: 'Camiseta de Tirantes UA HeatGear® Racer',
    category: 'Ropa',
    description: 'Prenda clásica de compresión de tejido HeatGear® ultraligero que proporciona una cobertura superior sin añadir peso. Espalda cruzada deportiva clásica.',
    image: tankImg,
    gender: 'mujer'
  },
  {
    id: 'm4',
    name: 'Leggings Deportivos UA Meridian Infuse',
    category: 'Leggings',
    description: 'Formulado con tejido Meridian elástico en 4 direcciones que brinda una cobertura opaca y una sensación suave aterciopelada. Cintura súper alta libre de deslizamientos.',
    image: leggingsImg,
    gender: 'mujer'
  },
  {
    id: 'm5',
    name: 'Visera Deportiva UA Play Up Cap',
    category: 'Accesorios',
    description: 'Visera transpirable de perfil bajo con banda elástica trasera trasera. Confort de absorción superior con un corte elegante y deportivo para entrenar bajo el sol.',
    image: visorImg,
    gender: 'mujer'
  },
  {
    id: 'm6',
    name: 'Bolso Deportivo UA Favorite Tote',
    category: 'Accesorios',
    description: 'Ligero, extremadamente resistente y diseñado para acompañarte del estudio al asfalto. Cuenta con bolsillos organizadores internos y una correa ajustable premium.',
    image: toteImg,
    gender: 'mujer'
  }
];
