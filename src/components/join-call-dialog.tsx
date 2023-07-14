/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import React, { useState } from 'react'
import Button from './old-ui/button'
import Checkbox from './old-ui/checkbox';
import { Dialog, DialogHeader, DialogContent, DialogFooter } from './old-ui/dialog';
import Input from './old-ui/input';
import CardShell, { type CardProps } from './card-shell';
import ToastContext from '~/context/toast-context';
import { useRouter } from 'next/navigation';
import { joinCallFormSchema } from '~/schemas/call';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { extractId } from '~/lib/extract-id';
import { Icons } from './old-ui/icons';


type FormData = z.infer<typeof joinCallFormSchema>

export default function JoinCallDialog (card: CardProps)  {

    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [name, setName] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [showJoinDialog, setShowJoinDialog] = useState(false);
    const [isJoinCallLoading, setIsJoinCallLoading] = useState(false);

    const { addToast } = React.useContext(ToastContext);
    const router = useRouter()

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(joinCallFormSchema)
    });

    async function joinCall(data: FormData) {

        setIsJoinCallLoading(true);
        const callName = extractId(data.meetingLink);

        const response = await fetch(`/api/call/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            callName: callName,
            username: name,
          }),
        }).catch(error => {
            console.error('Error during fetch:', error);
          });
      
        
        if (!response?.ok) {
            setIsJoinCallLoading(false);
            return addToast({
                title: "Something went wrong.",
                message: "This call cannot be joined. Please try again.",
                variant: "destructive",
            })
        }
        
        setIsJoinCallLoading(false);
        router.push(`/call/${callName}`)
    }

    return (
        <div>
            <CardShell card={card} func={() => setShowJoinDialog(true)}/>
            <Dialog open={showJoinDialog}>
                <DialogHeader className='mb-6'>Join a call</DialogHeader>
                <DialogContent>
                    <form onSubmit={handleSubmit(joinCall)}>
                        <Input 
                            {...register('name', { required: true })}
                            type="text" 
                            placeholder="Your name (optional)" 
                            className='mb-2'
                            label='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            {...register('meetingLink')}
                            type="url" 
                            placeholder="Meeting link or ID" 
                            className={`${errors.meetingLink ? 'mb-2' : 'mb-4'}`}
                            label='Meeting link'
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                        />
                        {errors.meetingLink && typeof errors.meetingLink.message === 'string' && <p className='mb-4 text-sm text-red-500'>{errors.meetingLink.message}</p>}
                        <Checkbox 
                            checked={audio} 
                            onChange={() => setAudio(!audio)} 
                            label="Don't join with audio" 
                            className='my-2' 
                            disabled={true}
                        />
                        <Checkbox 
                            checked={video} 
                            onChange={() => setVideo(!video)} 
                            label="Turn off my video" 
                            disabled={true}
                        />

                        <DialogFooter className='flex flex-col-reverse md:flex-row mt-6 md:mt-4'>
                            <Button 
                                variant='secondary' 
                                className="rounded-md flex ml-auto w-full md:w-fit" 
                                onClick={() => setShowJoinDialog(false)}
                                disabled={isJoinCallLoading}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type='submit'
                                className='rounded-md mt-2 mb-2 md:mb-0 md:mt-0 md:ml-2 w-full md:w-fit'
                                disabled={isJoinCallLoading}
                            >
                                {isJoinCallLoading && <Icons.spinner color="#fff" width={14} height={14} className='mr-2' />}
                                Join Call
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

