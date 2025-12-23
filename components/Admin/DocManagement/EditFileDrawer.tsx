'use client';

import React, { useState } from 'react';
import { ReusableDrawer } from './RightSideDrawer';
import EditFileForm from './EditFileForm';
import { EditFileDrawerProps } from '@/types/components';

export const EditFileDrawer = ({ file, trigger, onSuccess }: EditFileDrawerProps) => {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onSuccess();
    };

    return (
        <ReusableDrawer
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            side="right"
            className="sm:max-w-[530px]"
        >
            <EditFileForm
                file={file}
                onSuccess={handleSuccess}
                onCancel={() => setOpen(false)}
            />
        </ReusableDrawer>
    );
};
