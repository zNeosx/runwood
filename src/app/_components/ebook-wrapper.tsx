import { getEbookSection } from '@/sanity/queries/homepage';
import React from 'react';
import Ebook from './Ebook';

const EbookWrapper = async () => {
  const data = await getEbookSection();

  return <Ebook data={data} />;
};

export default EbookWrapper;
