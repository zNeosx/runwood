// app/components/BuyButton.tsx
import { createCheckoutSession } from '@/app/actions/checkout';
import { Button, buttonVariants } from './ui/button';
import { VariantProps } from 'class-variance-authority';
import { BookOpen } from 'lucide-react';

export function BuyButton({
  variant = 'highlight',
  size,
  className,
  children,
}: VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
}) {
  if (children) {
    return (
      <form action={createCheckoutSession}>
        <Button
          type="submit"
          variant={variant}
          size={size}
          className={className}
        >
          {children}
        </Button>
      </form>
    );
  }
  return (
    <form action={createCheckoutSession}>
      <Button type="submit" variant={variant} size={size} className={className}>
        <BookOpen className="h-5 w-5" />
        Acheter l&apos;e-book
      </Button>
    </form>
  );
}
