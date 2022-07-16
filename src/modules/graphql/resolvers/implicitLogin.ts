import nookies from "nookies"

import { FieldResolver } from "nexus";
import { verifyToken } from "../../utils/jwt";
import { DecodedJWT } from "../../../types";

export const implicitLogin: FieldResolver<"Query", "implicitLogin"> = async(_,__,{req})=>{
    try {
        const cookies = nookies.get({req})
        const token = cookies.sid || null
        if(!token){
            throw new Error()
        }

        const decodedToken =  await verifyToken(token)
        
        return{
            loggedIn: true,
            name: (decodedToken as DecodedJWT).name
        }

    } catch (error) {
        console.log(error)
        return{
            loggedIn:  false
        }
    }
    
   
}