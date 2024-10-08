'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex items-center justify-between border p-5 shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={'/chart-donut.svg'} alt="logo" width={40} height={25} />
        <span className="text-xl font-bold text-blue-800">Koober</span>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex items-center gap-3">
          <Link href={'/dashboard'}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
