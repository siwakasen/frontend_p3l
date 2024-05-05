import {
  IconHome,
  IconPackage,
  IconGift,
  IconSpeakerphone
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Halamam Utama',
    icon: IconHome,
    href: '/'
  },
  {
    id: uniqueId(),
    title: 'Produk',
    icon: IconPackage,
    href: '/produk'
  },
  {
    id: uniqueId(),
    title: 'Hampers',
    icon: IconGift,
    href: '/hampers'
  },
  {
    id: uniqueId(),
    title: 'Promo',
    icon: IconSpeakerphone,
    href: '/promo'
  },
  
];
export default Menuitems;
