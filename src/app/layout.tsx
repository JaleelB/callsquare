import ToastProvider from '~/components/toast-provider';
import '../styles/globals.css'
import RoomProvider from '~/components/room-provider';
import CallIdProvider from '~/context/call-id-context';

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
            <ToastProvider>
              {children}
            </ToastProvider>
          </CallIdProvider>
        </RoomProvider>
      </body>
    </html>
  );
}