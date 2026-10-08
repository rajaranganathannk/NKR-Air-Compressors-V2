export const business = {
  name: 'NKR Air Compressors',
  tagline: 'Serving Since 2006',
  email: 'chinnakaniexport@gmail.com',
  instagram: '@nkr_air_compressors',
  phone: '+91 9842162675',
  whatsapp: '+91 9842162675',
  location: '149F, 2nd Floor, Nurulla Complex,Madurai Main road, Srivilliputtur, Tamilnadu-626125',
  description:
    'Air compressor and construction support services for residential, commercial and infrastructure projects.',
};

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' },
];

export const phoneLink = business.phone.replace(/\D/g, '');
export const whatsappLink = business.whatsapp.replace(/\D/g, '');
