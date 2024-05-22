"use client";

import Form from "@/app/(components)/dashboard/Form";
import ComboBox from "@/app/(components)/formWidgets/uncontrolled/ComboBox";
import Input from "@/app/(components)/formWidgets/uncontrolled/Input";
import { useSetNotification } from "@/app/(components)/notifications/NotificationProvider";
import { submitSituacao } from "@/app/actions/SituacaoActions";
import { MoradiaEnum } from "@/lib/enums/Situacao";
import { enumEntries } from "@/lib/ui/forms/common";
import {
  RegistrarSituacaoFormData,
  registrarSituacaoSchema,
} from "@/lib/ui/forms/registrar-situacao/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function RegistrarSituacao() {
  const setNotification = useSetNotification();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrarSituacaoFormData>({
    resolver: yupResolver(registrarSituacaoSchema),
  });

  const moradia = watch("moradia", MoradiaEnum["Casa Própria"]);

  return (
    <div className="w-full bg-base-200 h-full rounded-box form-control">
      <Form.Root
        className="form-control w-full items-center p-10 xl:p-20"
        onSubmit={handleSubmit(async (formData) => {
          const { success, data } = await submitSituacao(formData);

          if (success) {
            setNotification({
              message: data.message,
              messageType: "success",
            });
          } else {
            setNotification({
              message: data.message,
              messageType: "error",
            });
          }
        })}
      >
        <div className="form-control items-start gap-y-4 border-l-2 border-l-primary pl-5 max-w-lg">
          <ComboBox
            register={register("moradia")}
            enumOptions={enumEntries(MoradiaEnum)}
            label="Moradia"
            error={errors.moradia}
          />
          {moradia === MoradiaEnum.Aluguel && (
            <div className="animate-[fade-in_.5s]">
              <Input
                register={register("valor_aluguel", {
                  shouldUnregister: true,
                })}
                label="Valor do Aluguel"
                size={12}
                placeholder="R$"
                error={errors.valor_aluguel}
              />
            </div>
          )}
          <Form.Group>
            <Input
              register={register("total_adultos")}
              label="Total de Adultos na Moradia"
              type="number"
              size={18}
              placeholder="Quantos?"
              error={errors.total_adultos}
            />
            <Input
              register={register("total_criancas")}
              label="Total de Crianças na Moradia"
              type="number"
              size={18}
              placeholder="Quantas?"
              error={errors.total_criancas}
            />
          </Form.Group>
          <Input
            register={register("renda_familiar")}
            label="Renda Familiar"
            size={12}
            placeholder="R$"
            error={errors.renda_familiar}
          />
        </div>
        <Form.Submit />
      </Form.Root>
    </div>
  );
}

export default RegistrarSituacao;
