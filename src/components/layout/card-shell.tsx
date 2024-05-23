"use client";
import React, { type ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    <Card className="h-[230px] w-full rounded-2xl border-2 bg-card/50 p-2">
      <div className="flex h-full w-full flex-col justify-between rounded-xl bg-card shadow-md">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-primary text-secondary">
            {card.icon}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className={`w-fit rounded-full bg-primary text-secondary shadow ${
              isLoading ? "flex gap-3" : ""
            }`}
            onClick={func}
          >
            {card.buttonText}
            {isLoading ? card.loadingIcon : card.buttonIcon}
          </Button>
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-1 text-left text-base font-semibold">
            {card.title}
          </CardTitle>
          <CardDescription className="text-left">
            {card.description}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}
