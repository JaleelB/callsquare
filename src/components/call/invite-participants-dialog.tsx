/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useState } from "react";
import { Icons } from "../ui/icons";
import CardShell, { type CardProps } from "../layout/card-shell";
import { useForm } from "react-hook-form";
import { inviteSchema } from "~/schemas/invite";
import { env } from "~/env.mjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { getSession } from "next-auth/react";
import { useCallId } from "~/context/call-id-context";
import useClipboard from "~/hooks/use-copy";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormData = z.infer<typeof inviteSchema>;

export default function InviteParticipantsDialog(card: CardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(inviteSchema),
  });
  const { toast } = useToast();
  const { callId } = useCallId();
  const { isCopied, copyToClipboard } = useClipboard();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const currentUser = await getSession();

    if (
      currentUser &&
      typeof data.email === "string" &&
      typeof currentUser.user.email === "string" &&
      typeof currentUser.user.name === "string" &&
      typeof currentUser.user.image === "string"
    ) {
      const recipientUsername = data.email.split("@")[0];

      try {
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient: data.email,
            link: `${env.NEXT_PUBLIC_APP_URL}/call/${callId}`,
            recipientUsername,
            senderImage: currentUser.user.image,
            invitedByUsername: currentUser.user.name,
            invitedByEmail: currentUser.user.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        setIsLoading(false);
        return toast({
          title: "Invite sent",
          description: "Your invite has been sent successfully",
          variant: "default",
        });
      } catch (error) {
        setIsLoading(false);
        return toast({
          title: "Error sending invite",
          description:
            "There was an error sending your invite. Please try again later.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex h-fit w-fit p-0 hover:bg-card">
          <CardShell card={card} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">Invite participants</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Copy the link below and invite participants to this call.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-end justify-between md:flex-row">
            <div className="w-full space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Email address"
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="mt-2 w-full whitespace-nowrap rounded-md font-normal md:ml-2 md:mt-0 md:w-fit"
              size="lg"
            >
              {isLoading && (
                <Icons.spinner
                  width="16"
                  height="16"
                  className="mr-3"
                  color="#fff"
                />
              )}
              Send invite
            </Button>
          </div>
          {errors.email && typeof errors.email.message === "string" && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </form>
        <div className="my-4 h-[1px] w-full bg-slate-200"></div>
        <DialogFooter className="w-full">
          <div className="mb-2 flex w-full flex-col items-end justify-between md:flex-row">
            <div className="w-full space-y-1">
              <Label htmlFor="link">Link</Label>
              <Input
                disabled
                placeholder={`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`}
                required
                id="link"
                className="w-full"
              />
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="ml-auto mt-2 flex w-full rounded-md font-normal md:ml-2 md:mt-0 md:w-fit"
              onClick={async () => {
                await copyToClipboard(
                  `${env.NEXT_PUBLIC_APP_URL}/call/${callId}`
                );
                if (isCopied) {
                  toast({
                    title: "Copied to clipboard",
                    description:
                      "The invite link has been copied to your clipboard.",
                    variant: "default",
                  });
                }
              }}
            >
              Copy
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
