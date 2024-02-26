"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import {
  CadastrarVulneravelFormData,
  cadastrarVulneravelSchema,
} from "@/lib/forms/cadastrar-vulneravel/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  moradiaOptions,
  perdasCatastrofesOptions,
} from "@/lib/forms/cadastrar-vulneravel/options";

import RadioGroup from "@/app/ui/form/uncontrolled/RadioGroup";
import Input from "@/app/ui/form/uncontrolled/Input";
import ComboBox from "@/app/ui/form/uncontrolled/ComboBox";
import MultiSelect from "@/app/ui/form/controlled/MultiSelect";
import Error from "@/app/ui/form/Error";

function CadastrarVulneravel() {
  // TODO: remove later when no need to debug anymore
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CadastrarVulneravelFormData>({
    resolver: yupResolver(cadastrarVulneravelSchema),
  });

  const problemasSaudeFamilia = useWatch({
    control,
    name: "problemas_saude_familia",
    defaultValue: [],
  });

  return (
    <form
      className="form-control gap-y-4 items-center p-1 w-full"
      onSubmit={handleSubmit((data) => {
        setOutput(JSON.stringify(data, null, 2));
      })}
    >
      <Input
        register={register("nome")}
        placeholder="Nome"
        error={errors.nome}
      />

      <Input
        register={register("total_adultos")}
        placeholder="Total de Adultos"
        type="number"
        defaultValue={0}
        error={errors.total_adultos}
      />

      <RadioGroup
        register={register("moradia")}
        enumOptions={moradiaOptions}
        error={errors.moradia}
      />

      <Controller
        name="problemas_saude_familia"
        control={control}
        defaultValue={[] as string[]}
        render={({ field: { value, onChange, onBlur } }) => (
          <MultiSelect value={value} onChange={onChange} onBlur={onBlur} />
        )}
      />
      <Error error={errors.problemas_saude_familia?.root} />

      {problemasSaudeFamilia.length > 0 && (
        <div className="animate-[fade-in_.5s]">
          <Input
            register={register("despesas_saude", { shouldUnregister: true })}
            placeholder="Despesas"
            error={errors.despesas_saude}
          />
        </div>
      )}

      <ComboBox
        register={register("perdas_catastrofes")}
        enumOptions={perdasCatastrofesOptions}
        error={errors.perdas_catastrofes}
      />

      <input className="mt-3 btn btn-primary w-fit" type="submit" />

      <pre className="mt-20 text-lg">{output}</pre>
    </form>
  );
}

export default CadastrarVulneravel;
