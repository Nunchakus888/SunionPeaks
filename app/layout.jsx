import '../styles/globals.css';
import '../styles/chrome-extension.css';

export const metadata = {
  title: 'Boss直聘助手',
  description: 'A Chrome extension for Boss recruitment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          {`
            html, body {
              height: 100% !important;
              min-height: 1000px !important;
              width: 100% !important;
              min-width: 1000px !important;
              margin: 0;
              padding: 0;
              overflow: auto !important;
            }
            
            #__next, main {
              height: 100% !important;
              min-height: 1000px !important;
              width: 100% !important;
              min-width: 1000px !important;
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
      </head>
      <body className="h-screen w-full m-0 text-white min-h-[1000px] min-w-[1000px]">
        {children}
      </body>
    </html>
  );
} 