'use client';

interface NodesGridProps {
    nodes: number;
}
import Image from 'next/image';
import NodeImage from '@/public/NodeImage.png';

export function NodesGrid({ nodes }: NodesGridProps) {
    // Generate random IDs for nodes
    const nodesList = Array.from({ length: nodes }, (_, i) => ({
        id: `#${(i + 1).toString().padStart(6, '0')}`,
        name: 'Node V7.83',
    }));
    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 card-shadow w-full">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                All Nodes{' '}
                <span className="text-gray-400 font-normal text-sm">
                    ({nodes} Items)
                </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {nodesList.map((node, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-5 node-card-shadow hover:shadow-xl transition-shadow cursor-pointer group"
                    >
                        {/* Node Image Container */}
                        <div className="bg-white rounded-xl mb-3 sm:mb-4 flex items-center justify-center aspect-square overflow-hidden">
                            <div className="flex items-center justify-center w-full h-full">
                                {/* 3D Node representation */}
                                <Image
                                    src={NodeImage}
                                    alt="Node Image"
                                    loading="eager"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        {/* Node Info */}
                        <div className="px-1">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                                {node.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                                ID {node.id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
