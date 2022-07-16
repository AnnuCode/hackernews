import { GetServerSidePropsContext } from "next";
import { initializeApollo } from "../lib/apolloClient";
import nookies from "nookies"
import { ImplicitLoginDocument, ImplicitLoginQuery } from "../../generated/graphql";
import { prisma } from "../lib/prisma";

interface Props {
    name: string;
    loggedIn: boolean;
  }

const Restricted = ({name, loggedIn}: Props)=>{

    return loggedIn? <h1>Access Allowed, welcome {name}</h1> : <h1>You are not allowed to view this page. Please login first.</h1>
}


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

export default Restricted