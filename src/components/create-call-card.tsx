"use client"
import React from 'react'
import CardShell, { type CardProps } from './card-shell'

export default function CreateCallCard (card: CardProps)  {

    return (
        <CardShell card={card} func={() => console.log(true)}/>
    )
}
