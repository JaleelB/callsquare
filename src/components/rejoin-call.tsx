/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { useToast } from "./ui/use-toast";
import { useHMSActions } from "@100mslive/react-sdk";
import * as React from 'react';

export default  function RejoinCall({
    roomName,
    stayOnScreenHandler,
    roomId
}:{
    roomName: string,
    stayOnScreenHandler: () => void,
    roomId: string
}){

    const router = useRouter();
    const { toast } = useToast();
    const actions = useHMSActions();
    const [secondsLeft, setSecondsLeft] = React.useState(60); // 10 seconds countdown

    const leaveCall = React.useCallback(async () => {
        const response = await fetch(`/api/call/leave`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            callName: roomName,
            roomId: roomId
          }),
        });
    
        if(!response.ok){
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
                setSecondsLeft(prevSeconds => prevSeconds - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else {
            void leaveCall();
            router.replace("/calls");
        }
    }, [leaveCall, router, secondsLeft]);    

    const strokeDashoffset = ((60 - secondsLeft) / 60) * 283;

    return (
        <section className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center z-40">
            <div className="absolute top-6 left-6 flex gap-4 items-center">
                <div className="relative w-12 h-12 flex gap-2">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#ddd" strokeWidth="5" />
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="#10172A" 
                            strokeWidth="5" 
                            strokeLinecap="round"
                            strokeDasharray="283"
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-primary text-xs">{secondsLeft}s</span>
                    </div>
                </div>
                <span className="text-primary text-sm">Returning to the homescreen</span>
            </div>
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-primary text-3xl">You have left the call</h2>
                    <p className="text-muted-foreground text-center mt-2">Would you like to rejoin?</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button 
                        variant="outline"
                        className="py-5 text-primary"
                        onClick={() => {
                            stayOnScreenHandler()
                            window.location.reload()
                        }}
                    >
                        Rejoin call
                    </Button>
                    <Button 
                        className="py-5"
                        onClick={async() => {
                            await leaveCall();
                            router.replace("/calls");
                        }}
                    >
                        Return to homescreen
                    </Button>
                </div>
            </div>
        </section>
    )
}