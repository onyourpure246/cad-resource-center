'use client';
import React from 'react';
import { Input } from "@/components/ui/input";
import { DataManagementLayoutProps } from '@/types/components';

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
    footer,
    showBorder = true, // Default to true to maintain existing behavior

    actionButtonsAlignment = 'right' // Default to right
}: DataManagementLayoutProps) => {
    return (
        <div className="py-0 px-4 sm:py-2 sm:px-6 lg:py-2 lg:px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 min-h-[40px]">
                {/* Left Side: Breadcrumbs & Search */}
                <div className="flex flex-1 items-center gap-4 overflow-hidden w-full">
                    {actionButtonsAlignment === 'left' && (
                        <div className="flex gap-2 shrink-0">
                            {actionButtons}
                        </div>
                    )}
                    {showBreadcrumbs && (
                        <div className="flex items-center text-sm text-muted-foreground overflow-x-auto whitespace-nowrap no-scrollbar">
                            <Link href="/admin/documents" className="flex items-center hover:text-foreground transition-colors shrink-0">
                                <Home className="h-4 w-4 mr-1" />
                                <span className={breadcrumbs.length > 0 ? "hidden sm:inline" : ""}>เอกสารทั้งหมด</span>
                            </Link>
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.id} className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="font-medium text-foreground truncate max-w-[150px]">{crumb.name}</span>
                                    ) : (
                                        <Link href={`/admin/documents/${crumb.id}`} className="hover:text-foreground transition-colors truncate max-w-[120px]">
                                            {crumb.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {showSearch && (
                        <div className="w-full sm:w-auto relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={searchPlaceholder}
                                className="w-full sm:w-[200px] lg:w-[300px] pl-10 h-9 bg-background border-muted-foreground/40 focus-visible:ring-primary/50 transition-all hover:border-primary/60"
                                onChange={(e) => onSearchChange?.(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Right Side: Actions */}
                {actionButtonsAlignment !== 'left' && (
                    <div className="flex gap-2 ml-auto shrink-0">
                        {actionButtons}
                    </div>
                )}
            </div>


            <div className={showBorder ? "border rounded-lg" : ""}>
                {children}
            </div>
            {footer && <div className="mt-1">{footer}</div>}
        </div>
    );
};

export default DataManagementLayout;
