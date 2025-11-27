'use client';

import { useState } from 'react';
import Image from 'next/image';
import NodeImage from '@/public/NodeImages/NodeImage.webp';
import NodeImage2 from '@/public/NodeImages/NodeImage2.webp';
import NodeImage3 from '@/public/NodeImages/NodeImage3.webp';
import NodeImage4 from '@/public/NodeImages/NodeImage4.webp';
import dotGroup from '@/public/dotGroup.webp';

const nodeImages = [NodeImage, NodeImage2, NodeImage3, NodeImage4];

interface NodesGridProps {
    nodes: number;
}

export function NodesGrid({ nodes }: NodesGridProps) {
    const [nodesWithImages] = useState(() => {
        return Array.from({ length: nodes }, (_, i) => ({
            id: `#${(i + 1).toString().padStart(6, '0')}`,
            name: 'Node V7.83',
            image: nodeImages[Math.floor(Math.random() * nodeImages.length)],
        }));
    });

    return (
        <>
            <h2 className="font-spaceGrotesk text-lg sm:text-xl text-gray-900 mb-4 sm:mb-6">
                All Nodes{' '}
                <span className="font-lexend leading-[140%]  text-gray-400 font-light text-sm">
                    ({nodes} Items)
                </span>
            </h2>
            <div className="rounded-2xl p-0 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {nodesWithImages.map((node, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br bg-white rounded-2xl p-4 sm:p-2 hover:shadow-xl transition-shadow cursor-pointer group"
                            >
                                {/* Node Image Container */}
                                <div className="bg-[#F5F5F5] rounded-xl mb-3 sm:mb-4 flex items-center justify-center aspect-square overflow-hidden">
                                    <div className="relative flex items-center justify-center w-full h-full">
                                        <Image
                                            src={dotGroup}
                                            alt={'dot group'}
                                            loading={'eager'}
                                            className={'absolute h-full w-fit'}
                                        />
                                        <Image
                                            src={node.image}
                                            alt="Node Image"
                                            loading="eager"
                                            className="w-[180px] h-full object-contain"
                                        />
                                    </div>
                                </div>
                                {/* Node Info */}
                                <div className="px-1">
                                    <h3 className="font-lexend text-sm sm:text-base leading-[140%] text-gray-900 mb-1">
                                        {node.name}
                                    </h3>
                                    <p className="mb-2 font-lexend font-light text-xs sm:text-sm text-[#959595]">
                                        ID {node.id}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
