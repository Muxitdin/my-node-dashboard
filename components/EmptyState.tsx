'use client';

import { useState } from 'react';
import Image from 'next/image';
import EmptyCollectionEllipse from "@/public/EmptyCollectionEllipse.webp"
import EmptyCollectionImage from "@/public/EmptyCollectionImage.webp"

export function EmptyState() {
    return (
        <div className="rounded-2xl ">
            <h2 className="font-spaceGrotesk text-lg sm:text-xl text-gray-900">
                All Nodes{' '}
                <span className="font-lexend leading-[140%]  text-gray-400 font-light text-sm">(0 Items)</span>
            </h2>

            <div className="flex flex-col items-center justify-start py-0">
                {/* Empty state illustration */}
                <div className="relative mb-8">
                    <Image src={EmptyCollectionEllipse} alt="Empty Collection Ellipse" className={"absolute left-0"} />
                    <Image src={EmptyCollectionImage} alt="Empty Collection Image" className={"max-w-[208px] max-h-[208px]"}/>
                </div>

                <h3 className="font-spaceGrotesk text-lg font-semibold text-gray-900 mb-2">
                    Your Node Collection is empty
                </h3>
                <p className="font-spaceGrotesk text-sm text-gray-500">
                    You currently don&#39;t have any nodes in your collection.
                </p>
            </div>
        </div>
    );
}
