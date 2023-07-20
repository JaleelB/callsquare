/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { previewJoinSchema } from "~/schemas/join";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { Icons } from "~/components/ui/icons";
import Link from "next/link";

type FormData = z.infer<typeof previewJoinSchema> 

export default function CallPreviewPage(){

    const router = useRouter();
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(previewJoinSchema)
    });
    const params = useParams();
    const { toast } = useToast();


    async function joinCall(data: FormData){

        try {
    
            const joinResponse = await fetch(`/api/call/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    callName: params.slug,
                    username: data.name,
                }),
            });
    

            if (!joinResponse.ok) {
                throw new Error('Join response not OK');
            }
    
            Cookies.set("username", data.name);
            router.replace(`/call/${params.slug as string}`);

        } catch (error) {
            console.error('Error during fetch:', error);
            toast({
                title: "Something went wrong.",
                description: "This call cannot be joined. Please try again.",
                variant: "destructive",
            });
        }
        
    }
    

    return(
        <section className="w-full max-w-7xl flex justify-center items-center sm:-mt-20 mx-auto">
            <div className="mx-auto flex flex-col gap-8 w-[330px] sm:w-[370px]">
                <div>
                    <Link href="/">
                        <Icons.camera height={49} width={60} className="-ml-3 mb-3"/>
                    </Link>
                    <h1 className="text-2xl font-medium tracking-tight mb-0.5">Ready to join?</h1>
                    <p className="text-muted-foreground">Enter you name to join the video call</p>
                </div>
                <form className="w-full" onSubmit={handleSubmit(joinCall)}>
                    <Input 
                        {...register('name')}
                        placeholder="Enter your name"
                        type="text"
                    />
                    {errors.name && typeof errors.name.message === 'string' && <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>}
                    <Button 
                        size="lg" 
                        type="submit"
                        className="whitespace-nowrap w-full mt-6"
                    >
                        <Icons.join color="white" width={20} height={20} className="mr-2"/>
                        Join Now
                    </Button>
                </form>
            </div>
        </section>
    )
}

