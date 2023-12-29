"use client";
import exported_tools from "./toolbox/module";
import { ToolMeta } from "@/inlcude/tool_metadata";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const jump = (to: string) => {
  window.location.href = to;
};

function ToolCardBg({ meta }: { meta: ToolMeta }) {
  return (
    <div className="2xl:mb-16 xl:mb-16 sm:mb-1 mb-1 2xl:h-[12.75rem] xl:h-[12.75rem] sm:h-[9.75rem] h-[4.75rem] mx-auto">
      <div
        className="2xl:h-[12rem] 2xl:w-[31rem] xl:h-[12rem] xl:w-[31rem] sm:h-[8rem] sm:w-[8rem] h-[4rem] w-[4rem]
                   bg-gradient-to-b from-[#6366F1]/[0.8] to-[#7073FF]/[0.3] rounded-2xl overflow-hidden"
      ></div>

      <Link
        href={meta.route}
        className="relative 2xl:bottom-[11.25rem] 2xl:right-[1rem] xl:bottom-[11.25rem] xl:right-[1rem] sm:bottom-[7.5rem] sm:right-[0.5rem] bottom-[3.75rem] right-[0.25rem]"
        onClick={() => jump(meta.route)}
      >
        <div
          className="2xl:h-[12rem] 2xl:w-[31rem] xl:h-[12rem] xl:w-[31rem] sm:h-[8rem] sm:w-[8rem] h-[4rem] w-[4rem]
                    backdrop-filter backdrop-blur-md bg-[#EBEBEB]/30 rounded-2xl
                    shadow-[0.25rem_0.25rem_0.5rem_rgba(0,0,0,0.25)] border-4 border-[#EBEBEB]/50
                    ease-in-out duration-300 hover:scale-105" /*bg op 10-20; border stroke 4-6px; border op-30*/
        >
          <div className="">
            <div className="2xl:w-[11.625rem] 2xl:h-[11.625rem] xl:w-[11.625rem] xl:h-[11.625rem] sm:w-[8rem] sm:h-[8rem] w-[4rem] h-[4rem] float-left">
              <Image
                src={meta.icon}
                alt={"icon"}
                width={186}
                height={186}
                className="sm:p-6 drop-shadow-[0rem_0.125rem_0.625rem_rgba(1,6,97,0.25)] xl:w-[11.625rem] xl:h-[11.625rem] sm:w-[7.5rem] sm:h-[7.5rem] w-[3.5rem] h-[3.5rem] p-3"
              ></Image>
            </div>
            <div className=" 2xl:w-[18rem] xl:w-[18rem] lg:w-[18rem] md:w-[18rem] xl:block sm:hidden hidden float-left">
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
const HistoryCard = () => {
  interface HistoryItem {
    tool: string;
    fullName: string;
    query: string;
    time: string;
    dateObj: Date;
  }
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  useEffect(() => {
    // Make sure the `localStorage` be accessed in the browser, not server.
    let names = exported_tools.map((list) => getLastFolderName(list));
    let dict: { [index: string]: string } = {
      "cidr-calculator": "CIDR Calculator",
      ieee754: "Floating Point Number Viewer",
      bintree: "Binary Tree Viewer",
      Function_diagram: "Function diagram",
      "QR-Code": "QR Code",
      "unit-conversion": "Unit Conversion",
      HEX: "HEX Converter",
      "Color-code": "Color Code Converter",
    };

    let items = [];
    for (const name of names) {
      let rawInfo = localStorage.getItem(name);
      if (rawInfo != null) {
        let parsedInfo = JSON.parse(rawInfo);
        let queries = parsedInfo["query"];
        let times = parsedInfo["time"];
        for (let i = 0; i < queries.length; ++i) {
          if (queries[i] === "") continue;
          items.push({
            tool: name,
            fullName: dict[name],
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

    items.sort(
      (first, second) => Number(second.dateObj) - Number(first.dateObj),
    );
    setHistoryItems(items);
  }, []);

  return (
    <div>
      {historyItems.map((event: any, index: number) => (
        <Link
          key={index + "aaaa"}
          href={
            "/toolbox/" +
            historyItems[index]["tool"] +
            "?history=" +
            historyItems[index]["query"]
          }
          onClick={() =>
            jump(
              "/toolbox/" +
                historyItems[index]["tool"] +
                "?history=" +
                historyItems[index]["query"],
            )
          }
        >
          <div
            className="flex bg-[#9C95F0] rounded-xl ease-in-out shadow-md duration-300 hover:bg-[#756AF3] hover:scale-105
                                2xl:h-24 sm:h-24 2xl:mb-3 sm:mb-3 h-24 mb-3"
          >
            <div
              className="m-auto truncate text-amber-50
                                2xl:w-11/12 sm:w-11/12 2xl:h-5/6 sm:h-5/6 w-11/12 h-5/6"
            >
              <div className="text-xl font-bold truncate">
                {historyItems[index]["fullName"]}
              </div>
              <div className="truncate">{historyItems[index]["query"]}</div>
              <div className="text-[#EAEAEA]">
                {historyItems[index]["time"]}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

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
        className="flex rounded-3xl shadow-xl bg-[#CBC6F1] xl:min-h-[53.25rem]
            2xl:mx-16 sm:mx-6 mx-6"
      >
        {/*Dashboard frame*/}
        <div
          className="flex flex-auto justify-around
                2xl:m-10 sm:m-4 2xl:w-10/12 sm:w-10/12 m-4 w-10/12"
        >
          {/*Dashboard-Toolkit*/}
          <div
            className="bg-[#F6E5F9] shadow-lg rounded-3xl
                    xl:w-7/12 md:w-1/4 sm:w-1/3 w-1/3 "
          >
            {/*Toolkit*/}
            <div
              className="justify-start flex-initial w-auto grid grid-flow-row auto-rows-max
                            desktop:grid-cols-2 xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 grid-cols-1
                            2xl:mx-12 xl:mx-4 sm:mx-4 xl:pt-12 md:pt-7 sm:pt-5 mx-4 pt-5 "
            >
              {exported_tools.map((list, idx) => {
                return <ToolCardBg meta={list} key={"card_1" + idx} />;
              })}
            </div>
          </div>
          {/*Dashboard-History*/}
          <div
            className="flex flex-col flex-auto bg-[#E0CAF7] rounded-3xl shadow-lg overflow-y-auto
            2xl:w-1/3 sm:w-1/3 desktop:max-h-[70rem] xl:max-h-[137rem]  sm:max-h-[81.75rem] max-h-[41.25rem] 2xl:ml-24 xl:ml-8 sm:ml-4 ml-4 w-1/3
            scrollbar-thin scrollbar-thumb-[#F2EAF8]/60 scrollbar-track-[#E6D8F3] scrollbar-track-rounded-full hover:scrollbar-thumb-[#D3B8EF]/80 scrollbar-thumb-rounded-full scroll-smooth
"
          >
            {/*History frame*/}
            <div className="md:mx-8 sm:mx-4 md:mt-8 sm:mt-4 md:mb-5 sm:mb-1 mx-4 mt-4 mb-1">
              <div className=""></div>
              <HistoryCard></HistoryCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
