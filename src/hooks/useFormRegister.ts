import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

// Define the type for the form fields state
interface FormFields {
    [key: string]: string | number; // Adjust types based on your needs
}

// Define the return type for the register function
interface RegisterField {
    id: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string | number | undefined; // Adjust based on your needs
}

export const useFormRegister = (
    initialState: FormFields,
    cb: (fields: FormFields) => void = () => {}
) => {
    const [fields, setFields] = useState<FormFields>(initialState);

    useEffectUpdate(() => {
        cb(fields);
    }, [fields]);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = target.name;
        const value = target.type === 'number' ? (+target.value || '') : target.value;
        setFields(prevFields => ({ ...prevFields, [field]: value }));
    };

    const register = (field: string): RegisterField => {
        return {
            id: field,
            name: field,
            onChange: handleChange,
            value: fields[field],
        };
    };

    return [register, setFields] as const; // Use 'as const' to ensure tuple return type
};
