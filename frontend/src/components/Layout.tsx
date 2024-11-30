import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen p-4 bg-gray-800 text-white">
      <header className="py-4 text-center">
        <h1 className="text-3xl font-bold">Coin Catalog</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

