import { FieldError } from "react-hook-form";
import Error from "../Error";

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

      <Error error={error} />
    </div>
  );
}
