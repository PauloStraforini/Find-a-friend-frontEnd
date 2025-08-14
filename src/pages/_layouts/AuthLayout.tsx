export const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-800">
      <div className="w-full max-w-md bg-red rounded-lg shadow p-8">
        {children}
      </div>
    </div>
  )
}
