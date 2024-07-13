import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
// import Providers from '@/redux/provider';
// import Sidebar from '@/components/shared/sidbar/Sidebar';
import Navigation from '@/@core/components/navigation';





const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (


        <>
            {/* <Sidebar /> */}
            {children}
    

            <Navigation />
            
        </>


    )
}
