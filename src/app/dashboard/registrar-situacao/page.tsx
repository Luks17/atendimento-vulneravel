"use client";

import Form from "@/app/(components)/dashboard/Form";
import ComboBox from "@/app/(components)/formWidgets/uncontrolled/ComboBox";
import { useSetNotification } from "@/app/(components)/notifications/NotificationProvider";
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
    formState: { errors },
  } = useForm<RegistrarSituacaoFormData>({
    resolver: yupResolver(registrarSituacaoSchema),
  });

  return (
    <div className="w-full bg-base-200 h-full rounded-box form-control">
      <Form.Root className="form-control w-full items-center p-10 xl:p-20">
        <div className="form-control items-start gap-y-4">
          <ComboBox
            register={register("moradia")}
            enumOptions={enumEntries(MoradiaEnum)}
            label="Moradia"
            error={errors.moradia}
          />
        </div>
      </Form.Root>
    </div>
  );
}

export default RegistrarSituacao;
