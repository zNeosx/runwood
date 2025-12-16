import { getAboutSection } from '@/sanity/queries/homepage';
import About from './About';

const AboutWrapper = async () => {
  const data = await getAboutSection();
  await new Promise((r) => setTimeout(r, 3000));
  return <About data={data} />;
};

export default AboutWrapper;
