/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import React from "react";
import { Icons } from "~/components/ui/icons";
import DeleteActionAlert from "../delete-action-alert";

export default function DeleteCallActions({
    callId,
}:{
    callId: string
}) {

    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

    return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger className={cn("cursor-pointer rounded-sm w-8 h-8 inline-flex items-center justify-center hover:bg-accent")}>
                <Icons.ellipsis className="w-5 h-5 text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("mt-1 p-0 shadow-sm bg-white border rounded-sm min-w-[150px]")}>
                <DropdownMenuLabel className={cn("p-1")}>
                    <Button 
                        size="sm"
                        variant="ghost"
                        className={cn("w-full justify-start text-red-500 hover:text-red-500 rounded-sm")}
                        onClick={() => setShowDeleteAlert(true)}
                    >
                        Delete
                    </Button>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
        <DeleteActionAlert
            showDeleteAlert={showDeleteAlert}
            setShowDeleteAlert={setShowDeleteAlert}
            // deleteCall={deleteCall}
            callId={callId}
            title="Are you sure you want to delete this call?"
            description="This action cannot be undone."
        />
    </>

  )
}