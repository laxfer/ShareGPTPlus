import { fetcher, nFormatter } from "@/lib/utils";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { LoadingCircle } from "@/components/shared/icons";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { useRef } from "react";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/tooltip";

export default function SaveButton({ id }: { id: string }) {
  const { data: session } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  const buttonRef = useRef<any>();
  const entry = useIntersectionObserver(buttonRef, {});
  const isVisible = !!entry?.isIntersecting;

  const { data, isValidating } = useSWR<{ saved: boolean }>(
    isVisible && session?.user ? `/api/conversations/${id}/save` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: savesData } = useSWR<{ count: number }>(
    isVisible && `/api/conversations/${id}/saves`,
    fetcher
  );
  const [submitting, setSubmitting] = useState(false);
  return (
    <>
      <SignInModal />
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger
            ref={buttonRef}
            onClick={() => {
              if (!session?.user) {
                setShowSignInModal(true);
              } else {
                setSubmitting(true);
                fetch(`/api/conversations/${id}/save`, {
                  method: data?.saved ? "DELETE" : "POST",
                }).then(() => {
                  mutate(`/api/conversations/${id}/save`).then(() =>
                    mutate(`/api/conversations/${id}/saves`).then(() => {
                      setSubmitting(false);
                      {
                        data?.saved
                          ? toast.success("对话已成功取消保存！")
                          : toast(() => (
                              <div className="flex items-center flex-col justify-center space-y-1">
                                <p>对话已成功保存！</p>
                                <Link
                                  href="/dashboard"
                                  className="font-medium underline underline-offset-4 text-black"
                                >
                                 查看你所有已保存的对话。
                                </Link>
                              </div>
                            ));
                      }
                    })
                  );
                });
              }
            }}
            disabled={submitting || isValidating}
            className={`${
              submitting || isValidating ? "cursor-not-allowed" : ""
            } p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all`}
          >
            {submitting || isValidating ? (
              <LoadingCircle />
            ) : data?.saved ? (
              <Bookmark className="h-4 w-4 text-rose-500" fill="#F43F5E" />
            ) : (
              <Bookmark className="h-4 w-4 text-gray-600" />
            )}
            <p className="text-center text-gray-600 text-sm">
              {savesData?.count ? nFormatter(savesData.count, 1) : 0}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>将此对话保存到您的账户,需要登录。</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
