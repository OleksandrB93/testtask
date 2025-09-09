import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import styles from "./Form.module.scss";
import Button from "../Button/Button";
import { usePositions, useRegisterUser } from "../../../hooks/useUsers";
import type { RegistrationRequest } from "../../../api/types";
import SuccessReg from "../SuccessReg/SuccessReg";
import Spinner from "../Spinner/Spinner";

// Zod validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be less than 60 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+380\d{9}$/, "Phone number must be in format +380XXXXXXXXX"),
  position_id: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val != null, "Please select a position"),
  photo: z
    .any()
    .refine((file) => file instanceof File, "Please upload a photo")
    .refine(
      (file) => file instanceof File && file.type === "image/jpeg",
      "The photo must be jpeg/jpg type"
    ),
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  position_id: string | number;
  photo: File;
};

const Form = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    data: positionsData,
    isLoading: positionsLoading,
    error: positionsError,
  } = usePositions();
  const registerUserMutation = useRegisterUser();

  // Transform positions data for radio options
  const radioOptions =
    positionsData?.positions?.map((position) => ({
      value: position.id.toString(),
      label: position.name,
    })) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position_id: "",
    },
  });

  // Set default position when positions are loaded
  useEffect(() => {
    if (
      positionsData?.positions &&
      positionsData.positions.length > 0 &&
      !watch("position_id")
    ) {
      setValue("position_id", positionsData.positions[0].id);
    }
  }, [positionsData, setValue, watch]);

  const onSubmit = async (data: FormData) => {
    if (!data.photo) {
      console.error("Photo is required");
      return;
    }

    const registrationData: RegistrationRequest = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      position_id: data.position_id.toString(),
      photo: data.photo,
    };

    try {
      await registerUserMutation.mutateAsync(registrationData);
      setIsSuccess(true);
      reset(); // Reset form after successful submission

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("userRegistered"));
    } catch (error) {
      console.error("Registration failed:", error);
      // Error handling is done by the mutation
    }
  };

  const handleFileSelect = (file: File | null) => {
    console.log("File selected:", file);
  };

  // Phone number formatting function for display
  const formatPhoneNumberForDisplay = (value: string) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, "");

    // If it starts with +38, format it
    if (cleaned.startsWith("+38")) {
      const digits = cleaned.slice(3); // Remove +38
      if (digits.length <= 10) {
        // Format as +38 (XXX) XXX - XX - XX
        let formatted = "+38";

        if (digits.length > 0) {
          formatted += ` (${digits.slice(0, 3)}`;
          if (digits.length > 3) {
            formatted += `) ${digits.slice(3, 6)}`;
            if (digits.length > 6) {
              formatted += ` - ${digits.slice(6, 8)}`;
              if (digits.length > 8) {
                formatted += ` - ${digits.slice(8, 10)}`;
              }
            }
          } else {
            formatted += ")";
          }
        }
        return formatted;
      }
    }

    // If it doesn't start with +38, try to add it
    if (cleaned.length > 0 && !cleaned.startsWith("+")) {
      const digits = cleaned.replace(/[^\d]/g, "");
      if (digits.length <= 10) {
        return formatPhoneNumberForDisplay("+38" + digits);
      }
    }

    return value;
  };

  // Phone number cleaning function for storage
  const cleanPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, "");

    // If it doesn't start with +38, try to add it
    if (cleaned.length > 0 && !cleaned.startsWith("+")) {
      const digits = cleaned.replace(/[^\d]/g, "");
      if (digits.length <= 10) {
        return "+38" + digits;
      }
    }

    return cleaned;
  };

  if (isSuccess) {
    return <SuccessReg onBackToForm={() => setIsSuccess(false)} />;
  }
  if (positionsLoading) {
    return <Spinner size="medium" color="primary" />;
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Working with POST request</h2>

        <div className={styles.formInput}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Your name"
                placeholder="Your name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                errorText={errors.name?.message}
                hasError={!!errors.name}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Email"
                placeholder="Email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                errorText={errors.email?.message}
                hasError={!!errors.email}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Phone"
                placeholder="Phone"
                helperText="+38 (XXX) XXX - XX - XX"
                type="tel"
                value={
                  field.value ? formatPhoneNumberForDisplay(field.value) : ""
                }
                onChange={(value) => {
                  const cleaned = cleanPhoneNumber(value);
                  field.onChange(cleaned);
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                errorText={errors.phone?.message}
                hasError={!!errors.phone}
              />
            )}
          />

          <FormInput
            type="radio"
            label="Select your position"
            radioOptions={radioOptions}
            radioValue={watch("position_id")?.toString()}
            onRadioChange={(value) => setValue("position_id", value)}
            errorText={errors.position_id?.message}
            hasError={!!errors.position_id}
            register={register("position_id")}
            isLoading={positionsLoading}
          />

          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <FormInput
                type="upload"
                label="Upload your photo"
                placeholder="Upload your photo"
                onFileSelect={(file) => {
                  field.onChange(file);
                  handleFileSelect(file);
                }}
                errorText={errors.photo?.message as string}
                hasError={!!errors.photo}
                accept="image/jpeg,image/jpg"
              />
            )}
          />

          <Button
            variant={
              isSubmitting ||
              !isValid ||
              registerUserMutation.isPending ||
              positionsLoading
                ? "disabled"
                : "primary"
            }
            type="submit"
            disabled={
              isSubmitting ||
              !isValid ||
              registerUserMutation.isPending ||
              positionsLoading
            }
          >
            {registerUserMutation.isPending ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Spinner size="small" color="white" />
                Submitting...
              </div>
            ) : positionsLoading ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Spinner size="small" color="white" />
                Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        {registerUserMutation.isError && (
          <div className={styles.error}>
            <p>Registration failed. Please try again.</p>
          </div>
        )}

        {positionsError && (
          <div className={styles.error}>
            <p>Failed to load positions. Please refresh the page.</p>
          </div>
        )}
      </form>

      {/* Overlay with spinner during registration */}
      {registerUserMutation.isPending && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <Spinner size="large" color="primary" />
            <p>Registering user...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
