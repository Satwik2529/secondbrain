import { useRef, useState } from "react";
import { CrossIcon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const tittleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const tittle = tittleRef.current?.value;
        console.log(tittle);
        const link = linkRef.current?.value;
        await axios.post(
            `${BACKEND_URL}/api/v1/content`,
            { link, tittle, type },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        onClose();
    }

    return (
        <div>
            {open && (
                <div>
                    <div className="w-screen h-screen bg-slate-100 fixed top-0 left-0 opacity-90 flex justify-center"></div>
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded">
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon></CrossIcon>
                                    </div>
                                </div>
                                <div>
                                    <Input reference={tittleRef} placeholder={"tittle"}></Input>
                                    <Input reference={linkRef} placeholder={"link"}></Input>
                                    
                                </div>
                                <div>
                                    <h1>Type</h1>
                                    <div className="flex gap-1 pl-4">
                                        <Button size="md"
                                            onClick={() => {
                                                setType(ContentType.Youtube);
                                            }}
                                            text="Youtube"
                                            varient={type === ContentType.Youtube ? "primary" : "secondary"}
                                        ></Button>
                                        <Button size="md"
                                            onClick={() => {
                                                setType(ContentType.Twitter);
                                            }}
                                            text="Twitter"
                                            varient={type === ContentType.Twitter ? "primary" : "secondary"}
                                        ></Button>
                                    </div>
                                </div>
                                <center>
                                    <Button onClick={addContent} varient="primary" text="submit" size="md"></Button>
                                </center>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
