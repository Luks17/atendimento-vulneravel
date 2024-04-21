"use client";

import Form from "@/app/(components)/dashboard/Form";
import FormCarousel from "@/app/(components)/dashboard/FormCarousel";
import ComboBox from "@/app/(components)/formWidgets/uncontrolled/ComboBox";
import Input from "@/app/(components)/formWidgets/uncontrolled/Input";
import { useSetNotification } from "@/app/(components)/notifications/NotificationProvider";
import { submitSolicitacaoAuxilio } from "@/app/actions/SolicitacaoAuxilioActions";
import { TiposAuxilios, TiposProblemas } from "@/database/models/Solicitacao";
import { enumEntries } from "@/lib/ui/forms/common";
import {
  SolicitacaoAuxilioFormData,
  solicitacaoAuxilioSchema,
} from "@/lib/ui/forms/solicitacao-auxilio/schema";
import { sections } from "@/lib/ui/forms/solicitacao-auxilio/sections";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

function SolicitacaoAuxilio() {
  const [currentSection, setCurrentSection] = useState(0);
  const setNotification = useSetNotification();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SolicitacaoAuxilioFormData>({
    resolver: yupResolver(solicitacaoAuxilioSchema),
  });

  const tipoAuxilio = watch(
    "tipo_auxilio",
    TiposAuxilios["Auxílio Medicamento"],
  );

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
          .querySelector(`#form-carousel-section-${newCurrentSection}`)
          ?.scrollIntoView();

        setCurrentSection(newCurrentSection);
      }
    });
  }

  return (
    <Form.SectionsWrapper currentSection={currentSection} sections={sections}>
      <Form.Root
        onSubmit={handleSubmit(async (formData) => {
          const { success, data } = await submitSolicitacaoAuxilio(formData);

          if (success) {
            setNotification({ message: data.message, messageType: "success" });
          } else {
            setNotification({ message: data.message, messageType: "error" });
          }
        })}
      >
        <FormCarousel.Root>
          <FormCarousel.Section id={0}>
            <ComboBox
              register={register("tipo_problema")}
              enumOptions={enumEntries(TiposProblemas)}
              label="Tipo de Problema"
              error={errors.tipo_problema}
            />
            <Input
              register={register("descricao_problema")}
              label="Descrição do Problema"
              error={errors.descricao_problema}
            />
          </FormCarousel.Section>
          <FormCarousel.Section id={1}>
            <ComboBox
              register={register("tipo_auxilio")}
              enumOptions={enumEntries(TiposAuxilios)}
              label="Tipo de Auxílio"
              error={errors.tipo_auxilio}
            />
            {tipoAuxilio === TiposAuxilios["Cesta Básica"] && (
              <div className="animate-[fade-in_.5s]">
                <Input
                  register={register("qtd_cestas_basica", {
                    shouldUnregister: true,
                  })}
                  label="Quantidade de Cestas Básicas"
                  type="number"
                  defaultValue={0}
                  size={5}
                  error={errors.qtd_cestas_basica}
                />
              </div>
            )}
            {tipoAuxilio === TiposAuxilios["Auxílio Medicamento"] && (
              <div className="animate-[fade-in_.5s]">
                <Input
                  register={register("vl_auxilio_medicamento", {
                    shouldUnregister: true,
                  })}
                  label="Valor de Auxílio Medicamento"
                  size={10}
                  placeholder="R$"
                  error={errors.vl_auxilio_medicamento}
                />
              </div>
            )}
            {tipoAuxilio === TiposAuxilios["Vaga para Creche"] && (
              <div className="animate-[fade-in_.5s]">
                <Input
                  register={register("qtd_vagas_creche", {
                    shouldUnregister: true,
                  })}
                  label="Quantidade de Vagas para Creche"
                  type="number"
                  defaultValue={0}
                  size={5}
                  error={errors.qtd_vagas_creche}
                />
              </div>
            )}
            {tipoAuxilio === TiposAuxilios["Vaga para Escola"] && (
              <div className="animate-[fade-in_.5s]">
                <Input
                  register={register("qtd_vagas_escola", {
                    shouldUnregister: true,
                  })}
                  label="Quantidade de Vagas para Escola"
                  type="number"
                  defaultValue={0}
                  size={5}
                  error={errors.qtd_vagas_escola}
                />
              </div>
            )}
          </FormCarousel.Section>
        </FormCarousel.Root>
        <Form.SubmitWithSections
          currentSection={currentSection}
          sectionsNumber={sections.length}
          changeSection={changeSection}
        />
      </Form.Root>
    </Form.SectionsWrapper>
  );
}

export default SolicitacaoAuxilio;
