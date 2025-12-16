'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function EbookPurchaseSubmitButton({
  selectedLang,
}: {
  selectedLang: string | null;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={!selectedLang || pending}
      isLoading={pending}
      textInLoading="Redirection..."
      size="lg"
    >
      <ShoppingCart className="h-5 w-5" />
      Payer
    </Button>
  );
}
