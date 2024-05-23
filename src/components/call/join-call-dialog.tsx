/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useState } from "react";
import CardShell, { type CardProps } from "../layout/card-shell";
import { useRouter } from "next/navigation";
import { joinCallFormSchema } from "~/schemas/call";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { extractId } from "~/lib/extract-id";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormData = z.infer<typeof joinCallFormSchema>;

export default function JoinCallDialog(card: CardProps) {
  const [isJoinCallLoading, setIsJoinCallLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(joinCallFormSchema),
  });

  async function joinCall(data: FormData) {
    setIsJoinCallLoading(true);
    const callName = extractId(data.meetingLink);

    const response = await fetch(`/api/call/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callName: callName,
        username: data.name,
      }),
    }).catch((error) => {
      console.error("Error during fetch:", error);
    });

    if (!response?.ok) {
      setIsJoinCallLoading(false);
      return toast({
        title: "Something went wrong.",
        description: "This call cannot be joined. Please try again.",
        variant: "destructive",
      });
    }

    setIsJoinCallLoading(false);
    router.push(`/call/${callName}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex h-fit w-fit p-0 hover:bg-card">
          <CardShell card={card} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-xl">Join a call</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Join a call by entering the meeting link or ID.
          </DialogDescription>
        </DialogHeader>
        <form className="pt-4" onSubmit={handleSubmit(joinCall)}>
          <div className="w-full space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your name (optional)"
              className="mb-4 w-full"
              id="name"
            />
          </div>
          <div className="mt-4 w-full space-y-1">
            <Label htmlFor="meeting-link">Meeting URL</Label>
            <Input
              {...register("meetingLink")}
              type="url"
              placeholder="Meeting link or ID"
              className="w-full"
              id="meeting-link"
            />
          </div>
          {errors.meetingLink &&
            typeof errors.meetingLink.message === "string" && (
              <p className="mb-4 mt-2 text-sm text-red-500">
                {errors.meetingLink.message}
              </p>
            )}
          <DialogFooter className="flex flex-col-reverse pt-8 md:flex-row">
            <Button
              type="submit"
              className="rounded-md px-12 font-normal"
              disabled={isJoinCallLoading}
            >
              {isJoinCallLoading && (
                <Icons.spinner
                  color="#fff"
                  width={14}
                  height={14}
                  className="mr-2"
                />
              )}
              Join Call
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
