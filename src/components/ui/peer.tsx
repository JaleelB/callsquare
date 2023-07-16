"use client"
import { selectIsPeerVideoEnabled, useHMSStore, useVideo } from "@100mslive/react-sdk";
import Avatar from "./avatar";

interface PeerProps {
    peer: {
        videoTrack?: string | undefined;
        isLocal: boolean;
        name: string;
        id: string;
    }
}

export default function Peer({ peer }: PeerProps) {

    const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));

    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });

    
    return (
        <div className="relative w-full h-full rounded-md overflow-hidden">
            {!isVideoOn ? <Avatar name={peer.name} /> : null}
            <span className="z-10 absolute bottom-4 left-4 text-neutral-200 text-sm">{peer.name} {peer.isLocal ? "(You)" : ""}</span>
            <video
                ref={videoRef}
                className="scale-x-[-1] object-contain w-full h-full rounded-md"
                autoPlay
                muted
                playsInline
            />
        </div>
    );
}
