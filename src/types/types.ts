export type RoomCodeResponse = {
    code: string;
}

export type EmailProps = {
    recipient: string, 
    link: string, 
    recipientUsername: string, 
    senderImage: string, 
    invitedByUsername: string, 
    invitedByEmail: string
}