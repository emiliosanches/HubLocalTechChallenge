import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { toast } from "react-toastify";
import { login } from "../../store/modules/auth/actions";
import { api } from "../../services/api";
import HubLocalLogo from "../../assets/HubLocalLogo.png";

import {
  InputContainer,
  SignUpButton,
  SignUpForm,
  NavigateToLoginButton,
} from "./styles";

const signUpFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUpPage() {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
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

  function handleNavigateToLoginPage() {
    navigate("/auth/login");
  }

  return (
    <SignUpForm onSubmit={handleSubmit(handleSignUp)}>
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
      <SignUpButton>REGISTRAR</SignUpButton>
      <NavigateToLoginButton onClick={handleNavigateToLoginPage}>
        LOGAR
      </NavigateToLoginButton>
    </SignUpForm>
  );
}
