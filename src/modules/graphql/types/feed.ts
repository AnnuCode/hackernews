// import { Prisma } from "@prisma/client";

import { Prisma } from "@prisma/client";
import {
  arg,
  enumType,
  // arg,
  // enumType,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  // inputObjectType,
  // intArg,
  // list,
  // nonNull,
  objectType,
  stringArg,

  // stringArg,
} from "nexus";
import { DecodedJWT } from "../../../types";
import { isAuth } from "../../utils/auth";

// import nookies from "nookies";
// import { DecodedJWT } from "../../../types";
// import { verifyToken } from "../../utils/jwt";

// import { DateTimeResolver } from "graphql-scalars";
// export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

// export const GQLDate = asNexusMethod(GraphQLDateTime, 'date')

// t.nonNull.date("createdAt")
      // t.nonNull.dateTime("createdAt")  // issue with custom scalars in Nexus
      // t.field("createdAt", { type: "DateTime" }); // workaround to solve the above error

const Link = objectType({
  name: "Link",
  definition: (t) => {
    t.nonNull.int("id"),
      t.nonNull.string("description"),
      t.nonNull.string("url"),
      t.field("createdAt",{type: "DateTime"})
      t.field("postedBy", {
        type: "User",

        resolve(parent, _, { prisma }) {
          return prisma.link
            .findUnique({
              where: {
                id: parent.id,
              },
            })
            .postedBy();
        },
      }),
      t.nonNull.list.nonNull.field("voters", {
        type: "User",
        resolve(parent, _, context) {
          return context.prisma.link
            .findUnique({ where: { id: parent.id } })
            .voters();
        },
      });
  },
});

export const LinkOrderByInput = inputObjectType({
  name: "LinkOrderByInput",
  definition(t) {
    t.field("description", { type: Sort });
    t.field("url", { type: Sort });
    t.field("createdAt", { type: Sort });
  },
});

export const Sort = enumType({
  name: "Sort",
  members: ["asc", "desc"],
});

export const Feed = objectType({
  name: "Feed",
  definition(t) {
    t.nonNull.list.nonNull.field("links", { type: Link }); // 1
    t.nonNull.int("count"); // 2
    t.id("id"); // 3
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("feed", {
      // 1
      type: "Feed",
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(LinkOrderByInput)) }),
      },
      async resolve(_, args, context) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
              ],
            }
          : {};

        const links = await context.prisma.link.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as
            | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
            | undefined,
        });

        const count = await context.prisma.link.count({ where }); // 2
        const id = `main-feed:${JSON.stringify(args)}`; // 3

        return {
          links,
          count,
          id,
        };
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: async (_, args, { prisma, req}) => {
        // const cookies = nookies.get({ req });
        // const token = cookies.sid || null;
        // if (!token) {
        //   throw new Error();
        // }

        // const decodedToken = await verifyToken(token);
        // const foo = (decodedToken as DecodedJWT).name;
        const decodedToken = await isAuth(req)
        const foo = (decodedToken as DecodedJWT).name
        const author = await prisma.user.findFirst({
          where: {
            name: foo,
          },
        });

        const newLink = prisma.link.create({
          //worked without await, smart Apollo realizing the returned Promise object by Prisma? No need for control-flow loop.
          data: {
            description: args.description,
            url: args.url,
            postedBy: {
              connect: {
                id: author?.id,
              },
            },
          },
        });
        return newLink;
      },
    });
  },
});
