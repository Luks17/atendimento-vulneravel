import { FieldError } from "react-hook-form";
import { z } from "zod";

interface Expected {
  key: string;
  value: string;
}

export default function RadioGroup({
  register,
  enumName,
  schema,
  error,
}: {
  register: Function;
  enumName: string;
  schema: z.AnyZodObject;
  error?: FieldError;
}) {
  let rawEnum = schema.shape[enumName].enum;
  let enumOptions = Object.entries(rawEnum).map(
    ([key, value]) => ({ key, value }) as Expected,
  );

  return (
    <div className="form-control gap-x-2">
      {enumOptions.map((option: Expected, i) => (
        <label className="label" key={i}>
          <span className="label-text pr-2">{option.key}</span>
          <input
            type="radio"
            {...register(enumName)}
            className="radio"
            value={option.value}
          />
        </label>
      ))}

      {error && <span className="text-error text-sm p-1">{error.message}</span>}
    </div>
  );
}
