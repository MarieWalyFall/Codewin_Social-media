import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

// Define the type for the form fields state
interface FormFields {
    [key: string]: string | number; // Adjust types based on your needs
}

export const useForm = (initialState: FormFields, cb: (fields: FormFields) => void = () => {}) => {
    const [fields, setFields] = useState<FormFields>(initialState);

    useEffectUpdate(() => {
        cb(fields);
    }, [fields]);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = target.name;
        const value = target.type === 'number' ? (+target.value || '') : target.value;
        setFields(prevFields => ({ ...prevFields, [field]: value }));
    };

    return [fields, handleChange, setFields] as const; // Use 'as const' to ensure tuple return type
};
