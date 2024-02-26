import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Error from "../Error";

export default function Input({
  register,
  placeholder,
  type = "text",
  defaultValue = undefined,
  error = undefined,
}: {
  register: UseFormRegisterReturn;
  placeholder: string;
  type?: string;
  defaultValue?: string | number;
  error?: FieldError;
}) {
  return (
    <div className="w-full form-control items-center">
      <input
        className={`input w-full max-w-md ${error ? "input-error" : "input-bordered"}`}
        {...register}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
      />

      <Error error={error} />
    </div>
  );
}
