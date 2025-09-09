import React, { useState, memo, useCallback } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  helperText?: string;
  errorText?: string;
  value?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  placeholder?: string;
  type?: "text" | "radio" | "upload" | "email" | "tel";
  radioOptions?: RadioOption[];
  radioValue?: string;
  onRadioChange?: (value: string) => void;
  uploadButtonText?: string;
  onFileSelect?: (file: File | null) => void;
  accept?: string;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

interface RadioOption {
  value: string;
  label: string;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  errorText,
  value = "",
  onChange,
  hasError = false,
  placeholder,
  type = "text",
  radioOptions = [],
  radioValue = "",
  onRadioChange,
  uploadButtonText = "Upload",
  onFileSelect,
  accept = "image/*",
  name,
  ref,
  onBlur,
  isLoading = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Sync inputValue with external value prop
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Also call the native onBlur if it exists (for react-hook-form)
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onRadioChange?.(newValue);
    },
    [onRadioChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("File input changed, files:", e.target.files);
      const file = e.target.files?.[0] || null;
      console.log("Selected file:", file);
      onFileSelect?.(file);
      if (file) {
        setInputValue(file.name);
        onChange?.(file.name);
      }
    },
    [onFileSelect, onChange]
  );

  const handleUploadClick = useCallback(() => {
    console.log(
      "Upload button clicked, looking for input with id:",
      `file-input-${label}`
    );
    const fileInput = document.getElementById(
      `file-input-${label}`
    ) as HTMLInputElement;
    console.log("Found file input:", fileInput);
    fileInput?.click();
  }, [label]);

  const isFloating = isFocused || inputValue.length > 0;
  const showError = hasError && errorText;

  if (type === "radio") {
    return (
      <div className={styles.inputContainer}>
        <div className={styles.radioGroup}>
          <div className={styles.radioLabel}>{label}</div>
          {isLoading ? (
            <div className={styles.loading}>Loading positions...</div>
          ) : (
            radioOptions.map((option) => (
              <label key={option.value} className={styles.radioOption}>
                <input
                  type="radio"
                  name={name || label}
                  value={option.value}
                  checked={radioValue === option.value}
                  onChange={handleRadioChange}
                  className={styles.radioInput}
                  {...rest}
                />
                <span className={styles.radioLabelText}>{option.label}</span>
              </label>
            ))
          )}
        </div>
        {showError ? (
          <span className={styles.errorText}>{errorText}</span>
        ) : (
          helperText && <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  }

  if (type === "upload") {
    return (
      <div className={styles.inputContainer}>
        <div className={styles.uploadWrapper}>
          <div
            className={`${styles.uploadContainer} ${
              showError ? styles.error : ""
            }`}
          >
            <button
              type="button"
              onClick={handleUploadClick}
              className={`${styles.uploadButton} ${
                showError ? styles.errorButton : ""
              }`}
            >
              {uploadButtonText}
            </button>
            <div className={styles.uploadInputWrapper}>
              <input
                ref={ref}
                type={type}
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={styles.uploadInput}
                readOnly
                name={name}
                {...rest}
              />
              <input
                id={`file-input-${label}`}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className={styles.hiddenFileInput}
              />
            </div>
          </div>
        </div>
        {showError ? (
          <span className={styles.errorText}>{errorText}</span>
        ) : (
          helperText && <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.inputContainer}>
      <div
        className={`${styles.inputWrapper} ${showError ? styles.error : ""}`}
      >
        <input
          ref={ref}
          type={type}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={styles.input}
          name={name}
          {...rest}
        />
        <label
          className={`${styles.label} ${isFloating ? styles.floating : ""} ${
            showError ? styles.errorLabel : ""
          }`}
        >
          {label}
        </label>
      </div>
      {showError ? (
        <span className={styles.errorText}>{errorText}</span>
      ) : (
        helperText && <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default memo(Input);
