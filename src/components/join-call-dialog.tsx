"use client"
import React, { useState } from 'react'
import Button from './ui/button'
import Checkbox from './ui/checkbox';
import { Dialog, DialogHeader, DialogContent, DialogFooter } from './ui/dialog';
import Input from './ui/input';
import CardShell, { type CardProps } from './card-shell';

export default function JoinCallDialog (card: CardProps)  {

    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [showJoinDialog, setShowJoinDialog] = useState(false);

    return (
        <div>
            <CardShell card={card} func={() => setShowJoinDialog(true)}/>
            <Dialog open={showJoinDialog}>
                <DialogHeader className='mb-6'>Join a call</DialogHeader>
                <DialogContent>
                    <Input 
                        type="text" 
                        placeholder="Your name (optional)" 
                        className='mb-2'
                        label='Name'
                    />
                    <Input 
                        type="text" 
                        placeholder="Meeting link or ID" 
                        required 
                        className='mb-4'
                        label='Meeting link or ID'
                    />
                    <Checkbox checked={audio} onChange={() => setAudio(!audio)} label="Don't join with audio" className='my-2' />
                    <Checkbox checked={video} onChange={() => setVideo(!video)} label="Turn off my video" />
                </DialogContent>
                <DialogFooter className='flex flex-col-reverse md:flex-row mt-6 md:mt-4'>
                    <Button 
                        variant='secondary' 
                        className="rounded-md flex ml-auto w-full md:w-fit" 
                        onClick={() => setShowJoinDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button className='rounded-md mt-2 mb-2 md:mb-0 md:mt-0 md:ml-2 w-full md:w-fit'>Join Call</Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

