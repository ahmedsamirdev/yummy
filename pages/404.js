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
      <h1>404 - Page Not Found واللهي</h1>
      redirecting to homepage <Link href="/"> home</Link>
    </>
  );
}
