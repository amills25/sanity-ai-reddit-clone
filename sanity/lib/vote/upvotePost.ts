import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";

export async function upvotePost(postId: string, userId: string) {
  // Check if user has already votes on this post
  const existingVoteUpvoteQuery = defineQuery(
    `*[_type == "vote" && post._ref == $postId && user._ref == $userId][0]`
  );
  const existingVote = await sanityFetch({
    query: existingVoteUpvoteQuery,
    params: { postId, userId },
  });

  if (existingVote.data) {
    const vote = existingVote.data;

    // If there's already an upvote, remove it (toffle off)
    if (vote.voteType === "upvote") {
      return await adminClient.delete(vote._id);
    }

    // If there's a downvote, change it to an upvote
    if (vote.voteType === "downvote") {
      return await adminClient
        .patch(vote._id)
        .set({ voteType: "upvote" })
        .commit();
    }
  }

  // Create a new upvote
  return await adminClient.create({
    _type: "vote",
    post: {
      _type: "reference",
      _ref: postId,
    },
    user: {
      _type: "reference",
      _ref: userId,
    },
    voteType: "upvote",
    createdAt: new Date().toISOString(),
  });
}
