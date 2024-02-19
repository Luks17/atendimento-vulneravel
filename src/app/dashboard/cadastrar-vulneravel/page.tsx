"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  CadastrarVulneravelFormData,
  cadastrarVulneravelSchema,
} from "@/lib/forms/cadastrarVulneravel";
import { zodResolver } from "@hookform/resolvers/zod";
import RadioGroup from "@/app/ui/form/uncontrolled/RadioGroup";
import Input from "@/app/ui/form/uncontrolled/Input";
import ComboBox from "@/app/ui/form/uncontrolled/ComboBox";
import MultiSelect from "@/app/ui/form/controlled/MultiSelect";

function CadastrarVulneravel() {
  // TODO: remove later when no need to debug anymore
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CadastrarVulneravelFormData>({
    resolver: zodResolver(cadastrarVulneravelSchema),
  });

  return (
    <form
      className="form-control gap-y-4 items-center p-1 w-full"
      onSubmit={handleSubmit((data) => {
        setOutput(JSON.stringify(data, null, 2));
      })}
    >
      <Input
        register={register}
        name="nome"
        placeholder="Nome"
        error={errors.nome}
      />

      <Input
        register={register}
        name="total_adultos"
        placeholder="Total de Adultos"
        type="number"
        error={errors.total_adultos}
      />

      <RadioGroup
        register={register}
        enumName="moradia"
        schema={cadastrarVulneravelSchema}
        error={errors.moradia}
      />

      <ComboBox
        register={register}
        enumName="perdas_catastrofes"
        schema={cadastrarVulneravelSchema}
        error={errors.perdas_catastrofes}
      />

      <Controller
        name="problemas_saude_familia"
        control={control}
        defaultValue={[] as string[]}
        render={({ field: { value, onChange, onBlur } }) => (
          <MultiSelect value={value} onChange={onChange} onBlur={onBlur} />
        )}
      />

      <input className="mt-3 btn btn-primary w-fit" type="submit" />

      <pre className="mt-20 text-lg">{output}</pre>
    </form>
  );
}

export default CadastrarVulneravel;
