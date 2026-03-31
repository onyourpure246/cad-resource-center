'use server';

import { signOut } from '@/auth';
import { revalidatePath } from 'next/cache';

export const logout = async () => {
    console.log('Server Action: Logging out...');
    revalidatePath('/'); // Clear cache before redirect
    await signOut({ redirectTo: '/' });
}
