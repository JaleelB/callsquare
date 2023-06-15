"use client";
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface CallIdValues {
    callId: string;
}

const CallIdContext = createContext<CallIdValues | null>(null);

export default function CallIdProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [callId, setCallId] = useState(uuidv4());

    return (
        <CallIdContext.Provider value={{ callId }}>
            {children}
        </CallIdContext.Provider>
    );
}

export const useCallId = (): CallIdValues => {
    const context = useContext(CallIdContext);
    if (!context) {
      throw new Error('useCallId must be used within a CallIdProvider');
    }
    return context;
};
