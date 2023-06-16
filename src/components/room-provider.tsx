"use client";
import { HMSRoomProvider } from '@100mslive/react-sdk';
import React from 'react'


export default function RoomProvider({
    children,
}: {
    children: React.ReactNode;
}){
    return (
        <HMSRoomProvider>
            {children}
        </HMSRoomProvider>
    )
}
