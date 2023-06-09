"use client"
import React, { useState } from 'react'
import Button from './ui/button'
import { Dialog, DialogHeader, DialogContent } from './ui/dialog';
import Input from './ui/input';
import { Icons } from './ui/icons';
import CardShell, { type CardProps } from './card-shell';


export default function InviteParticipantsDialog (card: CardProps)  {

    const [showInviteDialog, setShowInviteDialog] = useState(false);

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
                    <form>
                        <div className='flex flex-col md:flex-row justify-between items-end'>
                            <Input 
                                type="email" 
                                placeholder="Email address" 
                                required
                                label="Email"
                            />
                            <Button 
                                className='rounded-md mt-2 md:mt-0 md:ml-2 w-full md:w-fit whitespace-nowrap'
                                size='lg'
                            >
                                Send Invite
                            </Button>
                        </div>
                        <p className='text-slate-500 text-[13px] mt-1'>You can enter multiple email address by separating them with commas</p>
                    </form>
                    
                    <div className='bg-slate-200 w-full h-[1px] my-8'></div>
                    <div className='flex flex-col md:flex-row justify-between items-end mb-2'>
                        <Input 
                            disabled 
                            placeholder="fenfaebfjgnkagka gld nglkmdsngl" 
                            required
                            label="Copy invite link"
                        />
                        <Button 
                            variant='secondary' 
                            size='lg'
                            className="rounded-md flex mt-2 md:mt-0 md:ml-2 ml-auto w-full md:w-fit"
                        >
                            Copy
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

