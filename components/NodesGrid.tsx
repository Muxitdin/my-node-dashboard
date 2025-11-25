'use client';

interface NodesGridProps {
    nodes: number;
}
import Image from 'next/image'
import NodeImage from '@/public/NodeImage.png'



export function NodesGrid({ nodes }: NodesGridProps) {
    // Generate random IDs for nodes
    const nodesList = Array.from({ length: nodes }, (_, i) => ({
        id: `#${(i + 1).toString().padStart(6, '0')}`,
        name: 'Node V7.83',
    }));

    return (
        <div className="bg-white rounded-2xl p-8 card-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                All Nodes{' '}
                <span className="text-gray-400 font-normal">
                    ({nodes} Items)
                </span>
            </h2>

            <div className="grid grid-cols-4 gap-6">
                {nodesList.map((node, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 node-card-shadow hover:shadow-xl transition-shadow cursor-pointer group"
                    >
                        {/* Node Image Container */}
                        <div className="bg-white rounded-xl p-6 mb-4 flex items-center justify-center aspect-square">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* 3D Node representation */}
                                <Image src={NodeImage} alt={"Node Image"} />
                            </div>
                        </div>

                        {/* Node Info */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                {node.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                                ID {node.id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
