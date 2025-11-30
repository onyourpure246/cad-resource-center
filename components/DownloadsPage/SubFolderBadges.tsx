'use client';

import { Folder, SubFolderBadgesProps } from '@/types/documents';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, Folder as FolderIcon } from 'lucide-react';
import { Button } from '../ui/button';

const SubFolderBadges = ({ subFolders, parentFolderId, backLink }: SubFolderBadgesProps) => {
    const params = useParams();
    const currentFolderId = parseInt(params.folderId as string, 10);

    return (
        <div className="mb-2 flex flex-col gap-4">
            {backLink && (
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-primary transition-colors">
                        <Link href={backLink} className="flex items-center gap-1 text-muted-foreground">
                            <ChevronLeft className="h-4 w-4" />
                            ย้อนกลับ
                        </Link>
                    </Button>
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                <Link href={`/downloads/${parentFolderId}`} passHref>
                    <Badge
                        variant={currentFolderId === parentFolderId ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all hover:bg-primary/90 hover:text-primary-foreground ${currentFolderId === parentFolderId ? 'shadow-md' : 'bg-background hover:border-primary'}`}
                    >
                        ทั้งหมด
                    </Badge>
                </Link>
                {subFolders.map((folder) => (
                    <Link key={folder.id} href={`/downloads/${folder.id}`} passHref>
                        <Badge
                            variant={currentFolderId === folder.id ? 'default' : 'outline'}
                            className={`cursor-pointer px-4 py-2 text-sm transition-all hover:bg-primary/90 hover:text-primary-foreground flex items-center gap-2 ${currentFolderId === folder.id ? 'shadow-md' : 'bg-background hover:border-primary'}`}
                        >
                            <FolderIcon className="h-3 w-3" />
                            {folder.name}
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SubFolderBadges;