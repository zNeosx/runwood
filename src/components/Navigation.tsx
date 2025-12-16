'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './logo';

const Navigation = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-transparent border-transparent transition-all duration-100',
        scrolled && 'bg-background/70 backdrop-blur-sm border-b border-border '
      )}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">
              Run<span className="text-accent">Wood</span>
            </div>
          </Link> */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-foreground hover:text-highlight transition-colors duration-200 font-medium text-lg',
                    isActive && 'text-highlight font-semibold'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="/contact" className={cn(buttonVariants())}>
              Devis Gratuit
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8 p-4">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'text-lg font-medium text-foreground hover:text-accent transition-colors',
                        isActive && 'text-highlight font-semibold'
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Button variant="default" asChild className="mt-4">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Devis Gratuit
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
