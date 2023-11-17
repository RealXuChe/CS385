import Image from "next/image";
import exported_tools from "./toolbox/module";
import {Typography} from "@mui/material";
import {ToolMeta} from "@/inlcude/tool_metadata";
import Link from "next/link";

function ToolCard({meta}: { meta: ToolMeta }) {
    return (
        <div
            className="m-4 transform transition-transform ease-in-out duration-200 hover:scale-105 hover:shadow-lg rounded-3xl border-2 border-gray-300 bg-white dark:bg-gray-800 overflow-hidden cursor-pointer select-none">
            <div className="w-64 h-36 relative bg-amber-50">
                <Image
                    alt="Card image"
                    fill={true}
                    src="/next.svg"
                    style={{
                        aspectRatio: "16/9",
                        objectFit: "cover",
                    }}
                    draggable={false}
                />
            </div>
            <Link href={meta.route}><p className="p-2 text-center">{meta.name}</p></Link>
        </div>
    );
}

export default function Home() {
    return <>
        <Typography variant="h2" className="p-8">Toolkit Dashboard</Typography>
        <div className="flex flex-wrap justify-center bg-gray-100 dark:bg-gray-900">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {
                    exported_tools
                        .map((list, idx) => {
                            return (
                                <ToolCard meta={list} key={"card_1" + idx}/>
                            );
                        })
                }
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
                <ToolCard meta={exported_tools[0]}/>
            </div>
        </div>
    </>;
}
