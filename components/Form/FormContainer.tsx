import React from 'react'
import { toast } from "sonner"
import { useEffect } from 'react'
import { FormContainerProps } from '@/types/common'

const FormContainer = ({ action, state, children }: FormContainerProps) => {
  useEffect(() => {
    if (state?.message && state.message !== '') {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state])
  return (
    <form action={action}>
      {children}
    </form>
  )
}

export default FormContainer