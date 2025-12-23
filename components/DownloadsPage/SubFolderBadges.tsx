'use client';

import { SubFolderBadgesProps } from '@/types/components';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, FolderOpen, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const SubFolderBadges = ({ subFolders, parentFolderId, backLink }: SubFolderBadgesProps) => {
    const params = useParams();
    const currentFolderId = parseInt(params.folderId as string, 10);

    const isRoot = backLink === '/downloads';
    const allLink = isRoot ? `/downloads/${parentFolderId}` : (backLink || `/downloads/${parentFolderId}`);

    return (
        <div className="mb-8 flex flex-col gap-6">
            {backLink && (
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-primary transition-colors group">
                        <Link href={backLink} className="flex items-center gap-1 text-muted-foreground group-hover:text-primary">
                            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            ย้อนกลับ
                        </Link>
                    </Button>
                </div>
            )}

            <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex items-center gap-2 min-w-max">
                    <Link href={allLink} passHref>
                        <div
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border",
                                currentFolderId === parentFolderId
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:bg-accent"
                            )}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            ทั้งหมด
                        </div>
                    </Link>

                    <div className="h-6 w-px bg-border mx-2" />

                    {subFolders.map((folder) => (
                        <Link key={folder.id} href={`/downloads/${folder.id}`} passHref>
                            <div
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border",
                                    currentFolderId === folder.id
                                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                                        : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:bg-accent"
                                )}
                            >
                                <FolderOpen className="h-4 w-4" />
                                {folder.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubFolderBadges;