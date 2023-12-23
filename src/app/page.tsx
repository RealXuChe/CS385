"use client";
import exported_tools from "./toolbox/module";
import { ToolMeta } from "@/inlcude/tool_metadata";
import Link from "next/link";
import Image from "next/image";
import meta from "@/app/toolbox/cidr-calculator/metadata";
import { useEffect } from "react";

function ToolCardBg({ meta }: { meta: ToolMeta }) {
  return (
    <div className="2xl:mb-16 xl:mb-16 lg:mb-16 md:mb-16 sm:mb-16 mb-8 2xl:h-[12.75rem] xl:h-[12.75rem] lg:h-[12.75rem] md:h-[12.75rem] sm:h-[12.75rem] h-[8.75rem] mx-auto">
      <div
        className="2xl:h-[12rem] 2xl:w-[31rem] xl:h-[12rem] xl:w-[31rem] lg:h-[12rem] lg:w-[31rem] md:h-[12rem] md:w-[31rem] sm:h-[12rem] sm:w-[31rem] h-[8rem] w-[20rem]
                   bg-gradient-to-b from-[#6366F1]/[0.8] to-[#7073FF]/[0.3] rounded-2xl overflow-hidden"
      ></div>

      <Link
        href={meta.route}
        className="relative 2xl:bottom-[11.25rem] 2xl:right-[1rem] xl:bottom-[11.25rem] xl:right-[1rem] lg:bottom-[11.25rem] lg:right-[1rem] md:bottom-[11.25rem] md:right-[1rem] sm:bottom-[11.25rem] sm:right-[1rem] bottom-[7.25rem] right-[0.8rem]"
      >
        <div
          className="2xl:h-[12rem] 2xl:w-[31rem] xl:h-[12rem] xl:w-[31rem] lg:h-[12rem] lg:w-[31rem] md:h-[12rem] md:w-[31rem] sm:h-[12rem] sm:w-[31rem] h-[8rem] w-[20rem]
                    backdrop-filter backdrop-blur-md bg-[#EBEBEB]/30 rounded-2xl
                    shadow-[0.25rem_0.25rem_0.5rem_rgba(0,0,0,0.25)] border-4 border-[#EBEBEB]/50
                    ease-in-out duration-300 hover:scale-105" /*bg op 10-20; border stroke 4-6px; border op-30*/
        >
          <div className="">
            <div className="2xl:w-[11.625rem] 2xl:h-[11.625rem] xl:w-[11.625rem] xl:h-[11.625rem] lg:w-[11.625rem] lg:h-[11.625rem] md:w-[11.625rem] md:h-[11.625rem] sm:w-[11.625rem] sm:h-[11.625rem] w-[8rem] h-[8rem] float-left">
              <Image
                src={meta.icon}
                alt={"icon"}
                width={186}
                height={186}
                className="p-6 drop-shadow-[0rem_0.125rem_0.625rem_rgba(1,6,97,0.25)]"
              ></Image>
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

function getLastFolderName(meta: ToolMeta) {
  const normalizedPath = meta.route;
  const segments = normalizedPath.split("/");
  return segments[segments.length - 1];
}
function HistoryCard() {
  let names: string[] = [];
  {
    exported_tools.map((list, idx) => {
      names.push(getLastFolderName(list));
    });
  }
  let historyItems = new Array();
  for (const name of names) {
    let rawInfo = localStorage.getItem(name);
    if (rawInfo != null) {
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      for (let i = 0; i < queries.length; ++i) {
        if (queries[i] == "") continue;
        historyItems.push({
          tool: name,
          query: queries[i],
          time: times[i],
          dateObj: new Date(
            times[i].replace(
              /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
              "$4:$5:$6 $2/$3/$1",
            ),
          ),
        });
      }
    }
  }
  historyItems.sort(function (first, second) {
    return second.dateObj - first.dateObj;
  });

  return (
    <div>
      {historyItems.map((event: any, index: number) => (
        // eslint-disable-next-line react/jsx-key
        <Link
          href={
            "/toolbox/" +
            historyItems[index]["tool"] +
            "?history=" +
            historyItems[index]["query"]
          }
        >
          <div
            className="flex bg-[#9C95F0] rounded-xl ease-in-out shadow-md duration-300 hover:bg-[#756AF3] hover:scale-105
                                2xl:h-24 sm:h-24 2xl:mb-3 sm:mb-3"
          >
            <div
              className="m-auto truncate text-amber-50
                                2xl:w-11/12 sm:w-11/12 2xl:h-5/6 sm:h-5/6 "
            >
              {historyItems[index]["tool"]}
              <br />
              {historyItems[index]["query"]}
              <br />
              {historyItems[index]["time"]}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="rounded-2xl my-7 bg-[#F4F2F4] shadow-[inset_0rem_0.25rem_0.5rem_rgba(0,0,0,0.25)] pb-16">
      {/* title&icon */}
      <div className="flex justify-center py-16">
        <Image src="title.svg" alt={"title"} width={677} height={72}></Image>
      </div>
      {/* search input */}
      <div className="mx-0 flex justify-center">
        {/*<input*/}
        {/*  type="text"*/}
        {/*  className="mx-0 px-4 h-14 rounded-2xl border-4 border-black w-8/12 hover:shadow-lg ease-in-out"*/}
        {/*/>*/}
      </div>
      {/*Dashboard Background*/}
      <div
        className="flex rounded-3xl shadow-xl bg-[#CBC6F1] min-h-[53.25rem]
            2xl:mx-16 sm:mx-16"
      >
        {/*Dashboard frame*/}
        <div
          className="flex flex-auto justify-around
                2xl:m-10 sm:m-10 2xl:w-10/12 sm:w-10/12"
        >
          {/*Dashboard-Toolkit*/}
          <div
            className="bg-[#F6E5F9] shadow-lg rounded-3xl
                    desktop:w-7/12 sm:w-7/12"
          >
            {/*Toolkit*/}
            <div
              className="flex justify-start flex-initial w-auto grid grid-flow-row auto-rows-max
                            desktop:grid-cols-2 xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 grid-cols-1
                            2xl: mx-12 xl:mx-4 2xl:pt-12 sm:pt-12"
            >
              {exported_tools.map((list, idx) => {
                return <ToolCardBg meta={list} key={"card_1" + idx} />;
              })}
            </div>
          </div>
          {/*Dashboard-History*/}
          <div
            className="flex flex-col flex-auto bg-[#E0CAF7] overflow-y-auto overflow-hidden rounded-3xl shadow-lg
                    2xl:w-1/3 sm:w-1/3 desktop:max-h-[53.25rem] xl:max-h-[106.5rem] 2xl:ml-24 xl:ml-8"
          >
            {/*History frame*/}
            <div
              className="flex-auto rounded-3xl
                        2xl:mx-8 sm:mx-8 2xl:mb-5 sm:mb-5 2xl:mt-8 sm:mt-8 "
            >
              <HistoryCard></HistoryCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
