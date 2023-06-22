"use client"
import { selectIsPeerAudioEnabled, selectIsPeerVideoEnabled, useHMSStore, useVideo } from "@100mslive/react-sdk";
import Avatar from "./avatar";
import { MicOffIcon, MicOnIcon } from "@100mslive/react-icons";

interface PeerProps {
    peer: {
        videoTrack?: string | undefined;
        isLocal: boolean;
        name: string;
        id: string;
    }
}

export default function Peer({ peer }: PeerProps) {

    const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));

    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });
    
    return (
        <div className="relative w-full h-full bg-neutral-800">
            {!isVideoOn ? <Avatar name={peer.name} /> : null}
            <span className="z-10 absolute bottom-4 left-4 text-neutral-500">{peer.name} {peer.isLocal ? "(You)" : ""}</span>
            <video
                ref={videoRef}
                className={`${peer.isLocal ? "scale-x-[-1] object-cover w-full h-full" : ""}`}
                autoPlay
                muted
                playsInline
            />
            
            <span className="
                flex items-center justify-center w-8 h-8 
                rounded-full absolute bottom-4 right-4 
                bg-neutral-900 text-neutral-500"
            >
                {isAudioOn ? <MicOffIcon /> : <MicOnIcon />}
            </span>
        </div>
    );
}
