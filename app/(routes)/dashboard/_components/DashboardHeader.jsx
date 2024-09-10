import { UserButton } from '@clerk/nextjs';
import React from 'react';

function DashboardHeader() {
  return (
    <div className="flex justify-between border-b p-5 shadow-sm">
      <div></div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default DashboardHeader;
