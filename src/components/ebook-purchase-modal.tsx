// components/ebook-purchase-modal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '@/app/actions/checkout';
import { Loader2, ShoppingCart } from 'lucide-react';
import { LANGUAGES, Language } from '@/lib/stripe/config';
import { toast } from 'sonner';

interface EbookPurchaseModalProps {
  price: number;
  originalPrice?: number | null;
  children?: React.ReactNode;
}

export function EbookPurchaseModal({
  price,
  originalPrice,
  children,
}: EbookPurchaseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!selectedLang) return;
    setIsLoading(true);
    const { error } = await createCheckoutSession(selectedLang);

    if (error) {
      toast.error(error);
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedLang(null);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Acheter — {price}€
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choisissez la langue de votre e-book</DialogTitle>
          <DialogDescription>
            Le guide sera disponible immédiatement après le paiement.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 py-6">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              disabled={isLoading}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-3xl">{lang.flag}</span>
              <p className="mt-2 font-medium">{lang.label}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <div className="flex items-center gap-2">
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {originalPrice}€
                </span>
              )}
              <span className="text-2xl font-bold">{price}€</span>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={!selectedLang || isLoading}
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
            {isLoading ? 'Redirection...' : 'Payer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
