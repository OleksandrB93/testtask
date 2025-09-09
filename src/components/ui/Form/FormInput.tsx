import React from "react";
import Input from "../Input/Input";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "radio" | "upload" | "email" | "tel";
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
  radioOptions?: { value: string; label: string }[];
  radioValue?: string;
  onRadioChange?: (value: string) => void;
  onFileSelect?: (file: File | null) => void;
  onChange?: (value: string) => void;
  value?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  isLoading?: boolean;
  accept?: string;
  register?: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    ref: React.Ref<HTMLInputElement>;
  };
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  helperText,
  errorText,
  hasError,
  radioOptions,
  radioValue,
  onRadioChange,
  onFileSelect,
  onChange,
  value,
  onBlur,
  name,
  ref,
  isLoading,
  accept,
  register,
}) => {
  if (type === "radio") {
    return (
      <Input
        type="radio"
        label={label}
        radioOptions={radioOptions}
        radioValue={radioValue}
        onRadioChange={onRadioChange}
        errorText={errorText}
        hasError={hasError}
        isLoading={isLoading}
        onBlur={onBlur || register?.onBlur}
        name={name || register?.name}
        ref={ref || register?.ref}
      />
    );
  }

  if (type === "upload") {
    return (
      <Input
        type="upload"
        label={label}
        placeholder={placeholder}
        onFileSelect={onFileSelect}
        errorText={errorText}
        hasError={hasError}
        value={value}
        onChange={onChange}
        onBlur={onBlur || register?.onBlur}
        name={name || register?.name}
        ref={ref || register?.ref}
        accept={accept}
      />
    );
  }

  return (
    <Input
      label={label}
      placeholder={placeholder}
      type={type}
      helperText={helperText}
      errorText={errorText}
      hasError={hasError}
      value={value}
      onChange={onChange}
      onBlur={onBlur || register?.onBlur}
      name={name || register?.name}
      ref={ref || register?.ref}
    />
  );
};

export default FormInput;
