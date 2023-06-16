/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import React, { useState } from 'react'
import Button from './ui/button'
import Checkbox from './ui/checkbox';
import { Dialog, DialogHeader, DialogContent, DialogFooter } from './ui/dialog';
import Input from './ui/input';
import CardShell, { type CardProps } from './card-shell';
import ToastContext from '~/context/toast-context';
import { useRouter } from 'next/navigation';
import { useCallId } from '~/context/call-id-context';

export default function JoinCallDialog (card: CardProps)  {

    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [name, setName] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [showJoinDialog, setShowJoinDialog] = useState(false);

    const { addToast } = React.useContext(ToastContext);
    const router = useRouter()
    const { callId } = useCallId();

    async function joinCall() {
        const response = await fetch(`/api/call/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: callId,
            name: name,
            audio: audio,
            video: video,
          }),
        })
      
        console.log(response)
        if (!response?.ok) {
            return addToast({
                title: "Something went wrong.",
                message: "This call cannot be joined. Please try again.",
                variant: "destructive",
            })
        }

        router.push(`/calls/call/${callId}`)
    }

    return (
        <div>
            <CardShell card={card} func={() => setShowJoinDialog(true)}/>
            <Dialog open={showJoinDialog}>
                <DialogHeader className='mb-6'>Join a call</DialogHeader>
                <DialogContent>
                    <form>
                        <Input 
                            type="text" 
                            placeholder="Your name (optional)" 
                            className='mb-2'
                            label='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            type="text" 
                            placeholder="Meeting link or ID" 
                            required 
                            className='mb-4'
                            label='Meeting link'
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                        />
                        <Checkbox checked={audio} onChange={() => setAudio(!audio)} label="Don't join with audio" className='my-2' />
                        <Checkbox checked={video} onChange={() => setVideo(!video)} label="Turn off my video" />
                    </form>
                </DialogContent>
                <DialogFooter className='flex flex-col-reverse md:flex-row mt-6 md:mt-4'>
                    <Button 
                        variant='secondary' 
                        className="rounded-md flex ml-auto w-full md:w-fit" 
                        onClick={() => setShowJoinDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type='submit'
                        onClick={joinCall}
                        className='rounded-md mt-2 mb-2 md:mb-0 md:mt-0 md:ml-2 w-full md:w-fit'
                    >
                        Join Call
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

