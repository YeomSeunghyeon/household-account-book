

import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <header>
      <Link href="/" className="HeaderText">염승현님의 가계부</Link>
       <Link href="/page/record" className="HeaderItem">기록</Link>
       <Link href="/page/statistics" className="HeaderItem">통계</Link>
       <Link href="/page/add" className="HeaderItem">추가</Link>
      </header>
      <main> {children}</main> 
      <footer>운영센터 010-1111-2222</footer>
      </body>
    </html>
  );
}
