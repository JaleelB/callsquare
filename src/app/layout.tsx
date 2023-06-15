import ToastProvider from '~/components/toast-provider';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <HMSRoomProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </HMSRoomProvider>
      </body>
    </html>
  );
}