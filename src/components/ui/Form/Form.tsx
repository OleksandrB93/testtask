import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "./FormInput";
import styles from "./Form.module.scss";
import Button from "../Button/Button";

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
    .regex(
      /^\+38 \(\d{3}\) \d{3} - \d{2} - \d{2}$/,
      "Phone number must be in format +38 (XXX) XXX - XX - XX"
    ),
  position: z.string().min(1, "Please select a position"),
  photo: z.any().optional(), // Changed from File to any for better compatibility
});

type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const radioOptions = [
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Designer", label: "Designer" },
    { value: "QA", label: "QA" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "Frontend Developer",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your API
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setValue("photo", file);
    }
  };

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, "");

    // If it starts with +38, format it
    if (cleaned.startsWith("+38") && cleaned.length >= 5) {
      const digits = cleaned.slice(3); // Remove +38
      if (digits.length <= 10) {
        // Format as +38 (XXX) XXX - XX - XX
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
          const [, part1, part2, part3, part4] = match;
          let formatted = "+38";
          if (part1) {
            formatted += ` (${part1}`;
            if (part2) {
              formatted += `) ${part2}`;
              if (part3) {
                formatted += ` - ${part3}`;
                if (part4) {
                  formatted += ` - ${part4}`;
                }
              }
            } else {
              formatted += ")";
            }
          }
          return formatted;
        }
      }
    }
    return value;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Working with POST request</h1>

      <FormInput
        label="Your name"
        placeholder="Your name"
        register={register("name")}
        errorText={errors.name?.message}
        hasError={!!errors.name}
      />

      <FormInput
        label="Email"
        placeholder="Email"
        type="email"
        register={register("email")}
        errorText={errors.email?.message}
        hasError={!!errors.email}
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
            value={field.value}
            onChange={(value) => {
              const formatted = formatPhoneNumber(value);
              field.onChange(formatted);
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
        radioValue={watch("position")}
        onRadioChange={(value) => setValue("position", value)}
        errorText={errors.position?.message}
        hasError={!!errors.position}
        register={register("position")}
      />

      <FormInput
        type="upload"
        label="Upload your photo"
        placeholder="Upload your photo"
        onFileSelect={handleFileSelect}
        errorText={errors.photo?.message as string}
        hasError={!!errors.photo}
        register={register("photo")}
      />

      <Button
        variant={isSubmitting || !isValid ? "disabled" : "primary"}
        type="submit"
        disabled={isSubmitting || !isValid}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
