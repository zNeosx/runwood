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
import { ShoppingCart } from 'lucide-react';
import { LANGUAGES, Language } from '@/lib/stripe/config';
import { toast } from 'sonner';
import { EbookPurchaseSubmitButton } from './ebook-purchase-submit-btn';

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
  // selectedLang est toujours nécessaire pour la sélection utilisateur
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);

  // 💡 Fonction qui sera appelée par le formulaire
  const handleFormSubmit = async () => {
    // 1. Récupérer la langue depuis l'état (ou potentiellement depuis FormData si vous aviez un champ caché)
    if (!selectedLang) return; // Sécurité redondante, le bouton est disabled mais on la garde

    // 2. Appeler la Server Action (elle n'a pas besoin de setIsloading)
    // On passe selectedLang au lieu de formData, car c'est ce dont votre action a besoin
    const { error } = await createCheckoutSession(selectedLang);

    // 3. Gestion des erreurs (si l'erreur Stripe se produit avant la redirection)
    if (error) {
      toast.error(error);
      // setIsloading n'est plus nécessaire ici, l'état 'pending' gère l'affichage
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedLang(null);
      // L'état isLoading est retiré
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
              // L'état isLoading est remplacé par l'état pending (géré par SubmitButton)
              // Ici, on peut laisser le bouton actif pour changer la sélection même pendant la soumission
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="text-3xl">{lang.flag}</span>
              <p className="mt-2 font-medium">{lang.label}</p>
            </button>
          ))}
        </div>

        {/* 💡 Étape Cruciale : Le formulaire entoure la zone de paiement */}
        <form action={handleFormSubmit}>
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

            {/* 💡 Utilisation du composant SubmitButton pour gérer l'état de chargement */}
            <EbookPurchaseSubmitButton selectedLang={selectedLang} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
