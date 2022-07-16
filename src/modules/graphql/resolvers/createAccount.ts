
import { hash } from "bcrypt";
// import * as bcrypt from "bcryptjs";
import { FieldResolver } from "nexus";

import { registrationValidation } from "../../utils/registrationValidation";

export const createAccount: FieldResolver<"Mutation", "createAccount"> = async(_, {credentials}, {prisma}) =>{
    
        await registrationValidation.validate(credentials)

        const existingUser = await prisma.user.findFirst({
            where:{
                name: credentials.name
                // OR: {
                //     email: credentials.email
                // } 

            }
        })
        
        if(existingUser !== null){
          
            throw new Error("User already exists!")
           
        }
        
        // const hashPassword = await bcrypt.hash(credentials.password, 7)
        const hashPass = await hash(credentials.password, 7)

        const user = await prisma.user.create({
            data:{
                // email: credentials.email,
                name: credentials.name,
                password: hashPass
            }
        })

        return{
          user,
          message:
          `Thanks for registering ${user.name}!`,
        
          
        }
   
}
