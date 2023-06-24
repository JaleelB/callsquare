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
import Button from './ui/button';
import { useRouter } from 'next/navigation';
import ToastContext from '~/context/toast-context';


export default function CallFooter () {

  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();
  const router = useRouter();
  const { addToast } = React.useContext(ToastContext);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

  useEffect(() => {

    async function enableScreenShare() {
      if(isScreenShareEnabled){
        try {
          await actions.setScreenShareEnabled(true);
        } catch (error) {
          return addToast({
            title: "Something went wrong.",
            message: "Your screen cannot be shared. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        try {
          await actions.setScreenShareEnabled(false);
        } catch (error) {
          return addToast({
            title: "Something went wrong.",
            message: "There is an issue disabling screen share. Please try again.",
            variant: "destructive",
          })
        }
      }
    }

    void enableScreenShare();
    
  }, [actions, addToast, isScreenShareEnabled])

  async function leaveCall() {
    
    const response = await fetch(`/api/call/leave`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if(!response.ok){
      addToast({
        title: "Something went wrong.",
        message: "Your call cannot be left. Please try again.",
        variant: "destructive",
      })
    } 
    
    await actions.leave();
    router.push("/calls")
  }

  return (
    <footer className={`rounded-lg flex items-center mt-auto justify-start px-5 py-8`}>
      <div className='grid grid-flow-col gap-3'>
        <Button 
          size="sm"
          variant="transparent" 
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
          variant="transparent" 
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
          variant="transparent" 
          onClick={()=> setIsScreenShareEnabled(!isScreenShareEnabled)}
          className="rounded-full flex justify-center items-center py-6 px-4 bg-neutral-800"
        >
          <ShareScreenIcon color="white" width={20} height={20}/>
        </Button>
        <Button 
          size="sm"
          variant="transparent" 
          onClick={() => void leaveCall()}
          className="rounded-full flex justify-center py-6 bg-red-500"
        >
          <HangUpIcon color='white' width={25} height={25} />
        </Button>
      </div>
    </footer>
  );
}