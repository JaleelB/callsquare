import ToastProvider from '~/components/toast-provider';
import '../styles/globals.css'
import RoomProvider from '~/components/room-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <RoomProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </RoomProvider>
      </body>
    </html>
  );
}