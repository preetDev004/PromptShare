import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import NextUIP from "@components/NextUIP";
import "@styles/globals.css";

export const metadata = {
  title: "PromptShare",
  description: "Discver & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="../assets/icons/favicon_io/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../assets/icons/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../assets/icons/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../asstes/icons/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="../assets/icons/favicon_io/site.webmanifest" />
      </head>
      <body>
        <Provider>
          <NextUIP>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Navbar /> {/* components to show on all the routes */}
              {children}
            </main>
          </NextUIP>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
