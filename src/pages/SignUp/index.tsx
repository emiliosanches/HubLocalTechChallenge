import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { login } from "../../store/modules/auth/actions";
import { api } from "../../services/api";
import HubLocalLogo from "../../assets/HubLocalLogo.png";
import { toastFormErrors } from "../../utils/form/toastFormErrors";

import {
  InputContainer,
  SignUpButton,
  SignUpForm,
  NavigateToLoginButton,
} from "./styles";

const signUpFormSchema = z
  .object({
    name: z.string().min(5, "O nome deve ter no mínimo 5 caracteres"),
    email: z.string().email("Informe um e-mail válido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "A senha deve conter uma letra minúscula")
      .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter um número")
      .regex(
        /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/,
        "A senha deve conter um símbolo"
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUpPage() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const navigate = useNavigate();

  async function handleSignUp(data: SignUpFormData) {
    if (data.password !== data.passwordConfirmation) {
      return toast.error("As senhas não coincidem");
    }

    try {
      await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error("Já existe um usuário cadastrado com esse e-mail");
      } else {
        toast.error(
          "Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde."
        );
      }

      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      dispatch(
        login({
          token: res.data.access_token,
          user: res.data.user,
        })
      );
    } catch (err) {
      toast.error(
        "Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde."
      );
    }
  }

  function handleSubmitError() {
    toastFormErrors(errors);
  }

  function handleNavigateToLoginPage() {
    navigate("/auth/login");
  }

  return (
    <SignUpForm onSubmit={handleSubmit(handleSignUp, handleSubmitError)}>
      <img src={HubLocalLogo} />

      <InputContainer>
        <label>Nome</label>
        <input {...register("name")} />
      </InputContainer>
      <InputContainer>
        <label>Email</label>
        <input {...register("email")} type="email" />
      </InputContainer>
      <InputContainer>
        <label>Senha</label>
        <input {...register("password")} type="password" />
      </InputContainer>
      <InputContainer>
        <label>Repetir senha</label>
        <input {...register("passwordConfirmation")} type="password" />
      </InputContainer>
      <SignUpButton disabled={isSubmitting}>
        {!isSubmitting ? (
          "REGISTRAR"
        ) : (
          <ClipLoader size="1.25rem" color="white" />
        )}
      </SignUpButton>
      <NavigateToLoginButton onClick={handleNavigateToLoginPage}>
        LOGAR
      </NavigateToLoginButton>
    </SignUpForm>
  );
}
