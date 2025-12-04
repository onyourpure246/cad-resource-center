import React from 'react';
import { Input } from "@/components/ui/input";
import { DataManagementLayoutProps } from '@/types/documents';

import Link from 'next/link';
import { ChevronRight, Home, Search } from 'lucide-react';

const DataManagementLayout = ({
    searchPlaceholder,
    actionButtons,
    children,
    breadcrumbs = [],
    showBreadcrumbs = true,
    showSearch = true,
    onSearchChange,
    footer
}: DataManagementLayoutProps) => {
    return (
        <div className="py-2 px-4 sm:py-4 sm:px-6 lg:py-4 lg:px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex gap-2">
                    {actionButtons}
                </div>
                {showSearch && (
                    <div className="w-full sm:w-auto relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={searchPlaceholder}
                            className="w-full sm:w-[300px] pl-10 h-10 bg-background border-muted-foreground/40 focus-visible:ring-primary/50 transition-all hover:border-primary/60"
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                    </div>
                )}
            </div>
            {/* Breadcrumbs */}
            {showBreadcrumbs && (
                <div className="flex items-center text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap">
                    <Link href="/admin/documents" className="flex items-center hover:text-foreground transition-colors">
                        <Home className="h-4 w-4 mr-1" />
                        เอกสารทั้งหมด
                    </Link>
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.id} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-1" />
                            {index === breadcrumbs.length - 1 ? (
                                <span className="font-medium text-foreground">{crumb.name}</span>
                            ) : (
                                <Link href={`/admin/documents/${crumb.id}`} className="hover:text-foreground transition-colors">
                                    {crumb.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}


            <div className="border rounded-lg">
                {children}
            </div>
            {footer && <div className="mt-1">{footer}</div>}
        </div>
    );
};

export default DataManagementLayout;
