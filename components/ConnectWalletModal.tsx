'use client';

import { useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useState } from 'react';
import Image from 'next/image';
import NodeImageAuthPage from '@/public/NodeImageAuthPage.png';

interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthenticated: (address: string) => void;
}

export function ConnectWalletModal({
    isOpen,
    onClose,
    onAuthenticated,
}: ConnectWalletModalProps) {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { signMessage } = useSignMessage();
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectedAddress, setConnectedAddress] = useState<string | null>(
        null,
    );

    if (!isOpen) return null;

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            const injectedConnector = connectors.find(
                (c) => c.id === 'injected',
            );
            if (!injectedConnector) {
                window.open('https://metamask.io/download/', '_blank');
                setIsConnecting(false);
                return;
            }

            connect(
                { connector: injectedConnector },
                {
                    onSuccess: async (data) => {
                        const address = data.accounts[0];
                        console.log(data);
                        setConnectedAddress(address);

                        // Sign message for authentication
                        await signMessage(
                            {
                                message: `Sign this message to verify you own this wallet: ${address}`,
                            },
                            {
                                onSuccess: () => {
                                    onAuthenticated(address);
                                    onClose();
                                },
                                onError: (error) => {
                                    console.error('Signature failed:', error);
                                    disconnect();
                                    setConnectedAddress(null);
                                    setIsConnecting(false);
                                },
                            },
                        );
                    },
                    onError: (error) => {
                        console.error('Connection failed:', error);
                        setIsConnecting(false);
                    },
                },
            );
        } catch (error) {
            console.error('Connection error:', error);
            setIsConnecting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="
                absolute inset-0
                bg-opacity-50
                backdrop-brightness-20
                transition-opacity
                duration-200
                opacity-100
            "
                // если нужно закрывать по клику на фон:
                onClick={onClose}
            />
            <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden animate-fadeIn">
                {/* Node Image */}
                <div className="bg-gradient-to-br p-6 relative">
                    <Image src={NodeImageAuthPage} alt={'NodeImageAuthPage'} />
                </div>

                {/* Content */}
                <div className="p-6 pt-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Connect your wallet
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        You currently don't have any nodes in your collection.
                    </p>

                    {/* MetaMask Button */}
                    <button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="w-full bg-[#121212] hover:bg-gray-800 text-white rounded-xl p-4 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white rounded-md items-center justify-center">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M27.5328 3.56641L17.5391 10.9889L19.3871 6.60972L27.5328 3.56641Z"
                                        fill="#E2761B"
                                        stroke="#E2761B"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4.46086 3.56641L14.3742 11.0592L12.6165 6.60972L4.46086 3.56641ZM23.9361 20.7717L21.2744 24.8495L26.9693 26.4164L28.6065 20.8621L23.9361 20.7717ZM3.40625 20.8621L5.03337 26.4164L10.7283 24.8495L8.06664 20.7717L3.40625 20.8621Z"
                                        fill="#E4761B"
                                        stroke="#E4761B"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.4073 13.8801L8.82031 16.2806L14.4751 16.5317L14.2742 10.4551L10.4073 13.8801ZM21.5862 13.8801L17.669 10.3848L17.5385 16.5317L23.1832 16.2806L21.5862 13.8801ZM10.7287 24.848L14.1235 23.1908L11.1907 20.9008L10.7287 24.848ZM17.8699 23.1908L21.2748 24.848L20.8027 20.9008L17.8699 23.1908Z"
                                        fill="#E4761B"
                                        stroke="#E4761B"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M21.2727 24.8487L17.8678 23.1914L18.139 25.4111L18.1089 26.3452L21.2727 24.8487ZM10.7266 24.8487L13.8904 26.3452L13.8703 25.4111L14.1214 23.1914L10.7266 24.8487Z"
                                        fill="#D7C1B3"
                                        stroke="#D7C1B3"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.9418 19.4351L11.1094 18.6015L13.1081 17.6875L13.9418 19.4351ZM18.0497 19.4351L18.8834 17.6875L20.8922 18.6015L18.0497 19.4351Z"
                                        fill="#233447"
                                        stroke="#233447"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.7241 24.8487L11.2063 20.7709L8.0625 20.8613L10.7241 24.8487ZM20.7882 20.7709L21.2703 24.8487L23.9319 20.8613L20.7882 20.7709ZM23.1786 16.2812L17.5339 16.5323L18.0562 19.435L18.8899 17.6874L20.8987 18.6014L23.1786 16.2812ZM11.1058 18.6014L13.1146 17.6874L13.9382 19.435L14.4705 16.5323L8.8158 16.2812L11.1058 18.6014Z"
                                        fill="#CD6116"
                                        stroke="#CD6116"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.82031 16.2812L11.1907 20.9015L11.1103 18.6014L8.82031 16.2812ZM20.9032 18.6014L20.8027 20.9015L23.1832 16.2812L20.9032 18.6014ZM14.4751 16.5323L13.9427 19.435L14.6056 22.86L14.7563 18.3503L14.4751 16.5323ZM17.5385 16.5323L17.2673 18.3403L17.3878 22.86L18.0607 19.435L17.5385 16.5323Z"
                                        fill="#E4751F"
                                        stroke="#E4751F"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.0598 19.4352L17.3868 22.8602L17.8689 23.1916L20.8018 20.9016L20.9022 18.6016L18.0598 19.4352ZM11.1094 18.6016L11.1897 20.9016L14.1226 23.1916L14.6047 22.8602L13.9418 19.4352L11.1094 18.6016Z"
                                        fill="#F6851B"
                                        stroke="#F6851B"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.1089 26.3462L18.139 25.4121L17.8879 25.1911H14.1013L13.8703 25.4121L13.8904 26.3462L10.7266 24.8496L11.8314 25.7536L14.0712 27.3104H17.918L20.1679 25.7536L21.2727 24.8496L18.1089 26.3462Z"
                                        fill="#C0AD9E"
                                        stroke="#C0AD9E"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17.8647 23.1908L17.3826 22.8594H14.6004L14.1183 23.1908L13.8672 25.4105L14.0982 25.1896H17.8848L18.1359 25.4105L17.8647 23.1908Z"
                                        fill="#161616"
                                        stroke="#161616"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M27.9536 11.471L28.8074 7.37306L27.5318 3.56641L17.8695 10.7378L21.5858 13.8815L26.8388 15.4183L28.0038 14.0623L27.5016 13.7007L28.3052 12.9675L27.6824 12.4854L28.486 11.8727L27.9536 11.471ZM3.19531 7.37306L4.04905 11.471L3.50667 11.8727L4.31019 12.4854L3.69751 12.9675L4.50102 13.7007L3.99883 14.0623L5.15388 15.4183L10.4069 13.8815L14.1231 10.7378L4.46085 3.56641L3.19531 7.37306Z"
                                        fill="#763D16"
                                        stroke="#763D16"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M26.8388 15.4179L21.5858 13.8812L23.1828 16.2817L20.8024 20.9019L23.9361 20.8617H28.6065L26.8388 15.4179ZM10.4069 13.8812L5.1539 15.4179L3.40625 20.8617H8.06664L11.1903 20.9019L8.81993 16.2817L10.4069 13.8812ZM17.5381 16.5328L17.8695 10.7374L19.3962 6.60938H12.6165L14.1231 10.7374L14.4747 16.5328L14.5952 18.3608L14.6052 22.8605H17.3874L17.4075 18.3608L17.5381 16.5328Z"
                                        fill="#F6851B"
                                        stroke="#F6851B"
                                        strokeWidth="0.415842"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="font-semibold">
                                {isConnecting ? 'Connecting...' : 'MetaMask'}
                            </span>
                        </div>
                        <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
                            Connect
                            <svg
                                width="13"
                                height="8"
                                viewBox="0 0 13 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.5 3.18198C0.223858 3.18198 -2.41411e-08 3.40583 0 3.68198C2.41411e-08 3.95812 0.223858 4.18198 0.5 4.18198L0.5 3.68198L0.5 3.18198ZM12.8536 4.03553C13.0488 3.84027 13.0488 3.52368 12.8536 3.32842L9.67157 0.146442C9.47631 -0.0488206 9.15973 -0.0488205 8.96447 0.146442C8.7692 0.341704 8.7692 0.658286 8.96447 0.853549L11.7929 3.68198L8.96447 6.5104C8.7692 6.70566 8.7692 7.02225 8.96447 7.21751C9.15973 7.41277 9.47631 7.41277 9.67157 7.21751L12.8536 4.03553ZM0.5 3.68198L0.5 4.18198L12.5 4.18198L12.5 3.68198L12.5 3.18198L0.5 3.18198L0.5 3.68198Z"
                                    fill="#121212"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
