import { getAboutSection } from '@/sanity/queries/homepage';
import About from './About';

const AboutWrapper = async () => {
  const data = await getAboutSection();
  return <About data={data} />;
};

export default AboutWrapper;
