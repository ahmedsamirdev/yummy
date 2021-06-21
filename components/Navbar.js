import Link from "next/link";

export default function Example() {
  return (
    <div className="flex items-center  shadow-md py-2 justify-center bg-yummy-bg">
      <Link href="/">
        <a>
          <div className="flex">
    
          <img
            className=" h-12 w-auto fill-current text-white"
            src="../test.png"
          /></div>
        </a>
      </Link>
    </div>
  );
}
