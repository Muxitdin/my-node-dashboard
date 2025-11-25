'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ConnectWalletModal } from '@/components/ConnectWalletModal';
import { Dashboard } from '@/components/Dashboard';
import { useAccount, useDisconnect } from 'wagmi';

export default function Home() {
    const [authenticatedAddress, setAuthenticatedAddress] = useState<
        string | null
    >(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { address, isConnected } = useAccount();
    useEffect(() => {
        if (isConnected && address) {
            setAuthenticatedAddress(address);
        }
    }, [isConnected, address]);

    const handleAuthenticated = (address: string) => {
        setAuthenticatedAddress(address);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        setAuthenticatedAddress(null); // 👈 скрываем Dashboard
    };

    return (
        <div className="flex min-h-screen bg-[#F5F6FA]">
            {/* Sidebar */}
            <Sidebar
                onConnectClick={() => setIsModalOpen(true)}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 ml-[232px]">
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-medium  text-gray-900 mb-1">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-500">
                            Explore your data here.
                        </p>
                    </div>

                    {/* Dashboard Content */}
                    {authenticatedAddress ? (
                        <Dashboard walletAddress={authenticatedAddress} />
                    ) : (
                        <div className="bg-white rounded-2xl p-12 card-shadow text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Connect Your Wallet
                                </h2>
                                <p className="text-gray-500 mb-8">
                                    Please connect your MetaMask wallet to view
                                    your dashboard and manage your nodes.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {/* Connect Wallet Modal */}
            <ConnectWalletModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAuthenticated={handleAuthenticated}
            />
        </div>
    );
}
