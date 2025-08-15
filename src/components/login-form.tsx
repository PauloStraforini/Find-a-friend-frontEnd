"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { singIn } from "@/api/sing-in"
import z from "zod"

const signInForm = z.object({
  registration: z.string().min(6),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInForm>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const mutation = useMutation({
    mutationFn: (data: SignInForm) => singIn(data),
    onSuccess: () => {
      toast.success("Login realizado com sucesso! 🎉")
    },
    onError: () => {
      toast.error("Erro ao realizar login")
    },
  })

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      registration: formData.get("registration") as string,
      password: formData.get("password") as string,
    }

    const parse = signInForm.safeParse(data)

    if (!parse.success) {
      toast.error("Matrícula ou senha inválidos!")
      return
    }

    mutation.mutate(parse.data)
  }


  return (
    <div className={cn("h-full w-full", className)} {...props}>
      <div className="h-full w-full grid md:grid-cols-2">
        <div className="flex items-center justify-center p-6 md:p-8 bg-background">
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Seja Bem vindo</h1>
                <p className="text-muted-foreground text-balance">
                  Faça Login na sua conta
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="registration">Matrícula</Label>
                <Input
                  id="registration"
                  name="registration" // corrigido para bater com o schema
                  placeholder="123456"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueçeu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer bg-blue-400 hover:bg-blue-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Entrando..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Não tem conta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Criar conta
                </a>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-muted relative hidden md:block">
          <img
            src="/Animal shelter-bro.svg"
            alt="Login background"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-muted-foreground text-center text-xs text-balance md:left-1/4">
        <span className="*:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </span>
      </div>
    </div>
  )

}
