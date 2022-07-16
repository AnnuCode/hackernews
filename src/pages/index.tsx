import type { GetServerSidePropsContext } from "next";

import nookies from "nookies";
import {
  ImplicitLoginDocument,
  ImplicitLoginQuery,
} from "../../generated/graphql";
import { initializeApollo } from "../lib/apolloClient";
import { prisma } from "../lib/prisma";
import { Header } from "../modules/components/Header";
// import Home from "../modules/components/Home";
import LinkList from "../modules/components/LinkList";

// import Login from "../modules/components/login/Login";


interface Props {
  name: string;
  loggedIn: boolean;
}

const Index = ({ loggedIn, name }: Props) => {
  return (
    <div className="max-w-7xl min-h-screen bg-stone-100 mx-auto mt-2">
     {/* { loggedIn ? <Home name={name} /> : <Login />}; */}
     {/* <LinkList /> */}
     <Header loggedin = {loggedIn} />
     
     {/* {loggedIn?<h1 className="font-extrabold">Welcome {name}</h1>: <h1 className="font-extrabold">Login first</h1>} */}
     <div className="mt-3">
     <LinkList name = {name} loggedIn = {loggedIn} />  
     </div>
     
    </div>
    
  ) 
  
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

export default Index;
