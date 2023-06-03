import ToastProvider from '~/components/toast-provider';
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
          <ToastProvider>
            {children}
          </ToastProvider>
      </body>
    </html>
  );
}