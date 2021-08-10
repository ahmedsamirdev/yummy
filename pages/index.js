import Hero from "../components/Hero";
import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import Head from "next/head";
import {
  Element,
  animateScroll as scroll,
} from "react-scroll";

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
      <Hero />
      <Element name="test1" className="element">
        <div className="container mx-auto mt-10 ">
          <p
            id="trending"
            className="ml-4 text-4xl font-bold tracking-tight text-black xl:inline sm:text-4xl md:text-4xl"
          >
            Trending this week
          </p>
        </div>
      </Element>
      <div className="container grid gap-6 pt-6 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
