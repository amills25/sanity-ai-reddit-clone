// adminClient has read/write privileges that client does not

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_ADMIN_TOKEN,
});
