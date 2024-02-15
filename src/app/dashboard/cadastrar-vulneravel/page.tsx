"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  CadastrarVulneravelFormData,
  cadastrarVulneravelSchema,
} from "@/lib/forms/cadastrarVulneravel";
import { zodResolver } from "@hookform/resolvers/zod";

function CadastrarVulneravel() {
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
        className={`input w-full max-w-md ${errors.totalAdultos ? "input-error" : "input-bordered"}`}
        type="number"
        {...register("totalAdultos")}
        placeholder="Total de Adultos"
      />

      <div className="flex gap-x-2 form-control">
        <label className="label">
          <span className="label-text">Aluguel</span>
          <input
            type="radio"
            {...register("moradia")}
            className="radio"
            value="aluguel"
          />
        </label>
        <label className="label">
          <span className="label-text">Casa Própria</span>
          <input
            type="radio"
            {...register("moradia")}
            className="radio"
            value="casa_própria"
          />
        </label>
      </div>

      <input className="mt-3 btn btn-primary w-fit" type="submit" />

      <pre className="mt-20 text-lg">{output}</pre>
    </form>
  );
}

export default CadastrarVulneravel;
