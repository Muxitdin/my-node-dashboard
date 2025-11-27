'use client';

import { useEffect, useState } from 'react';
import { StatsCards } from './StatsCards';
import { NodesGrid } from './NodesGrid';
import { EmptyState } from './EmptyState';
import {
    calculateTotalPoints,
    calculatePointsPerDay,
    POINTS_PER_NODE_PER_DAY,
} from '@/lib/points';

interface DashboardProps {
    walletAddress: string;
}

interface InvestorData {
    walletAddress: string;
    nodes: number;
    startedAt: string;
}

export function Dashboard({ walletAddress }: DashboardProps) {
    const [investorData, setInvestorData] = useState<InvestorData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPoints, setCurrentPoints] = useState(0);

    useEffect(() => {
        if (!walletAddress) return;
        fetchInvestorData();
    }, [walletAddress]);

    useEffect(() => {
        if (!investorData) return;

        const started = new Date(investorData.startedAt).getTime();
        let frameId: number;

        // initial points calculation
        setCurrentPoints(
            calculateTotalPoints(investorData.nodes, investorData.startedAt),
        );

        const tick = () => {
            const now = Date.now();
            const timeInDays = (now - started) / (1000 * 60 * 60 * 24);
            setCurrentPoints(
                investorData.nodes * POINTS_PER_NODE_PER_DAY * timeInDays,
            );
            frameId = requestAnimationFrame(tick);
        }
        tick()

        return () => cancelAnimationFrame(frameId);
    }, [investorData]);

    const fetchInvestorData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `/api/investor?walletAddress=${walletAddress}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch investor data');
            }

            const data = await response.json();
            setInvestorData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <p className="text-red-600 mb-2">Error: {error}</p>
                <button
                    onClick={fetchInvestorData}
                    className=" inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 cursor-pointer transition"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!investorData) {
        return null;
    }

    const pointsPerDay = calculatePointsPerDay(investorData.nodes);

    return (
        <div className=" space-y-6 sm:space-y-8 animate-fadeIn">
            <StatsCards
                totalNodes={investorData.nodes}
                totalPoints={currentPoints}
                pointsPerDay={pointsPerDay}
            />

            {investorData.nodes === 0 ? (
                <EmptyState />
            ) : (
                <NodesGrid nodes={investorData.nodes} />
            )}
        </div>
    );
}
