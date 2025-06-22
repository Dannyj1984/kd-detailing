'use client';

import Navigation from './Navigation';
import Footer from './Footer';
import PageTransition from './PageTransition';

export default function PageLayout({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Navigation />
      <main className={`pt-16 min-h-screen ${className}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
