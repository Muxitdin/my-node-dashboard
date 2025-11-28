'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { Lexend } from 'next/font/google';
import Image from 'next/image';

const lexend = Lexend({ subsets: ['latin'] });


interface SidebarProps {
    onConnectClick: () => void;
    onLogout?: () => void;
}

export function Sidebar({ onConnectClick, onLogout }: SidebarProps) {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleLogout() {
        disconnect();
        onLogout?.();
        setIsOpen(false);
        window.location.reload();
    }

    return (
        <>
        {/* Top bar for small screens */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-3 md:hidden">
            <div className="flex items-center gap-2">
                {/* Small logo version or same SVG but smaller */}
                <svg
                    width="96"
                    height="32"
                    viewBox="0 0 143 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.79688 12.1152V20.1274H14.3054V18.024H31.0125V12.1152H5.79688ZM14.3054 29.978V27.6653H5.79688V35.8848H31.2861V29.9789H14.3054V29.978Z"
                        fill="#121212"
                    />
                    <path
                        d="M30.5 35.8858V12.1172H37.8759L49.5409 22.0321C49.6782 22.1473 49.8717 22.3201 50.1244 22.5505C50.376 22.7809 50.6392 23.0228 50.9137 23.2762C51.1883 23.5297 51.44 23.7601 51.6688 23.9674H52.012V12.1172H59.9713V35.8858H52.664L41.5825 26.5229C41.102 26.1313 40.5929 25.6935 40.0562 25.2097C39.5185 24.7258 39.0895 24.3351 38.7692 24.0346H38.4603V35.8849H30.501L30.5 35.8858Z"
                        fill="#121212"
                    />
                    <path
                        d="M68.0098 35.8848V18.6452H57.9922V12.1152H86.5026V18.6452H76.4849V35.8848H68.0108H68.0098Z"
                        fill="#121212"
                    />
                    <path
                        d="M85.2109 35.8839V12.1152H105.659C107.42 12.1152 108.89 12.4839 110.067 13.2212C111.245 13.9584 112.131 14.9261 112.726 16.1232C113.321 17.3213 113.618 18.6106 113.618 19.993C113.618 21.5818 113.269 22.993 112.572 24.2247C111.874 25.4573 110.85 26.4413 109.501 27.1786L114.167 35.8848H104.595L101.027 28.4573H93.6851V35.8848H85.2109V35.8839ZM93.6851 22.5485H102.674C103.314 22.5485 103.851 22.3469 104.286 21.9437C104.72 21.5415 104.938 20.9828 104.938 20.2685C104.938 19.7847 104.835 19.3767 104.629 19.0416C104.423 18.7085 104.155 18.4541 103.823 18.2813C103.491 18.1085 103.108 18.0221 102.673 18.0221H93.6842V22.5476L93.6851 22.5485Z"
                        fill="#121212"
                    />
                    <path
                        d="M119.034 35.8848V26.522L107.266 12.1152H117.18L123.322 20.1303H123.562L129.703 12.1152H139.241L127.508 26.522V35.8848H119.034Z"
                        fill="#121212"
                    />
                    <path
                        d="M20.6644 26.798H2.48438L5.79911 21.2012H23.9782L20.6644 26.798Z"
                        fill="#121212"
                    />
                    <path
                        d="M104.198 12.1152H108.429L108.845 13.6964L105.458 13.9671L102.805 12.9696L104.198 12.1152Z"
                        fill="#121212"
                    />
                </svg>
            </div>

            {/* Hamburger */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-md p-2 border border-gray-200 hover:bg-gray-100 active:scale-95 transition"
                aria-label="Toggle sidebar"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isOpen ? (
                        <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                        <>
                            <path d="M4 6h16" />
                            <path d="M4 12h16" />
                            <path d="M4 18h10" />
                        </>
                    )}
                </svg>
            </button>
        </header>

        {/* Backdrop for mobile when sidebar open */}
        {isOpen && (
            <div
                className="fixed inset-0 z-40 bg-black/30 md:hidden"
                onClick={() => setIsOpen(false)}
            />
        )}


        {/* Sidebar */}
            <aside className={`
                    fixed left-0 top-0 z-50 h-screen bg-white flex flex-col
                    w-[232px]
                    transition-transform duration-200
                    md:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
            {/* Logo (desktop) */}
            <div className="ml-4 mt-6 px-2 pb-6 md:block">
                <div className="flex items-center gap-2">
                    <svg
                        width="143"
                        height="48"
                        viewBox="0 0 143 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.79688 12.1152V20.1274H14.3054V18.024H31.0125V12.1152H5.79688ZM14.3054 29.978V27.6653H5.79688V35.8848H31.2861V29.9789H14.3054V29.978Z"
                            fill="#121212"
                        />
                        <path
                            d="M30.5 35.8858V12.1172H37.8759L49.5409 22.0321C49.6782 22.1473 49.8717 22.3201 50.1244 22.5505C50.376 22.7809 50.6392 23.0228 50.9137 23.2762C51.1883 23.5297 51.44 23.7601 51.6688 23.9674H52.012V12.1172H59.9713V35.8858H52.664L41.5825 26.5229C41.102 26.1313 40.5929 25.6935 40.0562 25.2097C39.5185 24.7258 39.0895 24.3351 38.7692 24.0346H38.4603V35.8849H30.501L30.5 35.8858Z"
                            fill="#121212"
                        />
                        <path
                            d="M68.0098 35.8848V18.6452H57.9922V12.1152H86.5026V18.6452H76.4849V35.8848H68.0108H68.0098Z"
                            fill="#121212"
                        />
                        <path
                            d="M85.2109 35.8839V12.1152H105.659C107.42 12.1152 108.89 12.4839 110.067 13.2212C111.245 13.9584 112.131 14.9261 112.726 16.1232C113.321 17.3213 113.618 18.6106 113.618 19.993C113.618 21.5818 113.269 22.993 112.572 24.2247C111.874 25.4573 110.85 26.4413 109.501 27.1786L114.167 35.8848H104.595L101.027 28.4573H93.6851V35.8848H85.2109V35.8839ZM93.6851 22.5485H102.674C103.314 22.5485 103.851 22.3469 104.286 21.9437C104.72 21.5415 104.938 20.9828 104.938 20.2685C104.938 19.7847 104.835 19.3767 104.629 19.0416C104.423 18.7085 104.155 18.4541 103.823 18.2813C103.491 18.1085 103.108 18.0221 102.673 18.0221H93.6842V22.5476L93.6851 22.5485Z"
                            fill="#121212"
                        />
                        <path
                            d="M119.034 35.8848V26.522L107.266 12.1152H117.18L123.322 20.1303H123.562L129.703 12.1152H139.241L127.508 26.522V35.8848H119.034Z"
                            fill="#121212"
                        />
                        <path
                            d="M20.6644 26.798H2.48438L5.79911 21.2012H23.9782L20.6644 26.798Z"
                            fill="#121212"
                        />
                        <path
                            d="M104.198 12.1152H108.429L108.845 13.6964L105.458 13.9671L102.805 12.9696L104.198 12.1152Z"
                            fill="#121212"
                        />
                    </svg>
                </div>
            </div>

            {/* MetaMask Connection */}
            <div className="px-0 ml-4 mb-4 mr-4 md:mr-0 mt-0">
                {/* 🔐 ВАЖНО: на сервере всегда один и тот же блок */}
                {!mounted && (
                    <div className="bg-[#ECF1F7] rounded-xl p-3 h-10" />
                )}

                {mounted &&
                    (isConnected && address ? (
                        <div className="bg-[#ECF1F7] rounded-md p-3">
                            <div className="flex items-center gap-2 1.5">
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
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-lexend font-normal leading-[140%] text-[#121212]">
                                        MetaMask
                                    </div>
                                    <div className="text-xs font-lexend leading-[140%] font-light text-gray-500 truncate">
                                        {address.slice(0, 10)}…
                                        {/*{address.slice(-4)}*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                onConnectClick();
                                setIsOpen(false);
                            }}
                            className="w-full bg-[#ECF1F7] hover:bg-[#E5E7EB] cursor-pointer rounded-md p-3 transition-colors"
                        >
                            <div className="flex items-center gap-2">
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

                                <div className="text-left flex-1">
                                    <div className="text-sm font-lexend font-normal leading-[140%] text-[#121212]">
                                        MetaMask
                                    </div>
                                    <div className="text-xs font-lexend leading-[140%] font-light text-gray-500">
                                        Not connected
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
            </div>

            {/* Main Menu */}
            <div className="flex-1 px-0 ml-4 mr-4 md:mr-0 pl-0 overflow-y-auto">
                <div
                    className={`text-sm font-light font-lexend text-gray-400 leading-[140%] tracking-[0] mb-2`}
                >
                    Main Menu
                </div>
                <nav className="space-y-1">
                    <button onClick={() => setIsOpen(false)} className="font-lexend font-normal text-sm leading-[140%] w-full flex items-center gap-2 p-3 text-[#121212] bg-[#F1F1F1] rounded-md">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="text-gray-900"
                        >
                            <rect
                                x="2"
                                y="2"
                                width="6"
                                height="6"
                                rx="1"
                                fill="currentColor"
                            />
                            <rect
                                x="10"
                                y="2"
                                width="6"
                                height="6"
                                rx="1"
                                fill="currentColor"
                            />
                            <rect
                                x="2"
                                y="10"
                                width="6"
                                height="6"
                                rx="1"
                                fill="currentColor"
                            />
                            <rect
                                x="10"
                                y="10"
                                width="6"
                                height="6"
                                rx="1"
                                fill="currentColor"
                            />
                        </svg>
                        Dashboard
                    </button>
                </nav>
            </div>

            {/* Log out */}
            {mounted && isConnected && (
                <div className="px-4 pb-8 pt-2 border-t border-white">
                    <button
                        onClick={() => handleLogout()}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium font-lexend text-gray-500 cursor-pointer  hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_374_8030" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                <rect width="20" height="20" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_374_8030)">
                                <path d="M4.42345 17.0833C4.00248 17.0833 3.64616 16.9375 3.35449 16.6458C3.06283 16.3542 2.91699 15.9978 2.91699 15.5769V13.2371C2.91699 13.0599 2.97685 12.9114 3.09658 12.7917C3.21616 12.6721 3.36463 12.6123 3.54199 12.6123C3.71935 12.6123 3.86783 12.6721 3.98741 12.7917C4.10713 12.9114 4.16699 13.0599 4.16699 13.2371V15.5769C4.16699 15.641 4.19373 15.6998 4.2472 15.7531C4.30053 15.8066 4.35928 15.8333 4.42345 15.8333H15.5772C15.6414 15.8333 15.7001 15.8066 15.7535 15.7531C15.8069 15.6998 15.8337 15.641 15.8337 15.5769V4.42311C15.8337 4.35895 15.8069 4.3002 15.7535 4.24686C15.7001 4.19339 15.6414 4.16666 15.5772 4.16666H4.42345C4.35928 4.16666 4.30053 4.19339 4.2472 4.24686C4.19373 4.3002 4.16699 4.35895 4.16699 4.42311V6.76291C4.16699 6.94013 4.10713 7.0886 3.98741 7.20832C3.86783 7.32791 3.71935 7.3877 3.54199 7.3877C3.36463 7.3877 3.21616 7.32791 3.09658 7.20832C2.97685 7.0886 2.91699 6.94013 2.91699 6.76291V4.42311C2.91699 4.00214 3.06283 3.64582 3.35449 3.35416C3.64616 3.06249 4.00248 2.91666 4.42345 2.91666H15.5772C15.9982 2.91666 16.3545 3.06249 16.6462 3.35416C16.9378 3.64582 17.0837 4.00214 17.0837 4.42311V15.5769C17.0837 15.9978 16.9378 16.3542 16.6462 16.6458C16.3545 16.9375 15.9982 17.0833 15.5772 17.0833H4.42345ZM10.2055 10.625H3.54199C3.36463 10.625 3.21616 10.5651 3.09658 10.4454C2.97685 10.3258 2.91699 10.1774 2.91699 9.99999C2.91699 9.82263 2.97685 9.67416 3.09658 9.55457C3.21616 9.43485 3.36463 9.37499 3.54199 9.37499H10.2055L8.45553 7.62499C8.33151 7.5011 8.27033 7.3561 8.27199 7.18999C8.27366 7.02374 8.33484 6.87603 8.45553 6.74686C8.5847 6.61756 8.73317 6.55075 8.90095 6.54645C9.06873 6.54214 9.21727 6.60464 9.34658 6.73395L12.0853 9.4727C12.1632 9.55075 12.2182 9.63305 12.2503 9.71957C12.2824 9.8061 12.2985 9.89957 12.2985 9.99999C12.2985 10.1004 12.2824 10.1939 12.2503 10.2804C12.2182 10.3669 12.1632 10.4492 12.0853 10.5273L9.34658 13.266C9.22255 13.3899 9.07533 13.4511 8.90491 13.4496C8.73449 13.4479 8.5847 13.3824 8.45553 13.2531C8.33484 13.1239 8.27234 12.9776 8.26803 12.8142C8.26373 12.6507 8.32623 12.5043 8.45553 12.375L10.2055 10.625Z" fill="#4a5568"/>
                            </g>
                        </svg>
                        Log out
                    </button>
                </div>
            )}
        </aside></>
    );
}
