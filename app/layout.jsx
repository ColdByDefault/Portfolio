import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";


export const metadata = {
  title: "ColdByDefault",
  description: "Portfolio and beRich.Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
