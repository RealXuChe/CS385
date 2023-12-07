import exported_tools from "./toolbox/module";
import { ToolMeta } from "@/inlcude/tool_metadata";
import Link from "next/link";

function ToolCardBg({ meta }: { meta: ToolMeta }) {
  return (
    <div className="mb-16 mx-auto h-[12.75rem]">
      <div className="h-[12rem] w-[31rem] bg-gradient-to-b from-[#6366F1]/[0.8] to-[#7073FF]/[0.3] rounded-2xl overflow-hidden "></div>
      <Link
        href={meta.route}
        className="relative bottom-[11.25rem] right-[1rem] "
      >
        <div
          className="h-[12rem] w-[31rem] backdrop-filter backdrop-blur-md bg-[#EBEBEB]/60 rounded-2xl 
                shadow-[0.25rem_0.25rem_0.5rem_rgba(0,0,0,0.25)] border-4 border-[#EBEBEB]/50
                ease-in-out duration-300 hover:scale-105" /*bg 透明度 10-20; border 粗细 4-6px; border 透明度20-30*/
        >
          <div className="">
            <div className="w-[11.625rem] h-[11.625rem] float-left">
              <img
                src={meta.icon}
                alt="icon"
                className="p-6 drop-shadow-[0rem_0.125rem_0.625rem_rgba(1,6,97,0.25)]"
              />
            </div>
            <div className="w-[18rem] float-left">
              <p className="ml-[2rem] mt-[1.76rem] text-[1.625rem] font-semibold text-[#FFFBF5] drop-shadow-[0.125rem_0.125rem_0.125rem_rgba(1,6,97,0.25)]">
                {meta.name}
              </p>
              <br></br>
              <p className="ml-[2rem] text-[#FFFBF5] font-normal text-[1.19rem]  drop-shadow-[0.125rem_0.125rem_0.125rem_rgba(1,6,97,0.25)]">
                {meta.introduction}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/*<Typography variant="h2" className="p-8" >Toolkit Dashboard</Typography>*/}
      {/* innner shadow frame */}
      <div className="rounded-2xl h-screen my-7 bg-[#F4F2F4] shadow-[inset_0rem_0.25rem_0.5rem_rgba(0,0,0,0.25)]">
        {/* title&icon */}
        <div className="flex justify-center py-16">
          <img src="title.svg" alt="tittle" />
        </div>
        {/* search input */}
        <div className="mx-0 flex justify-center">
          <input
            type="text"
            className="mx-0 px-4 h-14 rounded-2xl border-4 border-black w-8/12 hover:shadow-lg ease-in-out"
          />
        </div>
        <div className="mx-auto pt-12 w-auto grid grid-flow-row auto-rows-max xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center"></div>
        {/* Toolkit */}
        <div className="mx-12  pt-12 grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center">
          {exported_tools.map((list, idx) => {
            return <ToolCardBg meta={list} key={"card_1" + idx} />;
          })}
          {/* <ToolCardBg4 meta={exported_tools[0]} /> */}
        </div>
      </div>
    </>
  );
}
