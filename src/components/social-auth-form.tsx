"use client"
import * as React from "react";
import { signIn } from "next-auth/react";
import { Icons } from './ui/icons';
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const socialProviders = [
  { name: "github", color: "#FFF", icon: Icons.github },
  { name: "google", color: "#0f172a", icon: Icons.google },
  { name: "discord", color: "#0f172a", icon: Icons.discord },
];

export default function SocialAuthForm () {
  const [isSocialLoading, setIsSocialLoading] = React.useState<{ [key: string]: boolean }>({});
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const handleSocialSignIn = (provider: string) => {
    setIsSocialLoading((prevLoading) => ({
      ...prevLoading,
      [provider]: true,
    }));

    signIn(provider, { callbackUrl: searchParams?.get("from") || "/calls", })
      .then(() =>{
        console.log(`Successfully signed in.`);
      })
      .catch((error) => {
        console.error(`Error during ${provider} sign-in:`, error);
        toast({
          title: "Something went wrong!",
          variant: "destructive",
          description: `Error during ${provider} sign-in.`,
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
        <Button 
          key={provider.name}
          size="lg"
          className="font-normal"
          variant={provider.name === "github" ? "default" : "outline"}
          onClick={() => handleSocialSignIn(provider.name)}
          disabled={isSocialLoading[provider.name]}
        >
          {isSocialLoading[provider.name] ? (
            <Icons.spinner 
              width="16" 
              height="16" 
              className="mr-3"
            />
          ) : (
            <provider.icon 
              color={provider.color} 
              width="16" 
              height="16" 
              className="mr-3"
            />
          )}
          Continue with {provider.name === "github" ? "GitHub" : provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </Button>
      ))}
    </section>
  );
}
