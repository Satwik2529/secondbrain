import { Logo } from "../icons/Logo";
import { Twitter } from "../icons/twitter";
import { YouTubeicon } from "../icons/Youtube";
import { Sidebaritem } from "./Sidebaritem";

export function Sidebar(){

  return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0  pl-6">
    <div className="flex text-2xl pt-8 items-center">
       <div className="pr-4  text-purple-600">
       <Logo></Logo>
       </div>
      
        BRAINLY
    </div>
   <div className="pt-8 pl-4">
    <Sidebaritem text="twitter" icon={<Twitter></Twitter>}></Sidebaritem>
    <Sidebaritem text="youtube" icon={<YouTubeicon></YouTubeicon>}></Sidebaritem>
   </div>
  </div>




}