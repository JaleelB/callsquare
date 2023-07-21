import '../styles/globals.css'
import RoomProvider from '~/components/room-provider';
import CallIdProvider from '~/context/call-id-context';
import { Toaster } from '~/components/ui/toaster';
import { siteConfig } from '~/config/site-config';


export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Video Conferencing",
    "Virtual Collaboration",
    "Web Meetings",
    "Video Chat",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Group Video Calls",
  ],
  authors: [
    {
      name: "jaleelb",
      url: "https://jaleelbennett.com",
    },
  ],
  creator: "jaleelb",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@jal_eelll",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <RoomProvider>
          <CallIdProvider>
            {children}
            <Toaster/>
          </CallIdProvider>
        </RoomProvider>
      </body>
    </html>
  );
}