"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  CadastrarVulneravelFormData,
  cadastrarVulneravelSchema,
} from "@/lib/forms/cadastrar-vulneravel/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  moradiaOptions,
  perdasCatastrofesOptions,
} from "@/lib/forms/cadastrar-vulneravel/options";
import { sections } from "@/lib/forms/cadastrar-vulneravel/sections";

import RadioGroup from "@/app/ui/form/uncontrolled/RadioGroup";
import Input from "@/app/ui/form/uncontrolled/Input";
import ComboBox from "@/app/ui/form/uncontrolled/ComboBox";
import MultiSelect from "@/app/ui/form/controlled/MultiSelect";
import Error from "@/app/ui/form/Error";

function CadastrarVulneravel() {
  const [output, setOutput] = useState("");
  const [currentSection, setCurrentSection] = useState(0);

  const {
    register,
    unregister,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm<CadastrarVulneravelFormData>({
    resolver: yupResolver(cadastrarVulneravelSchema),
  });

  const problemasSaudeFamilia = useWatch({
    control,
    name: "problemas_saude_familia",
    defaultValue: [],
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (problemasSaudeFamilia.length === 0) {
      unregister("despesas_saude");
    }
  }, [problemasSaudeFamilia.length]);

  function changeSection(
    e: React.MouseEvent<HTMLButtonElement>,
    next: boolean,
  ) {
    e.preventDefault();

    const currentSectionItems = sections[currentSection].items;

    currentSectionItems?.forEach((item) => trigger(item));

    if (isValid) {
      const newCurrentSection = next ? currentSection + 1 : currentSection - 1;

      document.querySelector(`#section-${newCurrentSection}`)?.scrollIntoView();

      setCurrentSection(newCurrentSection);
    }
  }

  return (
    <div className="w-full bg-base-200 rounded-2xl form-control">
      <ul className="steps border-8 border-base-200 bg-neutral rounded-t-2xl px-10 py-16 text-xl">
        {sections.map((section, i) => (
          <li
            key={i}
            className={`step text-neutral-content ${currentSection >= i && "step-accent"}`}
          >
            {section.label}
          </li>
        ))}
      </ul>

      <form
        className="p-10"
        onSubmit={handleSubmit((data) => {
          setOutput(JSON.stringify(data, null, 2));
        })}
      >
        <div className="carousel my-auto py-1 w-full overflow-x-hidden">
          <section
            className="carousel-item w-full items-center flex-col gap-y-4"
            id="section-0"
          >
            <Input
              register={register("nome")}
              label="Nome"
              error={errors.nome}
            />

            <Input
              register={register("total_adultos")}
              label="Total de Adultos"
              type="number"
              defaultValue={0}
              size={10}
              error={errors.total_adultos}
            />

            <RadioGroup
              register={register("moradia")}
              enumOptions={moradiaOptions}
              label="Moradia"
              error={errors.moradia}
            />

            <Controller
              name="problemas_saude_familia"
              control={control}
              defaultValue={[] as string[]}
              render={({ field: { value, onChange, onBlur } }) => (
                <MultiSelect
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Problemas de Saúde da Família"
                />
              )}
            />
            <Error error={errors.problemas_saude_familia?.root} />

            {problemasSaudeFamilia.length > 0 && (
              <div className="animate-[fade-in_.5s]">
                <Input
                  register={register("despesas_saude")}
                  label="Despesas por Saúde"
                  error={errors.despesas_saude}
                />
              </div>
            )}

            <ComboBox
              register={register("perdas_catastrofes")}
              enumOptions={perdasCatastrofesOptions}
              label="Perdas por Catástrofes"
              error={errors.perdas_catastrofes}
            />
          </section>
          <section
            className="carousel-item w-full flex-col items-center gap-y-4"
            id="section-1"
          >
            <label className="label w-fit h-fit">
              <input
                type="checkbox"
                {...register("cesta_basica")}
                className="checkbox w-4 h-4"
              />
              <span className="label-text">Cesta básica</span>
            </label>
          </section>
        </div>

        <div className="w-full flex gap-x-5 mt-16 justify-center">
          <button
            className="btn btn-outline"
            onClick={(e) => changeSection(e, false)}
            disabled={currentSection === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-outline"
            onClick={(e) => changeSection(e, true)}
            disabled={currentSection === sections.length - 1}
          >
            Next
          </button>
          <button
            disabled={currentSection !== sections.length - 1}
            className="btn btn-accent w-fit"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <pre className="mt-20 pb-10 text-lg mx-auto">{output}</pre>
    </div>
  );
}

export default CadastrarVulneravel;
