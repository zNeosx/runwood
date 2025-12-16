import { getHeroSection } from '@/sanity/queries/homepage';
import Hero from './Hero';

const HeroWrapper = async () => {
  const data = await getHeroSection();

  return <Hero data={data} />;
};

export default HeroWrapper;
