import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";
import Image from "next/image";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      description: "The unique username for this user",
      validation: (rule) => rule.required().error("Username is required"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "User's email address",
      validation: (rule) => rule.required().error("Email is required"),
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "string",
      description: "Users's Clerk profile picture",
    }),
    defineField({
      name: "joinedAt",
      title: "Joined At",
      type: "datetime",
      description: "When the user joined the platform",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isReported",
      title: "Is Reported",
      type: "boolean",
      description: "Whether the user has been reported",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "username",
      media: "imageUrl",
    },
    prepare({ title, media }) {
      return {
        title,
        media: media ? (
          <Image src={media} alt={`${title}'s avatar`} width={40} height={40} />
        ) : (
          <UserIcon />
        ),
      };
    },
  },
});
