import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CategoryCardProps } from '@/types/documents'

const CategoryCard = ({ title, description, href, icon }: CategoryCardProps) => {
    return (
        <Link href={href} className="block h-full">
            <Card className="h-full transition-all duration-150 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:border-primary hover:bg-accent hover:text-accent-foreground text-left">
                <CardHeader className="flex flex-row items-start gap-4">
                    <div className='p-3 rounded-full shrink-0'>
                        {icon}
                    </div>
                    <div>
                        <CardTitle className='text-2xl'>{title}</CardTitle>
                        <CardDescription className="mt-1">{description}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default CategoryCard