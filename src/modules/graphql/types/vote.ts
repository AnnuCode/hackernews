import { extendType, intArg, nonNull, objectType } from "nexus";
import { DecodedJWT } from "../../../types";
import { verifyToken } from "../../utils/jwt";
import nookies from "nookies";
import { User } from "@prisma/client";


export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.field("user", { type: "User" });
    t.nonNull.field("link", { type: "Link" });
  },
});

export const voteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("vote", {
      type: Vote,
      args: {
        linkId: nonNull(intArg()),
      },
      async resolve(_, args, { req, prisma }) {
        const { linkId } = args;
        const cookies = nookies.get({ req });
        const token = cookies.sid || null;
        if (!token) {
          throw new Error();
        }

        const decodedToken = await verifyToken(token);
        const foo = (decodedToken as DecodedJWT).name;
        const author = await prisma.user.findFirst({
          where: {
            name: foo,
          },
        });

        const link = await prisma.link.update({
          where: {
            id: linkId,
          },
          data: {
            voters: {
              connect: {
                id: author?.id,
              },
            },
          },
        });
        
        return {
          link: link,
          user: author as User,
        };
      },
    });
  },
});