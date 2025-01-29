import Image from "next/image";
import "./globals.css";
export default function Home() {
  return (
    <div>
 <Image 
      src="/main.png" 
      width={300} 
      height={200} 
      className="MainImage"
    />

    </div>
  );
}
