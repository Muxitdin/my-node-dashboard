import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const walletAddress = request.nextUrl.searchParams.get('walletAddress');

        if (!walletAddress) {
            return NextResponse.json(
                { error: 'Wallet address is required' },
                { status: 400 },
            );
        }
        //
        // // Пытаемся найти инвестора
        // let investor = await prisma.investor.findUnique({
        //     where: { walletAddress: walletAddress.toLowerCase() },
        // });
        //
        // // Если не найден - создаем нового
        // if (!investor) {
        //     const randomNodes = Math.floor(Math.random() * 20) + 1; // 1-20 nodes
        //     investor = await prisma.investor.create({
        //         data: {
        //             walletAddress: walletAddress.toLowerCase(),
        //             nodes: randomNodes,
        //             startedAt: new Date(),
        //         },
        //     });
        // }

        const investor = await prisma.investor.upsert({
            where: { walletAddress: walletAddress.toLowerCase() },
            update: {
                // что обновлять, если уже есть
                nodes: { increment: 0 }, // можно оставить без изменений
            },
            create: {
                walletAddress: walletAddress.toLowerCase(),
                nodes: Math.floor(Math.random() * 16) + 5, // случайное число от 5 до 20
                startedAt: new Date(),
            },
        });

        // // upsert вместо findUnique + create
        // const investor = await prisma.investor.upsert({
        //     where: { walletAddress: walletAddress.toLowerCase() },
        //     update: {}, // ничего не меняем
        //     create: {
        //         walletAddress: walletAddress.toLowerCase(),
        //         nodes: Math.floor(Math.random() * 20) + 1,
        //         startedAt: new Date(),
        //     },
        // });

        return NextResponse.json({
            walletAddress: investor.walletAddress,
            nodes: investor.nodes,
            startedAt: investor.startedAt.toISOString(),
        });
    } catch (error: any) {
        console.error('Error fetching investor:', error);
        return NextResponse.json(
            {
                error: error.message,
                stack: error.stack,
            },
            { status: 500 },
        );
    }
}
