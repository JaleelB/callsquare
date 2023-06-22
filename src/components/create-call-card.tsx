"use client"
import React, { useState } from 'react'
import CardShell, { type CardProps } from './card-shell'
import ToastContext from "~/context/toast-context";
import { useRouter } from 'next/navigation'
import { useCallId } from '~/context/call-id-context';
import Cookies from 'js-cookie';


export default function CreateCallCard (card: CardProps)  {
    
    const { addToast } = React.useContext(ToastContext);
    const router = useRouter()
    const { callId } = useCallId();
    const [isCallLoading, setIsCallLoading] = useState(false);

    async function createCall() {

      setIsCallLoading(true);

      const response = await fetch(`/api/call/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: callId,
          audio: true,
          video: true,
        }),
      })
    
      if (!response?.ok) {

        setIsCallLoading(false);

        return addToast({
            title: "Something went wrong.",
            message: "Your call cannot be created. Please try again.",
            variant: "destructive",
        })

      }
      
      Cookies.set("room-name", callId)
      setIsCallLoading(false);
      router.push(`/call/${callId}`)

    }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <CardShell card={card} func={createCall} isLoading={isCallLoading}/>
  )
}
