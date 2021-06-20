import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Card({ recipe }) {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;
  const router = useRouter();
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  return (
    <div className="my-2">
      <div class="bg-white shadow-md  hover:shadow-lg rounded-3xl p-4 min-w-full mx-auto">
        <div class="flex-none lg:flex">
          <div class=" h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
            <Image
              class=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl"
              src={"https:" + thumbnail?.fields?.file?.url}
              width={thumbnail.fields.file.details.image.width}
              height={thumbnail.fields.file.details.image.height}
            />
          </div>
          <div class="flex-auto ml-3 justify-evenly py-2">
            <div class="flex flex-wrap ">
              <h2 class="flex-auto text-lg font-medium">
                <Link href={"/recipes/" + slug}>{title}</Link>
              </h2>
            </div>
            <p class="mt-3"></p>
            <div class="flex py-4  text-sm text-gray-600">
              <div class="flex-1 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p class="">{cookingTime} mins to cook</p>
              </div>
            </div>
            <div class="flex p-4 pb-2 border-t border-gray-200 "></div>
            <div class="flex space-x-3 text-sm font-medium">
              <div class="flex-auto flex space-x-3">
                <button class="mb-2 md:mb-0 bg-white px-5 py-2 shadow-sm tracking-wider  text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2 ">
                  {Array(rating)
                    .fill()
                    .map((_, index) => (
                      <svg
                        class="mx-1 w-4 h-4 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                </button>
              </div>
              <button
                onClick={() => router.push("/recipes/" + slug)}
                class="mb-2 md:mb-0 bg-red-400 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-red-900"
                type="button"
              >
                Let's Cook ..
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
