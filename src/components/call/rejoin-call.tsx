/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useHMSActions } from "@100mslive/react-sdk";
import * as React from "react";

export default function RejoinCall({
  roomName,
  stayOnScreenHandler,
  roomId,
}: {
  roomName: string;
  stayOnScreenHandler: () => void;
  roomId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const actions = useHMSActions();
  const [secondsLeft, setSecondsLeft] = React.useState(60); // 60 seconds countdown

  const leaveCall = React.useCallback(async () => {
    const response = await fetch(`/api/call/leave`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callName: roomName,
        roomId: roomId,
      }),
    });

    if (!response.ok) {
      toast({
        title: "Something went wrong.",
        description: "Your call cannot be left. Please try again.",
        variant: "destructive",
      });
    }

    await actions.leave();
  }, [roomName, roomId, toast, actions]);

  React.useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      void leaveCall();
      router.replace("/calls");
    }
  }, [leaveCall, router, secondsLeft]);

  const strokeDashoffset = ((60 - secondsLeft) / 60) * 283;

  return (
    <section className="fixed inset-0 z-40 flex h-screen w-screen items-center justify-center bg-background">
      <div className="absolute left-6 top-6 flex items-center gap-4">
        <div className="relative flex h-12 w-12 gap-2">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="fill-primary"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              className="fill-background"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-primary">{secondsLeft}s</span>
          </div>
        </div>
        <span className="text-sm text-primary">
          Returning to the homescreen
        </span>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl text-primary">You have left the call</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Would you like to rejoin?
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="py-5 text-primary"
            onClick={() => {
              stayOnScreenHandler();
              window.location.reload();
            }}
          >
            Rejoin call
          </Button>
          <Button
            className="py-5"
            onClick={async () => {
              await leaveCall();
              router.replace("/calls");
            }}
          >
            Return to homescreen
          </Button>
        </div>
      </div>
    </section>
  );
}
