import * as yup from "yup";

export const signupSchema = yup.object({
  cpf: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email("E-mail com formato incorreto").required(),
  nome: yup.string().required(),
  passwd: yup.string().required(),
  confirmPasswd: yup
    .string()
    .required()
    .oneOf([yup.ref("passwd")], "Senha não é igual"),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;
