import { objectType } from "nexus";

// import { DecodedJWT } from "../../../types";
// import { verifyToken } from "../../utils/jwt";
// import nookies from "nookies"

export const User = objectType({
    name:"User",
    definition: t=>{
        t.nonNull.int("id")
        t.nonNull.string("name")
        // t.nonNull.string("email")
        t.nonNull.list.nonNull.field("links",{
            type:"Link",
            resolve(parent, _, context){
                return context.prisma.user.findUnique({
                    where:{
                            id: parent.id
                    }
                }).links()
            }
        });
        t.nonNull.list.nonNull.field("votes",{
            type:"Link",
            resolve(parent, _,context){
                return context.prisma.user.findUnique({where:{id:parent.id}}).votes()
            }
        })
    }
})