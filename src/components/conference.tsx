"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./old-ui/peer";

export default function Conference() {
    const peers = useHMSStore(selectPeers);

    return (
        <div className="w-full conference pt-4">
            {peers.map((peer) => (
                <Peer key={peer.id} peer={peer} />
            ))}
        </div>
    );
}
