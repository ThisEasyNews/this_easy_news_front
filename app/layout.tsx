import './globals.css';
import MainLayout from './_components/MainLayout';

export const metadata = {
  title: 'This Easy News',
  description: 'AI Powered News Summary',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}