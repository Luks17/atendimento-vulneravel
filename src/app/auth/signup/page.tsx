"use client";

import {
  EnvelopeIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ThemeDropdown from "@/app/(components)/dashboard/ThemeDropdown";
import Input from "@/app/(components)/formWidgets/uncontrolled/Input";
import { useForm } from "react-hook-form";
import { SignupFormData, signupSchema } from "@/lib/ui/forms/auth/signupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { signup } from "@/app/actions/AuthActions";
import { useRouter } from "next/navigation";
import { useSetNotification } from "@/app/(components)/notifications/NotificationProvider";

function Signup() {
  const router = useRouter();
  const setNotification = useSetNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  return (
    <div className="form-control flex-1 h-full items-center justify-center p-2">
      <form
        onSubmit={handleSubmit(async (formData) => {
          const { success, data } = await signup(formData);

          if (success) {
            localStorage.setItem("signup-success", data.message);
            router.push("/auth/login");
          } else {
            setNotification({ message: data.message, messageType: "error" });
          }
        })}
        className="bg-base-300 w-full max-w-md p-10 flex flex-col gap-y-2 rounded-box"
      >
        <div className="w-full flex justify-between py-5">
          <div className="text-base-content w-full">
            <h2 className="text-2xl font-bold">Registrar-se</h2>
            <p className="text-sm opacity-70">
              Já possui uma conta?{" "}
              <Link href="/auth/login" className="link link-success">
                Conecte-se
              </Link>
            </p>
          </div>
          <ThemeDropdown showText={false} />
        </div>
        <div className="form-control gap-y-2.5">
          <Input
            label="Nome de usuário"
            type="text"
            register={register("nome")}
            placeholder="Fulano123"
            icon={<UserCircleIcon className="w-6 h-6 opacity-70" />}
            error={errors.nome}
          />
          <Input
            label="E-mail"
            type="email"
            register={register("email")}
            placeholder="exemplo.123@mail.com"
            icon={<EnvelopeIcon className="w-6 h-6 opacity-70" />}
            error={errors.email}
          />
          <Input
            label="Senha"
            type="password"
            register={register("passwd")}
            icon={<KeyIcon className="w-6 h-6 opacity-70" />}
            error={errors.passwd}
          />
          <Input
            label="Confirmar Senha"
            type="password"
            register={register("confirmPasswd")}
            icon={<KeyIcon className="w-6 h-6 opacity-70" />}
            error={errors.confirmPasswd}
          />
        </div>
        <button
          className="btn btn-primary w-fit self-center mt-2"
          type="submit"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default Signup;
