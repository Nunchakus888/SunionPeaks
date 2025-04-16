import '../styles/globals.css';

export const metadata = {
  title: 'Next Chrome Extension',
  description: 'A Chrome extension built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-screen w-full m-0 text-white purple-gradient-bg">
        {children}
      </body>
    </html>
  );
} 