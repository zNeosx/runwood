'use client';
import { Language } from '@/lib/stripe/config';
import { VariantProps } from 'class-variance-authority';
import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import { downloadEbook } from '@/app/actions/download-ebook.action';

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
      const result = await downloadEbook(language);

      if (!result.success) {
        console.error('Download error:', result.error);
        alert(result.error);
        return;
      }

      // Convertir base64 en blob
      const byteCharacters = atob(result.data!);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: result.mimeType });

      // Créer un lien de téléchargement
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName!;
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
      isLoading={isLoading}
      textInLoading="Téléchargement en cours"
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
