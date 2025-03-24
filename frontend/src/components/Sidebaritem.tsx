import { ReactElement } from "react";

export function Sidebaritem({text,icon}:{text:string,icon:ReactElement}){
return <div className="flex items-center text-grey-800 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4">
    <div className="pr-2">{icon}</div>
    <div >{text}</div>
</div>


}