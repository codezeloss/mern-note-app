import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  RegisterOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const TextInput = ({
  name,
  label,
  type,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps) => {
  const inputStyles = `px-4 py-2 w-full border-[1px] rounded-md outline-none`;

  return (
    <div>
      <label>{label}</label>
      <input
        className={`${inputStyles} ${
          error?.message
            ? "border-red-600 placeholder:text-red-600"
            : "border-slate-500/20"
        }`}
        type={type}
        placeholder={name}
        {...register(name, registerOptions)}
      />
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </div>
  );
};

export default TextInput;
