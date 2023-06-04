import { env } from "~/env.mjs";

export function absoluteUrl(path: string) {
    return `${env.NEXT_PUBLIC_APP_URL}${path}`
}