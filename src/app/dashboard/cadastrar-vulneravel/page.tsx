"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import {
  CadastrarVulneravelFormData,
  cadastrarVulneravelSchema,
} from "@/lib/forms/cadastrar-vulneravel/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { sections } from "@/lib/forms/cadastrar-vulneravel/sections";

import RadioGroup from "@/app/ui/form/uncontrolled/RadioGroup";
import Input from "@/app/ui/form/uncontrolled/Input";
import ComboBox from "@/app/ui/form/uncontrolled/ComboBox";
import MultiSelect from "@/app/ui/form/controlled/MultiSelect";
import Error from "@/app/ui/form/Error";
import { BinaryOptionsEnum, enumEntries } from "@/lib/forms/common";
import {
  MoradiaEnum,
  PerdasCatastrofesEnum,
} from "@/database/models/Vulneravel";
import { submitVulneravel } from "@/app/actions/VulneraveisActions";

function CadastrarVulneravel() {
  const [currentSection, setCurrentSection] = useState(0);
  const outputContainer = useRef<HTMLDivElement | null>(null);

  const {
    register,
    unregister,
    handleSubmit,
    trigger,
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

    trigger(next ? currentSectionItems : []).then((isValid) => {
      if (isValid) {
        const newCurrentSection = next
          ? currentSection + 1
          : currentSection - 1;

        document
          .querySelector(`#section-${newCurrentSection}`)
          ?.scrollIntoView();

        setCurrentSection(newCurrentSection);
      }
    });
  }

  function outputChange(success: boolean, msg: any) {
    const output = outputContainer.current!;

    output.classList.remove("hidden");

    success
      ? output.classList.add("badge-success")
      : output.classList.add("badge-error");

    output.querySelector("span")!.textContent = msg;
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
        className="p-10 form-control"
        onSubmit={handleSubmit((data) => {
          submitVulneravel(data)
            .then(() => outputChange(true, "Success"))
            .catch((e) => outputChange(false, e));
        })}
      >
        <div
          className="mx-auto badge gap-x-1 items-center hidden"
          ref={outputContainer}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              outputContainer.current!.classList.add("hidden");
            }}
          >
            x
          </button>
          <span />
        </div>
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
              enumOptions={enumEntries(MoradiaEnum)}
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
                  required={false}
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
              enumOptions={enumEntries(PerdasCatastrofesEnum)}
              label="Perdas por Catástrofes"
              error={errors.perdas_catastrofes}
            />
          </section>
          <section
            className="carousel-item w-full flex-col items-center gap-y-4"
            id="section-1"
          >
            <RadioGroup
              register={register("cesta_basica")}
              enumOptions={enumEntries(BinaryOptionsEnum)}
              label="Solicitar Cesta Básica?"
              error={errors.cesta_basica}
            />
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
    </div>
  );
}

export default CadastrarVulneravel;
