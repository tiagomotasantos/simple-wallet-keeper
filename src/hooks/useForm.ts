import { FormEvent, useCallback, useState } from "react";

interface UseFormReturn<T> {
  formData: T;
  error: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  setError: (error: string) => void;
}

const useForm = <T>(defaultState: T): UseFormReturn<T> => {
  const [formData, setFormData] = useState(defaultState);
  const [error, setError] = useState("");
  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setFormData]
  );

  return { formData, error, onChange, setError };
};

export default useForm;
