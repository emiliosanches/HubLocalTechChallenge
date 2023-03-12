import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { api } from "../../services/api";

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLogin(data: LoginFormData) {
    const res = await api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <label>Email</label>
      <input {...register("email")} />
      <label>Senha</label>
      <input {...register("password")} type="password" />
      <button type="submit">LOGAR</button>
      <button>CRIAR CONTA</button>
    </form>
  );
}
