import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={'flex flex-col min-h-screen justify-between px-5 md:px-20 py-4 md:py-5'}
      >
        {children}
      </body>
    </html>
  );
}
