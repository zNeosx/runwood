'use client';
import { EBOOK_FILES, Language } from '@/lib/stripe/config';
import { supabase } from '@/lib/supabase/client';
import { VariantProps } from 'class-variance-authority';
import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { Button, buttonVariants } from './ui/button';

const DownloadEbookBtn = ({
  variant = 'highlight',
  size,
  className,
  children,
  language,
}: VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
  language: Language;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadEbook = async () => {
    setIsLoading(true);
    try {
      const fileName = EBOOK_FILES[language];

      const { data, error } = await supabase.storage
        .from('ebooks')
        .download(fileName);

      if (error) {
        console.error('Download error:', error);
        return;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownloadEbook}
      isLoading={isLoading}
    >
      {children ?? (
        <>
          <BookOpen className="h-5 w-5" />
          Télécharger mon e-book
        </>
      )}
    </Button>
  );
};

export default DownloadEbookBtn;
