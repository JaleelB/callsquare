import '../styles/globals.css'
import RoomProvider from '~/components/room-provider';
import CallIdProvider from '~/context/call-id-context';
import { Toaster } from '~/components/ui/toaster';

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