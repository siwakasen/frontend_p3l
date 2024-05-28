import {
  IconHome,
  IconPackage,
  IconGift,
  IconSpeakerphone,
  IconAccessPoint,
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
  {
    id: uniqueId(),
    title: 'Tentang Kami',
    icon: IconAccessPoint,
    href: '/tentang-kami'
  }

];
export default Menuitems;
