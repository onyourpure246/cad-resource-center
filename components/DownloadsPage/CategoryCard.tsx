import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CategoryCardProps } from '@/types/documents'
import { ArrowRight, Folder } from 'lucide-react'
import MuiIconRenderer from '../ui/MuiIconRenderer'

const CategoryCard = ({ title, description, href, icon, mui_icon, mui_colour }: CategoryCardProps & { mui_icon?: string, mui_colour?: string }) => {
    return (
        <Link href={href} className="block h-full group">
            <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 bg-card overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <CardHeader className="flex flex-col items-start gap-4 p-6">
                    <div className='p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300'>
                        {mui_icon ? (
                            <MuiIconRenderer iconName={mui_icon} iconColor={mui_colour} className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                        ) : (
                            React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, { size: 32, className: "transition-transform duration-300 group-hover:scale-110" })
                        )}
                    </div>
                    <div className="space-y-2">
                        <CardTitle className='text-xl font-bold tracking-tight group-hover:text-primary transition-colors'>{title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed line-clamp-2">{description}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default CategoryCard