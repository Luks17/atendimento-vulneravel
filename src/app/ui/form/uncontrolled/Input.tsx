import { FieldError } from "react-hook-form";

export default function Input({
  register,
  name,
  placeholder,
  type = "text",
  error = undefined,
}: {
  register: Function;
  name: string;
  placeholder: string;
  type?: string;
  error?: FieldError;
}) {
  return (
    <div className="w-full form-control items-center">
      <input
        className={`input w-full max-w-md ${error ? "input-error" : "input-bordered"}`}
        {...register(name)}
        placeholder={placeholder}
        type={type}
      />
      {error && <span className="text-error text-sm p-1">{error.message}</span>}
    </div>
  );
}
