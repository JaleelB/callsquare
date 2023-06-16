"use client"
import React from 'react'
import CardShell, { type CardProps } from './card-shell'
import ToastContext from "~/context/toast-context";
import { useRouter } from 'next/navigation'
import { useCallId } from '~/context/call-id-context';

export default function CreateCallCard (card: CardProps)  {
    
    const { addToast } = React.useContext(ToastContext);
    const router = useRouter()
    const { callId } = useCallId();

    async function createCall() {
        const response = await fetch(`/api/call/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: callId,
          }),
        })
      
        if (!response?.ok) {
            return addToast({
                title: "Something went wrong.",
                message: "Your call cannot be created. Please try again.",
                variant: "destructive",
            })
        }

        // router.push(`/calls/call/${callId}`)
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <CardShell card={card} func={createCall}/>
    )
}
