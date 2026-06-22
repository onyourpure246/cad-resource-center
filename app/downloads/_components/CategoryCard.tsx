import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CategoryCardProps } from '@/types/components'
import { ArrowRight } from 'lucide-react'
import MuiIconRenderer from '@/components/ui/MuiIconRenderer'

const CategoryCard = ({ title, description, href, icon, mui_icon, mui_colour }: CategoryCardProps) => {
    return (
        <Link href={href} className="block group">
            <Card className="border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/40 bg-card hover:bg-primary/5 overflow-hidden relative">
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-primary" />
                </div>
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shrink-0'>
                        {mui_icon ? (
                            <MuiIconRenderer iconName={mui_icon} iconColor={mui_colour} className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                        ) : (
                            React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, { size: 24, className: "transition-transform duration-300 group-hover:scale-110" })
                        )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                        <CardTitle className='text-[15px] font-semibold tracking-tight group-hover:text-primary transition-colors truncate pr-6'>{title}</CardTitle>
                        <CardDescription className="text-[12px] leading-relaxed line-clamp-1 pr-2">{description}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default CategoryCard