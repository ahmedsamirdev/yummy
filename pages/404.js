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
      <div class="h-screen justify-center w-screen bg-gray-100 flex items-center">
        <div class="container flex flex-col-reverse  gap-20 md:flex-row items-center justify-center px-5 text-gray-700">
          <div class="max-w-md ">
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            <p class="mb-8">
            You are being redirected to homepage ..
            </p>
            <Link href="/">
            <button class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
              Back to Homepage
            </button></Link>
          </div>
          <div class="max-w-lg mt-5">
            <img src="../404.png" alt="" className="fd" />
          </div>
        </div>
      </div>
    </>
  );
}
