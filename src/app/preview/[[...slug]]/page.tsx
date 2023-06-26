"use client";
import { MicOnIcon, MicOffIcon, VideoOnIcon, VideoOffIcon } from "@100mslive/react-icons";
import { selectLocalPeer, useHMSStore, selectVideoTrackByID, selectIsLocalVideoEnabled } from "@100mslive/react-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import { joinSchema } from "~/schemas/join";
import {
    Avatar,
    Loading,
    StyledVideoTile,
    Video,
} from "@100mslive/react-ui";
import error from "next/error";

type FormData = z.infer<typeof joinSchema> 

export default function CallPreviewPage(){

    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [name, setName] = useState("");

    function onSubmit(){
        return true;
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(joinSchema)
    });
    
    const localPeer = useHMSStore(selectLocalPeer);
    const isVideoOn = useHMSStore(selectIsLocalVideoEnabled);
    const trackSelector = selectVideoTrackByID(localPeer?.videoTrack);
    const mirrorLocalVideo = true;
    const track = useHMSStore(trackSelector);

    return(
        <section className="w-full h-full flex justify-center items-center p-4">
            <div className="w-full flex flex-col items-center justify-center h-[500px] sm:h-[600px]">
                <div className=" relative bg-neutral-600 flex-grow w-full max-w-[650px] h-full m-8 sm:m-4">
                    {localPeer ? (
                        <>
                            <Video
                                mirror={track?.facingMode !== "environment" && mirrorLocalVideo}
                                trackId={localPeer.videoTrack}
                                data-testid="preview_tile"
                            />
                            {!isVideoOn ? (
                                <StyledVideoTile.AvatarContainer>
                                    <Avatar name={name} data-testid="preview_avatar_tile" />
                                    <p>{name}</p>
                                </StyledVideoTile.AvatarContainer>
                            ) : null}
                        </>
                        ) : !error ? (
                            <Loading size={100} />
                        ) : null
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
                        <form className="w-full flex flex-col sm:flex-row gap-2" onSubmit={void handleSubmit(onSubmit)}>
                            <Input 
                                {...register('name')}
                                placeholder="Enter your name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
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