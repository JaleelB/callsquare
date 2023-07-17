/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"; 
import React, { useEffect } from 'react';
import { useAVToggle, useHMSActions } from '@100mslive/react-sdk';
import {
  MicOffIcon,
  MicOnIcon,
  VideoOffIcon,
  VideoOnIcon,
  HangUpIcon,
  ShareScreenIcon,
} from '@100mslive/react-icons';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { extractId } from '~/lib/extract-id';
import useClipboard from '~/hooks/use-copy';
import { Icons } from './ui/icons';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';


export default function CallFooter () {

  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();
  const router = useRouter();
  const { toast } = useToast()
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const params = useParams();
  const roomId = Cookies.get("room-id");
  const { isCopied, copyToClipboard } = useClipboard();

  useEffect(() => {

    async function enableScreenShare() {
      if(isScreenShareEnabled){
        try {
          await actions.setScreenShareEnabled(true);
        } catch (error) {
          return toast({
            title: "Something went wrong.",
            description: "Your screen cannot be shared. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        try {
          await actions.setScreenShareEnabled(false);
        } catch (error) {
          return toast({
            title: "Something went wrong.",
            description: "There is an issue disabling screen share. Please try again.",
            variant: "destructive",
          })
        }
      }
    }

    void enableScreenShare();
    
  }, [actions, isScreenShareEnabled, toast])

  async function leaveCall() {
    const roomName = Cookies.get("room-name");
    
    const response = await fetch(`/api/call/leave`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callName: roomName ? roomName : extractId(params.slug as string),
        roomId: roomId,
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
    router.replace("/calls")
  }

  async function handleCopy(text: string){
    await copyToClipboard(text);
    if(isCopied){
        toast({
            title: 'Copied to clipboard',
            description: 'The invite link has been copied to your clipboard.',
            variant: 'default'
        });
    }
}

  return (
    <footer className={`rounded-lg flex items-center mt-auto justify-center sm:justify-start px-5 py-8`}>
      <div className='grid grid-cols-5 gap-3'>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={toggleAudio}
          className="rounded-full flex justify-center items-center bg-neutral-800 py-6 px-4"
        >
          {
            isLocalAudioEnabled ? 
            <MicOnIcon color="white" width={20} height={20}/> 
            : <MicOffIcon color="white" width={20} height={20}/>
          }
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={toggleVideo}
          className="rounded-full flex justify-center items-center py-6 px-4 bg-neutral-800"
        >
          {
            isLocalVideoEnabled ? 
            <VideoOnIcon color="white" width={20} height={20}/> 
            : <VideoOffIcon color="white" width={20} height={20}/>
          }
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={()=> setIsScreenShareEnabled(!isScreenShareEnabled)}
          className="rounded-full flex justify-center items-center py-6 px-4 bg-neutral-800"
        >
          <ShareScreenIcon color="white" width={20} height={20}/>
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={()=> handleCopy(window.location.href)}
          className="rounded-full flex justify-center items-center py-6 px-4 bg-neutral-800"
        >
          <Icons.invite color="white" width={20} height={20}/>
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => leaveCall()}
          className="rounded-full flex justify-center py-6 bg-red-500"
        >
          <HangUpIcon color='white' width={25} height={25} />
        </Button>
      </div>
    </footer>
  );
}