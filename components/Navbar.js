import Link from "next/link";

export default function Example() {
  return (
    <div className="flex items-center py-2 justify-center bg-yummy-bg">
      <Link href="/">
        <a>
          <div className="flex">
          <h1 className="text-white  text-2xl font-extrabold	subpixel-antialiased mx-2">
            yummy!
          </h1>
          <img
            className=" h-12 w-auto fill-current text-white"
            src="../logo.png"
          /></div>
        </a>
      </Link>
    </div>
  );
}
