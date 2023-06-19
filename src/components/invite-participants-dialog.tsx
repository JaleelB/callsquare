/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import React, { useState } from 'react'
import Button from './ui/button'
import { Dialog, DialogHeader, DialogContent } from './ui/dialog';
import Input from './ui/input';
import { Icons } from './ui/icons';
import CardShell, { type CardProps } from './card-shell';
import { useForm } from 'react-hook-form';
import { inviteSchema } from '~/schemas/invite';
import { env } from '~/env.mjs';
import { zodResolver } from "@hookform/resolvers/zod";
import ToastContext from "~/context/toast-context";
import { type z } from 'zod';
import { getSession } from 'next-auth/react';
import { useCallId } from '~/context/call-id-context';
import useClipboard from '~/hooks/use-copy';

type FormData = z.infer<typeof inviteSchema>

export default function InviteParticipantsDialog (card: CardProps)  {

    const [showInviteDialog, setShowInviteDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(inviteSchema)
    });
    const { addToast } = React.useContext(ToastContext);
    const { callId } = useCallId();
    const { isCopied, copyToClipboard } = useClipboard();
    

    async function onSubmit(data: FormData){
        setIsLoading(true);
        const currentUser = await getSession();
      
        if (currentUser && typeof data.email === 'string' && typeof currentUser.user.email === 'string' && typeof currentUser.user.name === 'string' && typeof currentUser.user.image === 'string') {
          const recipientUsername = data.email.split('@')[0];
      
          try {

            const response = await fetch('/api/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                recipient: data.email,
                link: `${env.NEXT_PUBLIC_APP_URL}/call/${callId}`,
                recipientUsername,
                senderImage: currentUser.user.image,
                invitedByUsername: currentUser.user.name,
                invitedByEmail: currentUser.user.email,
              }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to send email');
            }
      
            setIsLoading(false);
            return addToast({
                title: 'Invite sent',
                message: 'Your invite has been sent successfully',
                variant: 'default'
            });

          } catch (error) {
            setIsLoading(false);
            return addToast({
              title: 'Error sending invite',
              message: 'There was an error sending your invite. Please try again later.',
              variant: 'destructive'
            });
          }
        }
    }

    async function handleCopy(text: string){

        await copyToClipboard(text);
        if(isCopied){
            addToast({
                title: 'Copied to clipboard',
                message: 'The invite link has been copied to your clipboard.',
                variant: 'default'
            });
        }
    }
      


    return (
        <div>
            <CardShell card={card} func={() => setShowInviteDialog(true)}/>
            <Dialog open={showInviteDialog}>
                <div className='flex items-center justify-between mb-8'>
                    <DialogHeader>Invite participants</DialogHeader>
                    <div 
                        className='w-6 h-6 cursor-pointer grid place-items-center' 
                        onClick={() => setShowInviteDialog(false)}
                    >
                        <Icons.close 
                            className='w-5 h-5' 
                            color="#0F172A"
                        />
                    </div>
                </div>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:flex-row justify-between items-end'>
                            <Input 
                                {...register('email')}
                                type="email" 
                                placeholder="Email address" 
                                required
                                label="Email"
                            />
                            <Button 
                                type="submit"
                                className='rounded-md mt-2 md:mt-0 md:ml-2 w-full md:w-fit whitespace-nowrap'
                                size='lg'
                            >
                                {isLoading && <Icons.spinner width="16" height="16" className='mr-3' color="#fff"/>}
                                Send invite
                            </Button>
                        </div>
                        {errors.email && typeof errors.email.message === 'string' && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
                    </form>
                    
                    <div className='bg-slate-200 w-full h-[1px] my-8'></div>
                    <div className='flex flex-col md:flex-row justify-between items-end mb-2'>
                        <Input 
                            disabled 
                            placeholder={`${env.NEXT_PUBLIC_APP_URL}/calls/call/${callId}`} 
                            required
                            label="Copy invite link"
                        />
                        <Button 
                            variant='secondary' 
                            size='lg'
                            className="rounded-md flex mt-2 md:mt-0 md:ml-2 ml-auto w-full md:w-fit"
                            onClick={() => handleCopy(`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`)}
                        >
                            Copy
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

