'use client';

import { useState } from 'react';

export function EmptyState() {
    return (
        <div className="bg-white rounded-2xl p-12 card-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                All Nodes{' '}
                <span className="text-gray-400 font-normal">(0 Items)</span>
            </h2>

            <div className="flex flex-col items-center justify-center py-20">
                {/* Empty state illustration */}
                <div className="relative mb-8">
                    {/* Circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border border-gray-200 rounded-full"></div>
                        <div className="absolute w-32 h-32 border border-gray-200 rounded-full"></div>
                    </div>
                    {/* Blue sphere */}
                    <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-24 h-24 bg-blue-500 bg-opacity-40 rounded-full backdrop-blur-sm"></div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your Node Collection is empty
                </h3>
                <p className="text-sm text-gray-500">
                    You currently don't have any nodes in your collection.
                </p>
            </div>
        </div>
    );
}
