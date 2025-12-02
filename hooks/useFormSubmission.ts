import { useActionState, useEffect } from 'react';
import { State } from '@/types/common';

export function useFormSubmission(
    action: (state: State, payload: FormData) => Promise<State>,
    initialState: State,
    onSuccess?: () => void
) {
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success && onSuccess) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    return { state, formAction };
}
