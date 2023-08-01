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


export default function CreateCallCard (card: CardProps)  {
    
    const { toast } = useToast()
    const router = useRouter()
    const { callId } = useCallId();
    const [isCallLoading, setIsCallLoading] = React.useState(false);
    const [showCallDropdown, setShowCallDropdown] = React.useState(false);

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
                onSelect={() => {
                  void createCall();
                  setShowCallDropdown(false);
                  router.push(`/call/${callId}`)
                }}
              >
                Start a call now
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                  onSelect={() => {
                    void createCall();
                    setShowCallDropdown(false);
                  }}
              >
                  Create call for later
              </DropdownMenuItem>
              </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
