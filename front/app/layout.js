
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <header>
        염승현님의 가계부 
      </header>
      <main> {children}</main> 
      <footer>발아파</footer>
      </body>
    </html>
  );
}
