"use client";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "@/app/(components)/dashboard/ThemeDropdown";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/app/(components)/formWidgets/uncontrolled/Input";
import { LoginFormData, loginSchema } from "@/lib/ui/forms/auth/loginSchema";
import { useEffect } from "react";
import { login } from "@/app/actions/AuthActions";
import { useRouter } from "next/navigation";
import { useSetNotification } from "@/app/(components)/notifications/NotificationProvider";

function Login() {
  const router = useRouter();
  const setNotification = useSetNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    const message = localStorage.getItem("signup-success");
    if (message) {
      setNotification({ message, messageType: "success" });
      localStorage.removeItem("signup-success");
    }
  }, []);

  return (
    <div className="form-control flex-1 h-full items-center justify-center p-2">
      <form
        onSubmit={handleSubmit(async (formData) => {
          const { success, data } = await login(formData);

          if (success) {
            router.push("/");
          } else {
            setNotification({ message: data.message, messageType: "error" });
          }
        })}
        className="bg-base-300 w-full max-w-md p-10 flex flex-col gap-y-2 rounded-box"
      >
        <div className="w-full flex justify-between py-5">
          <div className="text-base-content w-full">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm opacity-70">
              Não tem uma conta?{" "}
              <Link className="link link-success font-bold" href="/auth/signup">
                Registre-se
              </Link>
            </p>
          </div>
          <ThemeDropdown showText={false} />
        </div>
        <div className="form-control gap-y-2.5">
          <Input
            label="E-mail"
            showLabel={false}
            type="email"
            register={register("email")}
            icon={<EnvelopeIcon className="w-6 h-6 opacity-70" />}
            error={errors.email}
          />
          <Input
            label="Senha"
            showLabel={false}
            type="password"
            register={register("passwd")}
            icon={<KeyIcon className="w-6 h-6 opacity-70" />}
            error={errors.passwd}
          />
        </div>
        <button
          className="btn btn-primary w-fit self-center mt-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
