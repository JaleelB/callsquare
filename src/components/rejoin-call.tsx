/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { useToast } from "./ui/use-toast";
import { useHMSActions } from "@100mslive/react-sdk";

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

    async function leaveCall() {
    
        const response = await fetch(`/api/call/leave`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            callName: roomName,
            roomId: roomId
          }),
        })
    
        if(!response.ok){
          toast({
            title: "Something went wrong.",
            description: "Your call cannot be left. Please try again.",
            variant: "destructive",
          })
        } 

        await actions.leave();
        
    }

    return (
        <section className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center z-40">
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