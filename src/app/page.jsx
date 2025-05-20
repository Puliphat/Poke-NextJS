import Image from "next/image";
import Header from "./components/Header";
import PokeData from "./components/PokeData";

export default function Home() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
     <div className="container mx-auto px-4 py-4">
       <Header />
       <div>
         <PokeData />
       </div>
     </div>
   </div>
  );
}
