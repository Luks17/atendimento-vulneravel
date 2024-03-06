import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Error from "../Error";
import { Option } from "@/lib/forms/common";

export default function RadioGroup({
  register,
  enumOptions,
  label,
  required = true,
  error,
}: {
  register: UseFormRegisterReturn;
  enumOptions: Option[];
  label: string;
  required?: boolean;
  error?: FieldError;
}) {
  return (
    <div className="form-control">
      <span className="mb-2">{label + (required ? "*" : "")}</span>
      <div className="form-control gap-x-2 border-l-2 pl-2 border-primary">
        {enumOptions.map((option, i) => (
          <label className="label" key={i}>
            <span className="label-text pr-2">{option.label}</span>
            <input
              type="radio"
              {...register}
              className="radio"
              value={option.value}
            />
          </label>
        ))}

        <Error error={error} />
      </div>
    </div>
  );
}
