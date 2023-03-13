import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import z from "zod";
import { Input } from "../../components/Input";
import HubLocalLogo from "../../assets/HubLocalLogo.png";
import { login } from "../../store/modules/auth/actions";
import { api } from "../../services/api";
import { toastFormErrors } from "../../utils/form/toastFormErrors";

import { LoginButton, LoginForm, SignUpButton } from "./styles";

const loginFormSchema = z.object({
  email: z.string().min(1, "Informe o e-mail"),
  password: z.string().min(1, "Informe a senha"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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

  function handleSubmitError() {
    toastFormErrors(errors);
  }

  function handleNavigateToSignUpPage() {
    navigate("/auth/sign-up");
  }

  return (
    <LoginForm onSubmit={handleSubmit(handleLogin, handleSubmitError)}>
      <img src={HubLocalLogo} />

      <Input labelText="Email" {...register("email")} />
      <Input labelText="Senha" {...register("password")} type="password" />

      <LoginButton disabled={isSubmitting}>
        {!isSubmitting ? "LOGAR" : <ClipLoader size="1.25rem" color="white" />}
      </LoginButton>
      <SignUpButton onClick={handleNavigateToSignUpPage}>
        CRIAR CONTA
      </SignUpButton>
    </LoginForm>
  );
}
