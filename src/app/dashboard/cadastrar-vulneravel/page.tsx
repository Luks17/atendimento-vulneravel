"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  CadastrarVulneravelFormData,
  cadastrarVulneravelSchema,
} from "@/lib/forms/cadastrarVulneravel";
import { zodResolver } from "@hookform/resolvers/zod";
import RadioGroup from "@/app/ui/form/RadioGroup";

function CadastrarVulneravel() {
  // TODO: remove later when no need to debug anymore
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
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
      <input
        className={`input w-full max-w-md ${errors.nome ? "input-error" : "input-bordered"}`}
        {...register("nome")}
        placeholder="Nome"
      />

      <input
        className={`input w-full max-w-md ${errors.total_adultos ? "input-error" : "input-bordered"}`}
        type="number"
        {...register("total_adultos")}
        placeholder="Total de Adultos"
      />

      <RadioGroup
        register={register}
        enumName="moradia"
        schema={cadastrarVulneravelSchema}
      />

      {errors.moradia?.message}

      <input className="mt-3 btn btn-primary w-fit" type="submit" />

      <pre className="mt-20 text-lg">{output}</pre>
    </form>
  );
}

export default CadastrarVulneravel;
