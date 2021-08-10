import Link from "next/link";

export default function Example() {
  return (
    <div className="flex items-center justify-center py-2 bg-red-600 shadow-md">
      <Link href="/">
        <span className="flex">
            <img
              className="w-auto h-12 text-white fill-current "
              src="../logo.png"
            />
        </span>
      </Link>
    </div>
  );
}
