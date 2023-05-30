import ToastProvider from '~/components/toast-provider';
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-zinc-50'>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}