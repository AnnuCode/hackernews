import { Sort, useFeedQuery } from "../../generated/graphql"
import { Header } from "../modules/components/Header";
import Link from "../modules/components/Links";
import type { GetServerSidePropsContext } from "next";

import nookies from "nookies";
import {
  ImplicitLoginDocument,
  ImplicitLoginQuery,
} from "../../generated/graphql";
import { initializeApollo } from "../lib/apolloClient";
import { prisma } from "../lib/prisma";


interface Props {
    name: string;
    loggedIn: boolean;
  }

const New = ({loggedIn, name}: Props)=>{
const {data} = useFeedQuery({
    variables:{
         orderBy: [{createdAt: "desc" as Sort }]
    }
})

return(
    <div className="max-w-7xl min-h-screen bg-stone-100 mx-auto mt-2">
        
        <Header loggedin = {loggedIn} />
        <div className="pl-2 mt-3">
        {data && (
      <>
        {data.feed.links.map((link,index) => (
          <Link  key={link.id} link={link} loggedIn={loggedIn} name={name} index= {index} />
        ))}
      </>
    )}
        </div>
   
  </div>
    
   
)
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
export default New

