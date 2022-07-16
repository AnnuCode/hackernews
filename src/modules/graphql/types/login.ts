import { extendType, objectType, inputObjectType, nonNull } from "nexus";
import { createAccount } from "../resolvers/createAccount";
import { implicitLogin } from "../resolvers/implicitLogin";
import { LoginAttempt } from "../resolvers/loginAttempt";
import { User } from "./User";

export const CreateAccount = extendType({
    type: "Mutation",
    definition: t=>{
        t.field("createAccount", {
            type:RegisterResponse,
            args: {credentials: nonNull(Credentials)},
            resolve: createAccount
        })
    }
})

export const Login = extendType({
    type:"Mutation",
    definition: t=>{
        t.field("login",{
            type: LoginResponse,
            args: {credentials: nonNull(Credentials)},
            resolve: LoginAttempt
        })
    }
})

const LoginResponse = objectType({
    name:"loginResponse",
    definition:t=>{
        t.nonNull.string("message")
        
        t.field("user",{
            type: User.name
        }
       )
    }
})

const Credentials = inputObjectType({
    name: "loginCredentials",
    definition: t => {
      
      t.nonNull.string("name");
      t.nonNull.string("password");
    },
  });

  const RegisterResponse = objectType({
    name: "registerResponse",
    definition: t => {
      t.nonNull.string("message");
      
      t.field("user",{
        type: User
      })
    },
  });

  export const ImplicitLogin = extendType({
    type: "Query",
    definition:t=>{
      t.field("implicitLogin", {
        type: ImplicitLoginResponse,
        resolve: implicitLogin
      })
    }
  })

  const ImplicitLoginResponse = objectType({
    name:"implicitLoginResponse",
    definition: t=>{
      t.nonNull.boolean('loggedIn')
      t.string('name')
    }
  })