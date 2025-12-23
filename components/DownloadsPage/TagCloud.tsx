'use client';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

import { TagCloudProps } from '@/types/components';

const TagCloud = ({ tags }: TagCloudProps) => {
    const router = useRouter();

    const handleTagClick = (tag: string) => {
        router.push(`/downloads/search?q=${encodeURIComponent(tag)}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
            <span className="text-sm text-muted-foreground self-center mr-2">คำค้นยอดนิยม:</span>
            {tags.map((tag, index) => (
                <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1 text-sm font-normal"
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </Badge>
            ))}
        </div>
    );
};

export default TagCloud;
