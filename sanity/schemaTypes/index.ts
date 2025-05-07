import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { commentType } from "./commentType";
import { postType } from "./postType";
import { subredditType } from "./subredditType";
import { voteType } from "./voteType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, commentType, postType, subredditType, voteType],
};
