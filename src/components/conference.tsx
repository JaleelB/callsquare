"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./ui/peer";

export default function Conference() {
    const peers = useHMSStore(selectPeers);

    return (
        <div className="w-full h-[85%] flex flex-grow items-center pt-24">
            {peers.map((peer) => (
                <Peer key={peer.id} peer={peer} />
            ))}
        </div>
    );
}
