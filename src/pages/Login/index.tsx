import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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

  async function handleLogin(data: LoginFormData) {
    const res = await api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    console.log(res);

    dispatch(
      login({
        token: res.data.access_token,
        user: res.data.user,
      })
    );
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
      <SignUpButton>CRIAR CONTA</SignUpButton>
    </LoginForm>
  );
}
