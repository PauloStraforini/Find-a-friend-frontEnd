import { createFileRoute } from "@tanstack/react-router"
import { LoginForm } from "@/components/login-form"

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="min-h-screen w-full">
      <LoginForm className="h-screen w-full" />
    </div>
  )
}

export default SignInPage;
