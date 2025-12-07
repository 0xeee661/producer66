import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            PRODUCER<span className="text-red-600">.</span>
          </h1>
          <p className="text-zinc-400 text-sm">Create your account</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-zinc-900 border border-zinc-800 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: "bg-white hover:bg-zinc-100 text-black border-0",
              socialButtonsBlockButtonText: "text-black font-medium",
              formButtonPrimary: "bg-red-600 hover:bg-red-700 text-white",
              footerActionLink: "text-red-500 hover:text-red-400",
              formFieldLabel: "text-zinc-300",
              formFieldInput: "bg-zinc-800 border-zinc-700 text-white",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-red-500",
              dividerLine: "bg-zinc-700",
              dividerText: "text-zinc-500",
            }
          }}
        />
      </div>
    </div>
  );
}
