import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
// import Providers from '@/redux/provider';
// import Header from '@/components/shared/Header';
// import Navigation from '@/components/shared/navigation';
// import Sidebar from '@/components/shared/sidbar/Sidebar';

import AppInitializer from '@/@core/components/appInitializer/AppInitializer';
import { getUser } from '@/actions/UserActions';
import TreeModal from '@/components/shared/Modal/TreeModal/TreeModal';
import { Toaster } from 'react-hot-toast';



const inter = Inter({ subsets: ['latin'] })
const appProvider = process.env.APP_PROVIDER
export const metadata: Metadata = {

  title: appProvider,
  description:
    'descrption',
  keywords: ['پلاک', 'درختی'],
  openGraph: {
    title: appProvider,
    description:
      'descrption',
    url: 'https://tree.isfahan.ir/AppTree',
    siteName: appProvider,
    type: 'website',
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const user = await getUser()

  return (
    <html lang="fa" dir='rtl'>
      <body>

        {children}

        <TreeModal />
        <Toaster />
      </body>
    </html>
  )
}
