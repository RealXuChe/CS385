import exported_tools from "./toolbox/module";
import { ToolMeta } from "@/inlcude/tool_metadata";
import Link from "next/link";

function ToolCardBg({ meta }: { meta: ToolMeta }) {
  return (
    <div className="mb-16 mx-auto h-[12.75rem]">
      <div
        className="2xl:h-[12rem] 2xl:w-[31rem] xl:h-[12rem] xl:w-[31rem] lg:h-[12rem] lg:w-[31rem] md:h-[12rem] md:w-[31rem] sm:h-[12rem] sm:w-[31rem] h-[8rem] w-[20rem]
                   bg-gradient-to-b from-[#6366F1]/[0.8] to-[#7073FF]/[0.3] rounded-2xl overflow-hidden"
      ></div>

      <Link
        href={meta.route}
        className="relative 2xl:bottom-[11.25rem] 2xl:right-[1rem] xl:bottom-[11.25rem] xl:right-[1rem] lg:bottom-[11.25rem] lg:right-[1rem] md:bottom-[11.25rem] md:right-[1rem] sm:bottom-[11.25rem] sm:right-[1rem] bottom-[9rem] right-[1rem]"
      >
        <div
          className="2xl:h-[12rem] 2xl:w-[31rem] xl:h-[12rem] xl:w-[31rem] lg:h-[12rem] lg:w-[31rem] md:h-[12rem] md:w-[31rem] sm:h-[12rem] sm:w-[31rem] h-[8rem] w-[20rem]
                    backdrop-filter backdrop-blur-md bg-[#EBEBEB]/60 rounded-2xl
                    shadow-[0.25rem_0.25rem_0.5rem_rgba(0,0,0,0.25)] border-4 border-[#EBEBEB]/50
                    ease-in-out duration-300 hover:scale-105" /*bg op 10-20; border stroke 4-6px; border op-30*/
        >
          <div className="">
            <div className="2xl:w-[11.625rem] 2xl:h-[11.625rem] xl:w-[11.625rem] xl:h-[11.625rem] lg:w-[11.625rem] lg:h-[11.625rem] md:w-[11.625rem] md:h-[11.625rem] sm:w-[11.625rem] sm:h-[11.625rem] w-[8rem] h-[8rem] float-left">
              <img
                src={meta.icon}
                alt="icon"
                className="p-6 drop-shadow-[0rem_0.125rem_0.625rem_rgba(1,6,97,0.25)]"
              />
            </div>
            <div className=" 2xl:w-[18rem] xl:w-[18rem] lg:w-[18rem] md:w-[18rem] sm:w-[18rem] w-[10rem] float-left">
              <p
                className="2xl:ml-[2rem] 2xl:mt-[1.76rem] 2xl:text-[1.625rem] xl:ml-[2rem] xl:mt-[1.76rem] xl:text-[1.625rem] lg:ml-[2rem] lg:mt-[1.76rem] lg:text-[1.625rem] md:ml-[2rem] md:mt-[1.76rem] md:text-[1.625rem] sm:ml-[2rem] sm:mt-[1.76rem] sm:text-[1.625rem] ml-[1rem] mt-[0.75rem] text-[1rem]
              font-semibold text-[#FFFBF5] drop-shadow-[0.125rem_0.125rem_0.125rem_rgba(1,6,97,0.25)]"
              >
                {meta.name}
              </p>
              <br></br>
              <p
                className="2xl:ml-[2rem] 2xl:text-[1.19rem] xl:ml-[2rem] xl:text-[1.19rem] lg:ml-[2rem] lg:text-[1.19rem] md:ml-[2rem] md:text-[1.19rem] sm:ml-[2rem] sm:text-[1.19rem] ml-[1rem] text-[0.75rem]
              text-[#FFFBF5] font-normal drop-shadow-[0.125rem_0.125rem_0.125rem_rgba(1,6,97,0.25)]"
              >
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
    <div className="rounded-2xl my-7 bg-[#F4F2F4] shadow-[inset_0rem_0.25rem_0.5rem_rgba(0,0,0,0.25)]">
      {/* title&icon */}
      <div className="flex justify-center py-16">
        <img src="title.svg" alt="title" />
      </div>
      {/* search input */}
      <div className="mx-0 flex justify-center">
        <input
          type="text"
          className="mx-0 px-4 h-14 rounded-2xl border-4 border-black w-8/12 hover:shadow-lg ease-in-out"
        />
      </div>
      <div className="mx-auto pt-12 w-auto grid grid-flow-row auto-rows-max xl:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center"></div>
      {/* Toolkit */}
      <div className="mx-12  pt-12 w-auto grid grid-flow-row auto-rows-max 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-center">
        {exported_tools.map((list, idx) => {
          return <ToolCardBg meta={list} key={"card_1" + idx} />;
        })}
      </div>
    </div>
  );
}
