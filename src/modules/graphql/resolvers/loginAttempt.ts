import { PrismaClient } from "@prisma/client";

import { compare } from "bcrypt";
import { FieldResolver } from "nexus";
import { createToken,  } from "../../utils/jwt";
import { registrationValidation } from "../../utils/registrationValidation";
import nookies from 'nookies'
import { CookieSerializeOptions } from "next/dist/server/web/types";


export const LoginAttempt: FieldResolver<"Mutation", "login"> = async (
  _,
  { credentials },
  { prisma, res,  }
) => {
  




    await registrationValidation.validate(credentials);
    const existingUser = await getExistingUser(credentials, prisma); //why to pass context prisma here?

    const encodedToken = await createToken(
      {
        name: existingUser.name,
      },
      {
        expiresIn: "1m",
      }
    );

    nookies.set({ res }, "sid", encodedToken, {
        httpOnly: true,
        domain: process.env.SERVER_DOMAIN || undefined,
        maxAge: 60 * 5 * 1000 *1000,
        sameSite: true,
        path:'/'
      } as CookieSerializeOptions);
    
   

    return {
      
      message: `Welcome back ${existingUser.name}`,
      user: existingUser,
    };
 
};

const getExistingUser = async (
  credentials: {
    name: string;
   
    password: string;
  },
  prisma: PrismaClient
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      name: credentials.name,
     
    },
    select: {
      name: true,
      password: true,
      // email: true,
      id: true,
      // links: true,
    },
  });

  const passwordMatch = await compare(
    credentials.password,
    (existingUser?.password as string) || ""
  );

  if (!existingUser || !passwordMatch) {
    throw new Error("Incorrect username or password!");
  }
  return existingUser;
};