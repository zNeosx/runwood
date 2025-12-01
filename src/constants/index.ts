import type { Photo } from 'react-photo-album';

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

function imageLink(
  path: string,
  width: number,
  height: number,
  size: number,
  extension: string
) {
  return `https://images.react-photo-album.com/hiking/${path}.${width}x${height}.${size}w.${extension}`;
}

const photos = [
  {
    id: 1,
    title: "Salon d'extérieur",
    category: 'Extérieur',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 2,
    title: 'Table basse géométrique',
    category: 'Tables',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 3,
    title: 'Jardinière à étages',
    category: 'Jardin',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=60',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 4,
    title: 'Meuble TV rustique',
    category: 'Intérieur',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    span: 'lg:col-span-1 lg:row-span-2',
  },
  {
    id: 5,
    title: "Banc d'entrée",
    category: 'Mobilier',
    image:
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80',
    span: 'lg:col-span-2 lg:row-span-1',
  },
].map((item) => {
  const match = item.image.match(/\?w=(\d+)/);

  const width = match ? parseInt(match[1], 10) : 800;
  const height = Math.round(width * 0.66); // approximation 3/2

  return {
    src: item.image,
    width,
    height,
    alt: item.title,
  };
});

export default photos;
