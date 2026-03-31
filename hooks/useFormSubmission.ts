import { useActionState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { State } from '@/types/common';

export function useFormSubmission(
    action: (state: State, payload: FormData) => Promise<State>,
    initialState: State,
    onSuccess?: () => void
) {
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state.message && state.message.includes('SESSION_EXPIRED')) {
            // Initiate a client-side logout when a Server Action detects a 401/403 error.
            signOut({ redirectTo: '/login?expired=true' });
            return;
        }

        if (state.success && onSuccess) {
            onSuccess();
        }
    }, [state.message, state.success, onSuccess]);

    return { state, formAction };
}
