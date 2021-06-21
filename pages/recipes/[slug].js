import { createClient } from "contentful";
import Image from "next/image";
import Head from "next/head";
import Skeleton from "../../components/Skeleton";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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
  console.log(recipe);

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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-white max-w-7xl mx-auto shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{details}</p>
          <Image
            src={"https:" + thumbnail.fields.file.url}
            width={400}
            height={400}
          />
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Take about</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {cookingTime} mins to cook.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Prepare time
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {preparation} min.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Serve</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {servings} people.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                ingredients:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 flex flex-col sm:col-span-2">
                {ingredients.map((ingredient) => (
                  <label key={ingredient} class=" items-center">
                    <input
                      type="checkbox"
                      class=" rounded-sm focus:ring-2  text-red-400"
                    />
                    <span class="ml-2">{ingredient}</span>
                  </label>
                ))}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Method:</dt>
              <dd className="mt-1 text-sm flex flex-col text-gray-900 sm:mt-0 sm:col-span-2">
                {documentToReactComponents(directions)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Photos</dt>
              <dd className="mt-1 text-sm  text-gray-900 sm:mt-0 sm:col-span-2">
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

              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
