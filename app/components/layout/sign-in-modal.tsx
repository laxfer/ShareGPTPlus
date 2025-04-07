import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots } from "@/components/shared/icons";
import Twitter from "../shared/icons/twitter";
import Image from "next/image";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="inline-block w-full sm:max-w-md py-8 px-4 sm:px-16 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div>
          <h3 className="font-display font-bold text-3xl mb-4 tracking-tight sm:tracking-wide">
            登 录
          </h3>
          <p className="text-sm text-gray-500">
            选择以下按钮进行登录，目前不支持直接在网站注册账号。
          </p>
        </div>

        <div className="mt-5 flex flex-col space-y-2">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed bg-gray-100 border-gray-200"
                : "bg-white text-black border border-gray-200 hover:bg-gray-50"
            } flex justify-center items-center space-x-3 shadow-sm w-full text-sm h-10 rounded-md border transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Image
                  alt="Chrome logo"
                  src="/chrome.svg"
                  width={20}
                  height={20}
                />
                <p>使用 Google 登录</p>
              </>
            )}
          </button>
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed bg-gray-100 border-gray-200"
                : "bg-white text-black border border-gray-200 hover:bg-gray-50"
            } flex justify-center items-center space-x-3 shadow-sm w-full text-sm h-10 rounded-md border transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("twitter");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Twitter className="text-[#1DA1F2] w-5 h-5" />
                <p>使用 Twitter 登录</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  );
}
