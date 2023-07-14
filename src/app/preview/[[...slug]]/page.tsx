/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { MicOnIcon, MicOffIcon, VideoOnIcon, VideoOffIcon } from "@100mslive/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import Button from "~/components/old-ui/button";
import Input from "~/components/old-ui/input";
import { joinSchema } from "~/schemas/join";
import { useParams, useRouter } from "next/navigation";
import Video from "~/components/old-ui/video";
import React from "react";
import ToastContext from "~/context/toast-context";
import Cookies from "js-cookie";

type FormData = z.infer<typeof joinSchema> 

export default function CallPreviewPage(){

    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const router = useRouter();
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(joinSchema)
    });
    const params = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { addToast } = React.useContext(ToastContext);
    

    useEffect(() => {
        // Request the user's media stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                // If the video ref is set and the stream is available, set the video source
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
    
                // Get all video tracks in the stream
                const videoTracks = stream.getTracks().filter(track => track.kind === 'video');
                // If the video state is false, mute all video tracks
                if (!video) {
                    videoTracks.forEach(track => track.enabled = false);
                } else {
                    // If the video state is true, unmute all video tracks
                    videoTracks.forEach(track => track.enabled = true);
                }
            })
            .catch(err => {
                console.error('Error getting user media:', err);
            });
    }, [video]);
    

    
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
            addToast({
                title: "Something went wrong.",
                message: "This call cannot be joined. Please try again.",
                variant: "destructive",
            });
        }
        
    }
    

    return(
        <section className="w-full h-full flex justify-center items-center p-4">
            <div className="w-full flex flex-col items-center justify-center h-[500px] sm:h-[600px]">
                <div className="relative bg-neutral-600 flex items-center justify-center flex-grow w-full max-w-[650px] h-full m-8 sm:m-4">
                    {!video ? (
                        <p className="text-xl sm:text-2xl md:text-3xl text-white">Camera off</p>
                    ) : 
                        <Video ref={videoRef}/>
                    }
                    <div className="absolute w-full flex justify-start items-center gap-2 bottom-4 pl-4">
                        <Button 
                            size="sm"
                            variant="transparent" 
                            onClick={() => setAudio(!audio)}
                            className="rounded-full flex justify-center items-center border border-white py-6 px-4"
                        >
                            {
                                audio ? 
                                <MicOnIcon color="white" width={20} height={20}/> 
                                : <MicOffIcon color="white" width={20} height={20}/>
                            }
                        </Button>
                        <Button 
                            size="sm"
                            variant="transparent" 
                            onClick={() => setVideo(!video)}
                            className="rounded-full flex justify-center items-center py-6 px-4 border border-white"
                        >
                            {
                                video ? 
                                <VideoOnIcon color="white" width={20} height={20}/> 
                                : <VideoOffIcon color="white" width={20} height={20}/>
                            }
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full sm:w-[480px] m-4">
                    <div className="flex flex-col items-center w-full mb-6">
                        <h1 className="text-2xl sm:text-3xl">Ready to join?</h1>
                        <p className="mt-2 text-sm sm:text-base sm:mt-4">Enter you name to join the conversation</p>
                    </div>
                    <div className="w-full">
                        <form className="w-full flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit(joinCall)}>
                            <Input 
                                {...register('name')}
                                placeholder="Enter your name"
                                type="text"
                            />
                            {errors.name && typeof errors.name.message === 'string' && <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>}
                            <Button 
                                size="lg" 
                                type="submit"
                                className="rounded whitespace-nowrap w-full sm:w-auto sm:mt-0"
                            >
                                Join Now
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

