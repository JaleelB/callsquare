"use client"
import React, { type ReactNode } from 'react'
import Button from './ui/button';
import { CardContainer, CardHeader, CardContent, CardTitle, CardDescription } from './ui/card';

export interface CardProps {
    title: string;
    description: string;
    icon: ReactNode;
    buttonText: string;
    buttonIcon: ReactNode;
}

export interface CardShellProps {
    card: CardProps;
    func: () => void;
}

export default function CardShell({ card, func }: CardShellProps) {
  return (
    <CardContainer className="w-full h-[230px]">
        <CardHeader className="flex justify-between">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-slate-900 rounded-md">
                {card.icon}
            </div>
            <Button 
                size="sm" 
                variant="transparent" 
                className="shadow rounded-full"
                onClick={func}
            >
                {card.buttonText}
                {card.buttonIcon}
            </Button>
        </CardHeader>
        <CardContent>
            <CardTitle className='mb-1'>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
        </CardContent>
    </CardContainer>
  )
}

