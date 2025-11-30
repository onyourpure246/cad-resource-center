import React from "react"
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { ReusableDrawerProps } from "@/types/common";

export function ReusableDrawer({
    trigger,
    children,
    side = "right",
    open,
    onOpenChange,
    className
}: ReusableDrawerProps) {
    return (
        <Drawer direction={side} open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent className={className}>
                {children}
            </DrawerContent>
        </Drawer>
    );
}