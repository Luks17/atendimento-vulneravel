import { FieldError } from "react-hook-form";
import { z } from "zod";

interface Expected {
  key: string;
  value: string;
}

export default function ComboBox({
  register,
  enumName,
  schema,
  defaultValue,
  error,
}: {
  register: Function;
  enumName: string;
  schema: z.AnyZodObject;
  defaultValue?: string;
  error?: FieldError;
}) {
  let rawEnum = schema.shape[enumName].enum;
  let enumOptions = Object.entries(rawEnum).map(
    ([key, value]) => ({ key, value }) as Expected,
  );

  return (
    <div>
      <select
        {...register(enumName)}
        className="select select-bordered w-full max-w-xs"
        defaultValue={defaultValue}
      >
        {enumOptions.map((item, i) => (
          <option key={i} value={item.value}>
            {item.key}
          </option>
        ))}
      </select>

      {error && <span className="text-error text-sm p-1">{error.message}</span>}
    </div>
  );
}
