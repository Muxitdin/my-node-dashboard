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
        <div className="flex min-h-screen bg-[#fff] p-6">
            {/* Sidebar */}
            <Sidebar
                onConnectClick={() => setIsModalOpen(true)}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 mt-[56px] md:mt-0 md:pt-0 ml-0 md:ml-[220px] bg-[#F8F8F8] rounded-3xl">
                <div className="p-8 pt-6">
                    {/* Header */}
                    <div className="mb-6 lg:mb-8 flex flex-col gap-0">
                        <h1 className="font-spaceGrotesk text-2xl sm:text-3xl md:text-[49px] font-medium text-gray-900 mb-1 leading-[120%] tracking-[-2%]">
                            Dashboard
                        </h1>
                        <p className="font-lexend font-light text-[16px] leading-[140%]  text-gray-900">
                            Explore your data here.
                        </p>
                    </div>

                    {/* Dashboard Content */}
                    {authenticatedAddress ? (
                        <Dashboard walletAddress={authenticatedAddress} />
                    ) : (
                        <div className="font-spaceGrotesk bg-white rounded-2xl p-6 sm:p-8 lg:p-12 card-shadow text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
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
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                    Connect Your Wallet
                                </h2>
                                <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                                    Please connect your MetaMask wallet to view
                                    your dashboard and manage your nodes.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
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
