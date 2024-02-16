import { z } from "zod";

interface Expected {
  key: string;
  value: string;
}

export default function RadioGroup({
  register,
  enumName,
  schema,
}: {
  register: Function;
  enumName: string;
  schema: z.AnyZodObject;
}) {
  let rawEnum = schema.shape[enumName].enum;
  let enumOptions = Object.entries(rawEnum).map(
    ([key, value]) => ({ key, value }) as Expected,
  );

  return (
    <div className="form-control gap-x-2">
      {enumOptions.map((option: Expected) => (
        <label className="label">
          <span className="label-text pr-2">{option.key}</span>
          <input
            type="radio"
            {...register(enumName)}
            className="radio"
            value={option.value}
          />
        </label>
      ))}
    </div>
  );
}
