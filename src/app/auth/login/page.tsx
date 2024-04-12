"use client";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "@/app/ui/dashboard/ThemeDropdown";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/app/ui/form/uncontrolled/Input";
import { LoginFormData, loginSchema } from "@/lib/forms/auth/loginSchema";
import { useEffect, useState } from "react";
import Notification from "@/app/ui/Notification";

function Login() {
  const [authSuccessMessage, setAuthSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (authSuccessMessage == "") {
      const message = localStorage.getItem("auth-success");
      if (message) {
        setAuthSuccessMessage(message);
      }
    } else {
      localStorage.removeItem("auth-success");
    }
  }, [authSuccessMessage]);

  return (
    <div className="form-control flex-1 h-full items-center justify-center p-2">
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="bg-base-300 w-full max-w-md p-10 flex flex-col gap-y-2 rounded-box"
      >
        <div className="w-full flex justify-between py-5">
          <div className="text-base-content w-full">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm opacity-70">
              Não tem uma conta?{" "}
              <Link className="link link-success font-bold" href="/signup">
                Registre-se
              </Link>
            </p>
          </div>
          <ThemeDropdown />
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
      <Notification message={authSuccessMessage} messageType="success" />
    </div>
  );
}

export default Login;
