"use client"
import React, { useState } from 'react'
import CardShell, { type CardProps } from './card-shell'
import { useRouter } from 'next/navigation'
import { useCallId } from '~/context/call-id-context';
import { useToast } from './ui/use-toast';


export default function CreateCallCard (card: CardProps)  {
    
    const { toast } = useToast()
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
          callName: callId,
          audio: true,
          video: true,
        }),
      })
    
      if (!response?.ok) {

        setIsCallLoading(false);

        return toast({
            title: "Something went wrong.",
            description: "Your call cannot be created. Please try again.",
            variant: "destructive",
        })

      }
      
      setIsCallLoading(false);
      router.push(`/call/${callId}`)

    }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <CardShell card={card} func={createCall} isLoading={isCallLoading}/>
  )
}
