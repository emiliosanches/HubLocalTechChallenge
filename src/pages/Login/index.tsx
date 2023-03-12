import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { login } from "../../store/modules/auth/actions";
import { api } from "../../services/api";
import HubLocalLogo from "../../assets/HubLocalLogo.png";

import { InputContainer, LoginButton, LoginForm, SignUpButton } from "./styles";

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  async function handleLogin(data: LoginFormData) {
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
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("E-mail ou senha incorretos");
      } else {
        toast.error(
          "Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde."
        );
      }
    }
  }

  function handleNavigateToSignUpPage() {
    navigate("/auth/sign-up");
  }

  return (
    <LoginForm onSubmit={handleSubmit(handleLogin)}>
      <img src={HubLocalLogo} />

      <InputContainer>
        <label>Email</label>
        <input {...register("email")} />
      </InputContainer>
      <InputContainer>
        <label>Senha</label>
        <input {...register("password")} type="password" />
      </InputContainer>
      <LoginButton>LOGAR</LoginButton>
      <SignUpButton onClick={handleNavigateToSignUpPage}>
        CRIAR CONTA
      </SignUpButton>
    </LoginForm>
  );
}
