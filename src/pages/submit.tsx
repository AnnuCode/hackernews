import { GetServerSidePropsContext } from "next";
import { initializeApollo } from "../lib/apolloClient";
import CreateLink from "../modules/components/CreateLink";
import { useEffect } from "react";
import nookies from "nookies";
import {
  ImplicitLoginDocument,
  ImplicitLoginQuery,
} from "../../generated/graphql";

import { prisma } from "../lib/prisma";
import { useRouter } from "next/router";


interface Props {
  loggedIn: boolean;
}

const NewLink = (props: Props) => {
  const router = useRouter();


  useEffect(() => {           //necessary to use an instance of router in useEffect so that during SSR it doesnt gets called & produce an error.
    if (!props.loggedIn) {
      router.push("/login");
    }
  });

  return (
    <>
      <CreateLink />
     
    
    </>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req });
  if (!cookies.sid) {
    return { props: { loggedIn: false } as Props };
  }

  const apolloClient = initializeApollo({
    ctx: { req, res, prisma },
  });

  const { data } = await apolloClient.query<ImplicitLoginQuery>({
    query: ImplicitLoginDocument,
  });

  if (!data.implicitLogin?.loggedIn) {
    return { props: { loggedIn: false } as Props };
  }

  return {
    props: {
      name: data?.implicitLogin?.name,
      loggedIn: data?.implicitLogin?.loggedIn,
    } as Props,
  };
};

export default NewLink;
