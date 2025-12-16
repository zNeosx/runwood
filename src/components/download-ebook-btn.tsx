'use client';
import { Language } from '@/lib/stripe/config';
import { VariantProps } from 'class-variance-authority';
import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import { getEbookDownloadUrl } from '@/app/actions/download-ebook.action';

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
      const result = await getEbookDownloadUrl(language);

      if (!result.success) {
        console.error('Download error:', result.error);
        alert(result.error);
        return;
      }

      const link = document.createElement('a');
      link.href = result.downloadUrl!;
      link.download = `runwood-ebook-${language}.pdf`; // Nom du fichier téléchargé
      link.target = '_blank'; // Fallback si download ne marche pas
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      isLoading={isLoading}
      textInLoading="Préparation du téléchargement"
      onClick={handleDownloadEbook}
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
