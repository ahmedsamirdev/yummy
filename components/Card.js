import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { ClockIcon } from "@heroicons/react/outline";

export default function Card({ recipe }) {
  const { title, slug, cookingTime, thumbnail, details } = recipe.fields;
  const router = useRouter();
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  return (
    <div className=" shadow-md flex flex-col p-10 m-5 bg-white rounded-lg">
      <Image
        src={"https:" + thumbnail?.fields?.file?.url}
        width={400}
        height={400}
        objectFit="contain"
        className="rounded-md"
      />
      <h4 className="my-3 font-bold antialiased sm:subpixel-antialiased md:antialiased">
        <Link href={"/recipes/" + slug}>{title}</Link>
      </h4>
      <p className="my-2 text-xs ">{details}</p>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p key={i.toString()}>
              <StarIcon className="h-5 text-yellow-500" />
            </p>
          ))}
      </div>
      <div className="mb-5">
        <p className=" flex items-center ">
          <ClockIcon className="h-5 w-5 mr-2 text-yummy-bg " />
          <p className="font-medium">{cookingTime} mins&nbsp; </p>
        </p>
      </div>
      <button
        onClick={() => router.push("/recipes/" + slug)}
        className="mt-auto text-white bg-yummy-bg p-2 rounded-lg focus:outline-none focus:ring hover:bg-red-700 focus:ring-red-600 focus:ring-opacity-50"
      >
        Let's Cook
      </button>
    </div>
  );
}
