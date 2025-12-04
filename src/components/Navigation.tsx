'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Mon Livre', href: '/ebook' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-transparent border-transparent transition-all duration-300',
        scrolled && 'bg-background/95 backdrop-blur-sm border-b border-border '
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">
              Run<span className="text-accent">Wood</span>
            </div>
          </Link> */}
          <Link
            href="/"
            className="relative flex items-center space-x-2 size-20"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-white hover:text-highlight transition-colors duration-200 font-medium'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="default" asChild>
              <Link href="/contact">Devis Gratuit</Link>
            </Button>
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
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
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
