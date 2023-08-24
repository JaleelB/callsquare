"use client"
import { usePathname, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { cn } from "~/lib/utils";
  

export default function PerPageDropdown({
    options,
    selectedPerPage,
    page
}: {
    options: number[],
    selectedPerPage: number,
    page: string,
}) {

    const router = useRouter();
    const pathname = usePathname();

    const handlePerPageChange = (value: string) =>  router.push(`${pathname}?page=${page}&per_page=${value}`);

    return (
        <div className="flex gap-2 items-center">
            <span className="mr-2 text-sm">Rows per page</span>
            <Select onValueChange={handlePerPageChange}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder={selectedPerPage}/>
                </SelectTrigger>
                <SelectContent className={cn("rounded border")}>
                    {options.map((option) => (
                        <SelectItem 
                            key={option} 
                            value={`${option}`}
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
