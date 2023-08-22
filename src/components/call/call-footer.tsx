/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"; 
import * as React from 'react';
import { useAVToggle, useHMSActions } from '@100mslive/react-sdk';
import {
  MicOffIcon,
  MicOnIcon,
  VideoOffIcon,
  VideoOnIcon,
  HangUpIcon,
  ShareScreenIcon,
} from '@100mslive/react-icons';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { extractId } from '~/lib/extract-id';
import useClipboard from '~/hooks/use-copy';
import { Icons } from '../ui/icons';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import RejoinCall from './rejoin-call';


export default function CallFooter () {

  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();
  const { toast } = useToast()
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const params = useParams();
  const roomId = Cookies.get("room-id");
  const roomName = Cookies.get("room-name");
  const { isCopied, copyToClipboard } = useClipboard();

  const [showRejoinPopup, setShowRejoinPopup] = React.useState(false);

  React.useEffect(() => {

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
          onClick={async() =>{
            await copyToClipboard(window.location.href);
            if(isCopied){
                toast({
                    title: 'Copied to clipboard',
                    description: 'The invite link has been copied to your clipboard.',
                    variant: 'default'
                });
            }
        }}
          className="rounded-full flex justify-center items-center py-6 px-4 bg-neutral-800"
        >
          <Icons.invite color="white" width={20} height={20}/>
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => {
            setShowRejoinPopup(true)
          }}
          className="rounded-full flex justify-center py-6 bg-red-500"
        >
          <HangUpIcon color='white' width={25} height={25} />
        </Button>
      </div>
      {
        showRejoinPopup &&
        <RejoinCall
          roomName={roomName ? roomName : extractId(params.slug as string)}
          stayOnScreenHandler={() => setShowRejoinPopup(false)}
          roomId={roomId as string}
        />
      }
    </footer>
  );
}