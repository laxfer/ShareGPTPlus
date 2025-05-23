import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Twitter from "@/components/shared/icons/twitter";
import Layout from "@/components/layout";
import ConvoCard from "@/components/explore/convo-card";
import { ConversationMeta } from "@/lib/types";
import { getConvos } from "@/lib/api";
import { ChevronDown, Search } from "lucide-react";
import Popover from "@/components/shared/popover";
import { useState } from "react";

export default function Home({
  totalConvos,
  topConvos,
}: {
  totalConvos: number;
  topConvos: ConversationMeta[];
}) {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Layout>
      <div className="flex flex-col items-center py-28 bg-gray-50">
        <div className="flex flex-col items-center space-y-8 text-center mx-5 sm:mx-auto">
          <h1 className="font-display tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
            ShareGPT
          </h1>
          <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
            一键分享你最疯狂的 ChatGPT 对话。
            <br />目前已分享
            {" "}<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {Intl.NumberFormat("en-us").format(totalConvos)}
            </span>{" "}
            个对话。
          </p>
          <div className="flex flex-col sm:flex-row">
            <div className="flex justify-center items-center mb-3 sm:mr-3 sm:mb-0 rounded-lg bg-[#232c67] md:bg-indigo-500 text-white shadow-md">
              <a
                className="hidden md:flex space-x-3 justify-center items-center px-5 py-3 border-r-2 border-white/25 font-medium md:hover:bg-indigo-600 transition-all rounded-l-lg"
                href="/extension"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="Chrome logo"
                  src="/chrome.svg"
                  width={20}
                  height={20}
                />
                <p>安装Chrome扩展</p>
              </a>
              <a
                className="flex md:hidden space-x-3 justify-center items-center px-5 py-3 border-r-2 border-white/25 font-medium md:hover:bg-indigo-600 transition-all rounded-l-lg"
                href="/shortcut"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="iOS Shortcuts logo"
                  src="/shortcut.svg"
                  width={20}
                  height={20}
                  className="border-2 border-white/25 rounded-md"
                />
                <p>添加iOS快捷指令</p>
              </a>
              <Popover
                content={
                  <div className="grid w-full md:w-[14.5rem] p-2">
                    <a
                      href="/extension"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex space-x-3 items-center px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-all"
                    >
                      <Image
                        alt="Chrome logo"
                        src="/chrome.svg"
                        width={20}
                        height={20}
                      />
                      <p>安装Chrome扩展</p>
                    </a>
                    <a
                      href="/shortcut"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex space-x-3 items-center px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-all"
                    >
                      <Image
                        alt="iOS Shortcut logo"
                        src="/shortcut.svg"
                        width={20}
                        height={20}
                      />
                      <p>添加iOS快捷指令</p>
                    </a>
                  </div>
                }
                align="end"
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
              >
                <button
                  className="px-3 h-12 flex items-center text-white md:hover:bg-indigo-600 transition-all rounded-r-lg"
                  onClick={() => setOpenPopover(!openPopover)}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </Popover>
            </div>
          </div>
        </div>
        <div className="my-16 px-0 sm:px-2 sm:max-w-screen-lg w-full">
          <LiteYouTubeEmbed
            id="lrjC9PTemJw"
            poster="maxresdefault"
            title="Whats new in Material Design for the web (Chrome Dev Summit 2019)"
          />
        </div>
        <div className="w-full bg-gray-100 py-5 sm:py-10 mb-10">
          <div className="flex justify-center space-x-5">
            <Link
              href="https://techcrunch.com/2022/12/08/sharegpt-lets-you-easily-share-your-chatgpt-conversations/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/techcrunch.png"
                alt="TechCrunch logo"
                width={2244}
                height={318}
                className="w-48 sm:w-60 hover:scale-105 transition-all"
              />
            </Link>
          </div>
        </div>
        <div className="py-4 px-2 sm:max-w-screen-lg w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold font-display">
            浏览示例
          </h2>
          <ul className="mt-8 grid gap-2">
            {topConvos.map((convo) => (
              <ConvoCard key={convo.id} data={convo} />
            ))}
          </ul>
        </div>
      </div>
      <div className="h-[100px] bg-gray-50 flex flex-col items-center justify-center w-full">
        <h1 className="mb-2 text-sm">Copyright © Smart Assistant Inc.保留所有权利。</h1>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const totalConvos = await prisma.conversation.count();
  const topConvos = await getConvos({ orderBy: "views", take: 10 });
  return {
    props: {
      totalConvos,
      topConvos,
    },
    revalidate: 60,
  };
}
