import Header from '@/components/GlobalHeader';
import { Suspense } from 'react';

export default function ExpensesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <div>{children}</div>
    </>
  );
}
