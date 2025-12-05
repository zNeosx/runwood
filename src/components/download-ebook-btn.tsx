'use client';
import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import { VariantProps } from 'class-variance-authority';
import { supabase } from '@/lib/supabase/client';

const DownloadEbookBtn = ({
  variant = 'highlight',
  size,
  className,
  children,
}: VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [downloadIsLoading, setDownloadIsLoading] = useState(false);

  const handleDownloadEbook = async () => {
    setDownloadIsLoading(true);
    const { data, error } = await supabase.storage
      .from('ebooks')
      .download('ebook-fr.pdf');

    if (data) {
      // Crée un lien de téléchargement
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ebook.pdf';
      a.click();
    }

    setDownloadIsLoading(false);
    return;
  };

  if (children) {
    return (
      <Button
        type="submit"
        variant={variant}
        size={size}
        className={className}
        onClick={handleDownloadEbook}
        isLoading={downloadIsLoading}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownloadEbook}
      isLoading={downloadIsLoading}
    >
      <BookOpen className="h-5 w-5" />
      Télécharger mon e-book
    </Button>
  );
};

export default DownloadEbookBtn;
