import '../styles/globals.css';

export const metadata = {
  title: 'Boss直聘助手',
  description: 'A Chrome extension for Boss recruitment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-screen w-full m-0 text-white min-w-[436px]">
        {children}
      </body>
    </html>
  );
} 