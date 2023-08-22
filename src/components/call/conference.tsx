"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "../ui/peer";
import { Icons } from "../ui/icons";

export default function Conference() {
    const peers = useHMSStore(selectPeers);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (peers.length > 0) {
            setLoading(false);
        }
    }, [peers]);

    return (
        <div className="w-full conference pt-4">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center gap-4">
                        <Icons.spinner color="#fff" width={18} height={18} />
                        <p className="text-lg sm:text-xl">Loading...</p>
                    </div>
                    
                </div>
            ) : (
                peers.map((peer) => <Peer key={peer.id} peer={peer} />)
            )}
        </div>
    );
}
