import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Error from "../Error";

export default function Input({
  register,
  label,
  type = "text",
  defaultValue = undefined,
  required = true,
  size = 30,
  error = undefined,
}: {
  register: UseFormRegisterReturn;
  label: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  size?: number;
  error?: FieldError;
}) {
  return (
    <div className="form-control w-full items-center">
      <label className="form-control w-fit">
        <span>{label + (required ? "*" : "")}</span>
        <input
          className={`input mt-1 w-full max-w-md ${error ? "input-error" : "input-bordered"}`}
          {...register}
          defaultValue={defaultValue}
          placeholder={label}
          size={size}
          type={type}
        />
      </label>

      <Error error={error} />
    </div>
  );
}
