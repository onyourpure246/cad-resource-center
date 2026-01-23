import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState, useTransition } from 'react';

interface ConfirmationDialogProps {
    trigger: React.ReactNode;
    title: string;
    description: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => Promise<void> | void;
    variant?: "default" | "destructive";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const ConfirmationDialog = ({
    trigger,
    title,
    description,
    confirmLabel = "ยืนยัน",
    cancelLabel = "ยกเลิก",
    onConfirm,
    variant = "default",
    open: controlledOpen,
    onOpenChange: setControlledOpen,
}: ConfirmationDialogProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? setControlledOpen! : setUncontrolledOpen;

    const handleConfirm = async () => {
        startTransition(async () => {
            await onConfirm();
            setOpen(false);
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isPending}>
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}
                        className={`cursor-pointer ${variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
                    >
                        {isPending ? 'กำลังดำเนินการ...' : confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
