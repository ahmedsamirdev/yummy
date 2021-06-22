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
      <div className="bg-white max-w-7xl mx-auto shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium flex items-center justify-center md:justify-start lg:justify-start text-gray-900">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm py-2 pb-4 text-gray-500">
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
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-start">
                {" "}
                <ClockIcon className="h-5 w-5 mr-2 text-yummy-bg " /> Take about
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {cookingTime} mins to cook.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-start">
                <ClockIcon className="h-5 w-5 mr-2 text-yummy-bg " /> Prepare
                time
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {preparation} min.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-start">
                <UserGroupIcon className="h-5 w-5 mr-2 text-yummy-bg " /> Serve
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {servings} people.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex  items-start">
                <ScaleIcon className="h-5 w-5 mr-2 text-yummy-bg " />
                Ingredients:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 flex flex-col sm:col-span-2">
                {ingredients.map((ingredient) => (
                  <label key={ingredient} className=" items-center ">
                    <input
                      type="checkbox"
                      className=" rounded-sm focus:ring-2  h-4 w-4 text-red-400 focus:ring-red-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 ">{ingredient}</span>
                  </label>
                ))}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500  flex items-start">
                <ViewListIcon className="h-5 w-5 mr-2 text-yummy-bg " />
                Method:
              </dt>
              <dd className="mt-1 text-md flex flex-col text-gray-900 sm:mt-0 sm:col-span-2">
                {documentToReactComponents(directions)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-start ">
                <PhotographIcon className="h-5 w-5 mr-2 text-yummy-bg " />{" "}
                Photos
              </dt>
              <dd className="mt-1 text-sm  text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {featuredImage.forEach((image) => {
                  <img src={`"https:" + ${image}`} className="fdsf" />;
                })} */}
                <div className="grid md:grid-flow-col gap-4">
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
                  <Image
                    src={"https:" + featuredImage[3].fields.file.url}
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
