import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getSubreddits() {
  const getSubredditsQuery = defineQuery(`*[_type == 'subreddit'] {
    _id,
    title,
    'slug': slug.current,
    description,
    image,
    'moderator': moderator->,
    createdAt
  } | order(createdAt desc)`);

  const subreddits = await sanityFetch({ query: getSubredditsQuery });

  return subreddits.data;
}
