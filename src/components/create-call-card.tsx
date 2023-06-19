"use client"
import React from 'react'
import CardShell, { type CardProps } from './card-shell'
import ToastContext from "~/context/toast-context";
import { useRouter } from 'next/navigation'
import { useCallId } from '~/context/call-id-context';
import { useHMSActions } from "@100mslive/react-sdk";
import { getSession } from 'next-auth/react';

interface RoomCodeResponse {
  code: string;
}

export default function CreateCallCard (card: CardProps)  {
    
    const { addToast } = React.useContext(ToastContext);
    const router = useRouter()
    const { callId } = useCallId();
    const hmsActions = useHMSActions();

    async function createCall() {
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
          return addToast({
              title: "Something went wrong.",
              message: "Your call cannot be created. Please try again.",
              variant: "destructive",
          })
      }

      const roomCodeResponse = await fetch(`/api/call/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callName: callId,
        }),
      })
      const codeResponse: RoomCodeResponse = await roomCodeResponse.json() as RoomCodeResponse;
      const roomCode = codeResponse.code;
      // use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
      const session = await getSession() 

      try {

        if(!session || !session.user.name){
          const userName = session?.user.name as string;
          await hmsActions.join({ userName, authToken });
        }
        return addToast({
          title: "Call created.",
          message: "Your call was successfully created."
        })

      } catch (error) {
        console.error(error)
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
