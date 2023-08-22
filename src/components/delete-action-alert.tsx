"use client"
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogCancel, 
    AlertDialogAction, 
    AlertDialogHeader,
    AlertDialogFooter
} from "./ui/alert-dialog";
import React from "react";
import { Icons } from "~/components/ui/icons";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

interface ReturnData{
    success: boolean,
    error?: string,
}

export default function DeleteActionAlert({
    showDeleteAlert,
    setShowDeleteAlert,
    callId,
    title,
    description,
}:{
    showDeleteAlert: boolean,
    setShowDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    callId: string,
    description: string,
}){

    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();

    async function handleDeleteCall() {
        try {
            const response = await fetch('/api/call/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    callId: callId,
                    path: pathname,
                }),
            });
    
            const data: ReturnData = await response.json() as ReturnData;
    
            if (!data.success) throw new Error(data.error);

            toast({
                title: "Hooray!",
                description: "Your call was deleted successfully",
            })
            
        } catch (error) {
            console.error("Error deleting call:", error);
            toast({
                title: "Something went wrong!",
                description: "Couldn't delete your call. Please try again later.",
                variant: "destructive"
            })
        }
    }
    
    return (
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => window.location.reload()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                         onClick={() =>
                            startTransition(async() => {
                                await handleDeleteCall();
                                router.refresh();
                            })
                        }
                        className="bg-red-600 focus:ring-red-600 text-white"
                    >
                        {isPending ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.trash className="mr-2 h-4 w-4" />
                        )}
                        <span>Delete</span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}