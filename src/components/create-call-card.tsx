/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import React from 'react'
import CardShell, { type CardProps } from './card-shell'
import { useRouter } from 'next/navigation'
import { useCallId } from '~/context/call-id-context';
import { useToast } from './ui/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger, 
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { cn } from '~/lib/utils';
import { Icons } from './ui/icons';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { env } from '~/env.mjs';
import useClipboard from '~/hooks/use-copy';


export default function CreateCallCard (card: CardProps)  {
    
    const { toast } = useToast()
    const router = useRouter()
    const { callId } = useCallId();
    const [isCallLoading, setIsCallLoading] = React.useState(false);
    const [showCallDropdown, setShowCallDropdown] = React.useState(false);
    const [showCallLinkDialog, setShowCallLinkDialog] = React.useState(false);
    const { isCopied, copyToClipboard } = useClipboard();

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

        toast({
            title: "Something went wrong.",
            description: "Your call cannot be created. Please try again.",
            variant: "destructive",
        })

      }
      
      setIsCallLoading(false);
    }

  return (
    <div className='relative'>
      <CardShell  
        card={card} 
        func={() => setShowCallDropdown(true)} 
        isLoading={isCallLoading}
      />
      <DropdownMenu open={showCallDropdown} onOpenChange={setShowCallDropdown}>
        <DropdownMenuTrigger 
          asChild
          className='absolute top-10 right-7'
        >
          <Button variant="ghost" className={cn('invisible hover:bg-transparent gap-3')}>
            Create
            <Icons.add color="#0F172A" className="ml-2" width={16} height={16} />
          </Button>
        </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onSelect={async() => {
                  await createCall();
                  setShowCallDropdown(false);
                  router.push(`/call/${callId}`)
                }}
              >
                Start a call now
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                  onSelect={async () => {
                    await createCall();
                    setShowCallDropdown(false);
                    setShowCallLinkDialog(true);
                  }}
              >
                  Create call for later
              </DropdownMenuItem>
              </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={showCallLinkDialog} onOpenChange={setShowCallLinkDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Here is the link to your meeting</DialogTitle>
                <DialogDescription>
                This link is your gateway to connect with your guests at the appointed time. Make sure to copy and 
                save this link, as you&nbsp;ll need it to join the call too.
                </DialogDescription>
            </DialogHeader>
            <div className='w-full flex flex-col justify-between items-end mb-2'>
              <div className='w-full space-y-1 my-4'>
                  <Label htmlFor="link">Call Link</Label>
                  <Input 
                      disabled 
                      placeholder={`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`} 
                      required
                      id="link"
                      className={cn('w-full border-ring')}
                  />
              </div>
              <Button 
                  size='lg'
                  className="rounded-md font-normal flex mt-2 md:mt-0 md:ml-2 ml-auto w-full md:w-fit"
                  onClick={async() =>{
                    await copyToClipboard(`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`);
                    if(isCopied){
                        toast({
                            title: 'Copied to clipboard',
                            description: 'The invite link has been copied to your clipboard.',
                            variant: 'default'
                        });
                    }
                }}
              >
                  Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}
