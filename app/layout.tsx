import type { Metadata } from 'next';
import { Space_Grotesk, Lexend } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: "--font-space-grotesk",
});

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-lexend',
});

export const metadata: Metadata = {
    title: 'Node Dashboard',
    description: 'Manage your nodes and track your points',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.variable} ${lexend.variable}`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
