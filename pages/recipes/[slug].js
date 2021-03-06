import { createClient } from "contentful";
import Image from "next/image";
import Head from "next/head";
import Skeleton from "../../components/Skeleton";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { UserGroupIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/outline";
import { ViewListIcon } from "@heroicons/react/outline";
import { ScaleIcon } from "@heroicons/react/outline";
import ReactContentfulImage from "react-contentful-image";

import { PhotographIcon } from "@heroicons/react/outline";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "yummy",
  });

  const paths = res.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });
  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "yummy",
    "fields.slug": params.slug,
  });
  if (!items.length) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { recipe: items[0] }, revalidate: 1 };
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Skeleton />;
  const {
    thumbnail,
    featuredImage,
    title,
    details,
    cookingTime,
    preparation,
    servings,
    ingredients,
    directions,
  } = recipe.fields;

  // featuredImage.map((image) => {
  //   console.log(image.fields.file.url);
  // });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto my-6 overflow-hidden bg-white border-2 border-gray-100 shadow-lg max-w-7xl sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900 md:justify-start lg:justify-start">
            {title}
          </h3>
          <p className="max-w-2xl py-2 pb-4 mt-1 text-sm text-gray-500">
            {details}
          </p>
          <Image
            src={"https:" + thumbnail.fields.file.url}
            width={500}
            height={500}
            objectFit="contain"
          />
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-start text-sm font-medium text-gray-500">
                <ClockIcon className="w-5 h-5 mr-2 text-yummy-bg " /> Take about
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {cookingTime} mins to cook.
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-start text-sm font-medium text-gray-500">
                <ClockIcon className="w-5 h-5 mr-2 text-yummy-bg " /> Prepare
                time
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {preparation} min.
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-start text-sm font-medium text-gray-500">
                <UserGroupIcon className="w-5 h-5 mr-2 text-yummy-bg " /> Serve
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {servings} people.
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-start text-sm font-medium text-gray-500">
                <ScaleIcon className="w-5 h-5 mr-2 text-yummy-bg " />
                Ingredients:
              </dt>
              <dd className="flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ingredients.map((ingredient) => (
                  <label key={ingredient} className="items-center ">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-400 rounded-sm focus:ring-2 focus:ring-red-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 ">{ingredient}</span>
                  </label>
                ))}
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-start text-sm font-medium text-gray-500">
                <ViewListIcon className="w-5 h-5 mr-2 text-yummy-bg " />
                Method:
              </dt>
              <dd className="flex flex-col mt-1 prose text-gray-900 text-md sm:mt-0 sm:col-span-2">
                {documentToReactComponents(directions)}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-start text-sm font-medium text-gray-500 ">
                <PhotographIcon className="w-5 h-5 mr-2 text-yummy-bg " />{" "}
                Photos
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {featuredImage.forEach((image) => {
                  <img src={`"https:" + ${image}`} className="fdsf" />;
                })} */}
                <div className="grid gap-4 md:grid-flow-col">
                  <Image
                    src={"https:" + featuredImage[0].fields.file.url}
                    width={250}
                    height={250}
                  />
                  <Image
                    src={"https:" + featuredImage[1].fields.file.url}
                    width={250}
                    height={250}
                  />
                  <Image
                    src={"https:" + featuredImage[2].fields.file.url}
                    width={250}
                    height={250}
                  />
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
