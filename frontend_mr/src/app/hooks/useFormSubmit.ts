import { useState } from 'react';

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (submitFunction: () => Promise<void>) => {
    setIsSubmitting(true);
    try {
      await submitFunction();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitForm };
};