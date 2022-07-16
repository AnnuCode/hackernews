import type { GetServerSidePropsContext } from "next";
import { CookieSerializeOptions } from "next/dist/server/web/types";
import { useRouter } from "next/router";

import nookies from "nookies";

const Logout = ()=>{
    const router = useRouter()
    router.push("/")
return(
    <h1>  </h1>
)
}
export const getServerSideProps = async ({
    
    res,
  }: GetServerSidePropsContext) => {
    
    nookies.set({ res }, "sid", "", {
        httpOnly: true,
        domain: process.env.SERVER_DOMAIN || undefined,
        maxAge: 1,
        sameSite: true,
        path:'/'
      } as CookieSerializeOptions);

      return {
        props:{

        }
      }

  };

export default Logout