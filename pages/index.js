import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import Head from "next/head";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "yummy" });

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Yummy | Food Recipes Blog</title>
      </Head>
      {/* <Banner /> */}
      {/* <Hero /> */}
      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
