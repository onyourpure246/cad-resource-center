import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ActionItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

interface ActionsCellProps {
    onEdit?: () => void;
    onDelete?: () => void;
    editLabel?: string;
    deleteLabel?: string;
    additionalActions?: ActionItem[];
    className?: string;
    align?: "start" | "end" | "center";
}

const ActionsCell = ({
    onEdit,
    onDelete,
    editLabel = "แก้ไข",
    deleteLabel = "ลบ",
    additionalActions = [],
    className,
    align = "end"
}: ActionsCellProps) => {
    return (
        <div className={cn("flex justify-end", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer hover:bg-muted">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={align} className="min-w-[140px]">
                    {onEdit && (
                        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                            <Edit className="mr-2 h-4 w-4" /> {editLabel}
                        </DropdownMenuItem>
                    )}

                    {additionalActions.map((action, index) => (
                        <DropdownMenuItem
                            key={index}
                            className={cn("cursor-pointer", action.className)}
                            onClick={action.onClick}
                            disabled={action.disabled}
                        >
                            {action.icon}
                            {action.label}
                        </DropdownMenuItem>
                    ))}

                    {(onEdit || additionalActions.length > 0) && onDelete && (
                        <div className="h-px bg-muted my-1" />
                    )}

                    {onDelete && (
                        <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={onDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> {deleteLabel}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ActionsCell;
