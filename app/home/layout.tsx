import {ReactNode} from 'react';

import http from '@/utils/http';

export default async function RootLayout({
  children
}: {children: ReactNode}) {
  return (
    <>
      {children}
    </>
  )
}