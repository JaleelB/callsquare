import React from 'react';

function Video(_: object, ref: React.Ref<HTMLVideoElement>) {
    return (
        <video 
            ref={ref} 
            className="w-full h-full object-cover -scale-x-1"
            autoPlay 
            muted 
            playsInline 
        />
    );
}

export default React.forwardRef<HTMLVideoElement>(Video);
