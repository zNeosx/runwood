import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  className?: string;
};
const Logo = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={cn('relative flex items-center space-x-2', className)}
    >
      <Image
        src="/images/logo.png"
        alt="logo"
        width={80}
        height={80}
        className="object-cover"
      />
    </Link>
  );
};

export default Logo;
