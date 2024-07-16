import { enumEntries } from "@/lib/enums/common";
import { ObjectLiteral } from "typeorm";

interface Props<T extends Record<string, string>> {
  title: string;
  fields: T;
  object: ObjectLiteral;
}

function ItemView<T extends Record<string, string>>({
  title,
  fields,
  object,
}: Props<T>) {
  const entries = enumEntries(fields);

  return (
    <div className="w-full h-full bg-base-200 rounded-box form-control py-16 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="border-l-2 border-l-primary py-4 pl-4 md:pl-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold pb-6">
          {title}
        </h3>
        <ul className="form-control text-sm sm:text-base">
          {entries.map((entry, i) => {
            return (
              <li
                key={i}
                className="flex justify-between border-b-neutral border-b py-2 px-2 md:px-6"
              >
                <span className="font-semibold">{entry.value}</span>
                <span className="text-accent uppercase font-bold">
                  {object[entry.key]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ItemView;
