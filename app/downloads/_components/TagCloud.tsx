'use client';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { getPopularTags } from '@/actions/search-actions';

const TagCloud = ({ tags: initialTags = [] }: { tags?: string[] }) => {
    const router = useRouter();
    const [tags, setTags] = useState<string[]>(initialTags);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const popularTags = await getPopularTags(30, 8); // Last 30 days, top 8 tags
                if (popularTags && popularTags.length > 0) {
                    setTags(popularTags.map((t: { keyword: string }) => t.keyword));
                }
            } catch (error) {
                console.error('Failed to fetch popular tags:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const handleTagClick = (tag: string) => {
        router.push(`/downloads/search?q=${encodeURIComponent(tag)}`);
    };

    if (loading && tags.length === 0) {
        return <div className="mt-8 h-8 animate-pulse bg-muted/20 rounded-lg w-64 mx-auto" />;
    }

    if (tags.length === 0) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
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
