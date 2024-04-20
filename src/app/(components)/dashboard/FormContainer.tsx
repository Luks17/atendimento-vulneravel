import React from "react";

interface Props {
  children: React.ReactNode;
  currentSection: number;
  sections: readonly { label: string }[];
}

function FormContainer({ children, currentSection, sections }: Props) {
  return (
    <div className="w-full bg-base-200 rounded-box form-control lg:grid lg:grid-cols-4">
      <ul
        className="steps lg:steps-vertical border-8 border-base-200 bg-secondary max-lg:rounded-t-2xl 
        lg:rounded-l-2xl px-10 py-16 text-sm sm:text-lg lg:col-span-1"
      >
        {sections.map((section, i) => (
          <li
            key={i}
            className={`step text-secondary-content ${currentSection >= i && "step-accent"}`}
          >
            {section.label}
          </li>
        ))}
      </ul>
      <div className="lg:col-span-3">{children}</div>
    </div>
  );
}

export default FormContainer;
