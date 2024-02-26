import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Error from "../Error";
import { Option } from "@/lib/forms/common";

export default function ComboBox({
  register,
  enumOptions,
  defaultValue,
  error,
}: {
  register: UseFormRegisterReturn;
  enumOptions: Option[];
  defaultValue?: string;
  error?: FieldError;
}) {
  return (
    <div>
      <select
        {...register}
        className="select select-bordered w-full max-w-xs"
        defaultValue={defaultValue}
      >
        {enumOptions.map((item, i) => (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <Error error={error} />
    </div>
  );
}
