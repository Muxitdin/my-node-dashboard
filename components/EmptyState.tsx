'use client';

import { useState } from 'react';
import Image from 'next/image';
import EmptyCollectionEllipse from "@/public/EmptyCollectionEllipse.png"
import EmptyCollectionImage from "@/public/EmptyCollectionImage.png"

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
                    <Image src={EmptyCollectionEllipse} alt="Empty Collection Ellipse" className={"absolute left-0"} />
                    <Image src={EmptyCollectionImage} alt="Empty Collection Image" className={"max-w-[208px] max-h-[208px]"}/>
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
