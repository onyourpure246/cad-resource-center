import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Announcement } from '@/types/announcement';

interface AnnouncementCardProps {
    announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <Badge variant={announcement.categoryVariant || "default"}>{announcement.category}</Badge>
                    <span className="text-sm text-muted-foreground">{announcement.date}</span>
                </div>
                <CardTitle>{announcement.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                    {announcement.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-3">{announcement.content}</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" className="w-full cursor-pointer">อ่านเพิ่มเติม</Button>
            </CardFooter>
        </Card>
    )
}

export default AnnouncementCard
