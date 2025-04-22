import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().nonempty("Vous devez spécifier l'email"),
  password: z.string().nonempty("Vous devez spécifier le mot de passe"),
});
