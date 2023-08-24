"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button"
import { Icons } from "../ui/icons"

export default function CallHistoryPagination({
    page,
    per_page,
    totalPages,
}:{
    page: string,
    per_page: string,
    totalPages: number,
}){

    const router = useRouter();
    const currentPage = parseInt(page, 10);
    
    return (
        <div className="flex gap-2">
            <Button
                size="icon"
                variant="outline" 
                disabled={currentPage <= 1}
                onClick={() => router.push(`/calls/history?page=${currentPage - 1}&per_page=${per_page}`)}
            >
                <Icons.chevronLeft className="w-4 h-4"/>
            </Button>
            <Button
                size="icon"
                variant="outline" 
                disabled={currentPage >= totalPages}
                onClick={() => router.push(`/calls/history?page=${currentPage + 1}&per_page=${per_page}`)}
            >
                <Icons.chevronRight className="w-4 h-4"/>
            </Button>
        </div>
    )
}