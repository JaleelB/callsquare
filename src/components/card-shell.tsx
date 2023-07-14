"use client"
import React, { type ReactNode } from 'react'
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export interface CardProps {
    title: string;
    description: string;
    icon: ReactNode;
    buttonText: string;
    buttonIcon: ReactNode;
    loadingIcon: ReactNode;
}

export interface CardShellProps {
    card: CardProps;
    isLoading?: boolean;  
    func?: () => void;
}

export default function CardShell({ card, isLoading, func }: CardShellProps) {
  return (
    <Card className="w-full h-[230px] rounded-2xl bg-neutral-50 border-2 border-zinc-100 p-2">
        <div className='w-full h-full rounded-xl shadow-md flex flex-col justify-between bg-white'>
            <CardHeader className="flex flex-row justify-between">
                <div className="w-[50px] h-[50px] flex items-center justify-center bg-slate-900 rounded-md">
                    {card.icon}
                </div>
                <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`shadow w-fit rounded-full ${isLoading ? 'flex gap-3' : ''}`}
                    onClick={func}
                >
                    {card.buttonText}
                    {isLoading ? card.loadingIcon : card.buttonIcon}
                </Button>
            </CardHeader>
            <CardContent>
                <CardTitle className='mb-1 text-left font-semibold text-base'>{card.title}</CardTitle>
                <CardDescription className='text-left'>{card.description}</CardDescription>
            </CardContent>
        </div>
    </Card>
  )
}

