import { Shareicon } from "../icons/Shareicon";
import { StartIcon } from "../icons/Starticon";
interface CardProps{
    tittle:string;
    link:string;
    type:"twitter"|"youtube"
}
export function Card({tittle,link,type}:CardProps){
return <div>
    <div className="bg-white rounded-md shadow-md border-slate-300 p-8 max-w-72 border min-h-48 min-w-72 ">
      <div className="flex justify-between  items-center" >
        <div className="flex items-center ">
            <div className="text-gray-500 pr-2 text-md">
                 <StartIcon ></StartIcon>
            </div>
            <div className="italic ">
            {tittle}
            </div>
          
         </div>
         <div className="flex items-center" >
            <div className="pr-2 text-gray-500 ">
                <a href={link} target="_blank">
                <Shareicon size="md"></Shareicon>
                </a>
           
            </div>
            
          
        </div>
       
 </div>
    <div className="pt-4">
     {type==="youtube" && <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
     {type==="twitter" &&  <blockquote className="twitter-tweet">
         <a href={link.replace("x.com","twitter.com")}></a> 
          </blockquote>}
     
 </div>
   
</div>
</div>



}