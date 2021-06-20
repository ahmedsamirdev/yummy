import { createClient } from "contentful";
import Image from "next/image";
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
  if (!recipe) return <Skeleton />;
  const {
    thumbnail,
    featuredImage,
    title,
    cookingTime,
    preparation,
    servings,
    ingredients,
    directions,
  } = recipe.fields;
  return (
    <div>
      <div className="banner">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
{/* الجاليري
        {featuredImage.map((gallery) => (
          <Image
            key={featuredImage.sys.id}
            src={"https:" + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
        ))}

        try from github
         {
              gallery.fields.images.map((entry, index) => {
                return (
                  <li key={entry.sys.id}>
                    <div styleName="c-gallery__modalOpenLink">
                      <Link to={`/gallery/${gallery.sys.id}/image/${entry.fields.photo.sys.id}`} >
                        <ResponsiveImage src={ entry.fields.photo.fields.file.url } alt={entry.fields.title} />
                      </Link>
                      <div styleName="c-gallery__modalOpenTitle">{ entry.fields.title }</div>
                    </div>
                  </li>
                )
              })
            }
          /> */}
        <h2>{title}</h2>
        <div className="info">
          <p>Take about {cookingTime} mins to cook</p>
          <h3>
            <p>Prepare time {preparation}</p>
            <p>serve {servings} people</p>
            ingredients:
            {ingredients.map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </h3>
        </div>
      </div>
      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(directions)}</div>
      </div>
    </div>
  );
}
