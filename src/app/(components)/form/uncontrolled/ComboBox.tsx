import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Option } from "@/lib/ui/forms/common";

import Error from "../Error";

export default function ComboBox({
  register,
  enumOptions,
  defaultValue,
  label,
  required = true,
  error,
}: {
  register: UseFormRegisterReturn;
  enumOptions: Option[];
  defaultValue?: string;
  label: string;
  required?: boolean;
  error?: FieldError;
}) {
  return (
    <div className="form-control">
      <span>{label + (required ? "*" : "")}</span>
      <select
        {...register}
        className="select select-bordered w-full max-w-xs"
        defaultValue={defaultValue}
      >
        {enumOptions.map((item, i) => (
          <option key={i} value={item.value}>
            {item.key}
          </option>
        ))}
      </select>

      <Error error={error} />
    </div>
  );
}
