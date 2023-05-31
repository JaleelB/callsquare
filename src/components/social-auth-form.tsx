"use client"
import * as React from "react";
import { signIn } from "next-auth/react";
import { Icons } from './icons';
import ToastContext from "~/context/toast-context";
import { useRouter } from "next/router";

const socialProviders = [
  { name: "github", color: "#FFF", icon: Icons.github },
  { name: "google", color: "#0f172a", icon: Icons.google },
  { name: "discord", color: "#0f172a", icon: Icons.discord },
];

export default function SocialAuthForm () {
  const [isSocialLoading, setIsSocialLoading] = React.useState<{ [key: string]: boolean }>({});
  const { addToast } = React.useContext(ToastContext);
  // const router = useRouter();

  const handleSocialSignIn = (provider: string) => {
    setIsSocialLoading((prevLoading) => ({
      ...prevLoading,
      [provider]: true,
    }));

    signIn(provider, { callbackUrl: '/' })
      .then(() =>{
        addToast({
          title: "Hooray!",
          message: `You were successfully signed in.`,
        });
      })
      .catch((error) => {
        console.error(`Error during ${provider} sign-in:`, error);
        addToast({
          title: "Something went wrong!",
          variant: "destructive",
          message: `Error during ${provider} sign-in.`,
        });
      })
      .finally(() => {
        setIsSocialLoading((prevLoading) => ({
          ...prevLoading,
          [provider]: false,
        }));
      });
  };

  return (
    <section className='w-full mx-auto flex flex-col gap-1'>
      {socialProviders.map((provider) => (
        <button 
          key={provider.name}
          className={`w-full h-12 text-sm flex gap-3 justify-center items-center rounded-sm
           ${provider.name === "github" ? "bg-slate-900 text-white border-2 border-slate-900": "border-2 border-slate-200 text-slate-900 "}
          `}
          onClick={() => handleSocialSignIn(provider.name)}
          disabled={isSocialLoading[provider.name]}
        >
          {isSocialLoading[provider.name] ? (
            <Icons.spinner width="16" height="16"/>
          ) : (
            <provider.icon color={provider.color} width="16" height="16"/>
          )}
          Continue with {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </button>
      ))}
    </section>
  );
}
