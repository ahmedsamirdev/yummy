import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <div className="container flex flex-col-reverse items-center justify-center gap-20 px-5 text-gray-700 md:flex-row">
          <div className="max-w-md ">
            <p className="text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldn't find this page.
            </p>
            <p className="mb-8">You are being redirected to homepage ..</p>
            <Link href="/">
              <a className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700">
                Back to Homepage
              </a>
            </Link>
          </div>
          <div className="max-w-lg mt-5">
            <img src="../404.png" alt="" className="fd" />
          </div>
        </div>
      </div>
    </>
  );
}
