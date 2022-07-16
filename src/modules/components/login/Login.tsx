import { ApolloError } from "@apollo/client";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { useRouter } from "next/router";

import * as Yup from "yup";
import { useCreateAccountMutation, useLoginMutation } from "../../../../generated/graphql";
import toast,{ Toaster } from "react-hot-toast";



const Login = () => {
  const router = useRouter();
  
  const [loginMutation] = useLoginMutation({
    notifyOnNetworkStatusChange: true,
  });
  const [createAccountMutation] = useCreateAccountMutation({
    notifyOnNetworkStatusChange: true
  })
  const notify = ()=> toast("Account created successfully!")
  
  return (

    <div className="max-w-2xl mx-auto my-10">
      <Toaster />
      {/* <Link href="/">
       Back to Home
      </Link> */}
      
      <Formik 
       initialValues={{
              name: "",
              
              password: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("name is required")
                .max(200, "name too long"),
              password: Yup.string()
                .required("Password is required")
                .min(6, "Password too short")
                .max(200, "Password too long"),
             
            })}
            onSubmit={async (values, actions) => {
              const creds = { ...values };
              actions.resetForm();
              try {
                const { data } = await loginMutation({
                  variables: {
                    credentials: {
                      
                      name: creds.name,
                      password: creds.password,
                    },
                  },
                });
                console.log(data?.login?.user);
                router.push("/");
              } catch (error) {
                toast(`${(error as ApolloError).message}`)
                // window.alert((error as ApolloError).message)
              }
            }}
      >
        
         {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-3 shadow-lg p-10 rounded-lg">
            <h1 className="mx-auto font-semibold ">Login Form</h1>
            <label htmlFor="username">Name</label>
            <Field className="border-[1px] rounded-lg border-gray-300" type="name" name="name" />
            <ErrorMessage name="username" component="div" />
            
            
            
            <label htmlFor="Password">Password</label>
            <Field className="border-[1px] rounded-lg border-gray-300" type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <div className="flex justify-around  items-center mt-5">
            <button className="border-[1px]  rounded-lg px-8 py-2 hover:text-zinc-300 transition " type="submit" disabled={isSubmitting}>
              Login
            </button>
            <button className="border-[1px]  rounded-lg  px-8 py-2 hover:text-zinc-300 transition"  onClick={() => router.push("/")} >Home</button>
            </div>
            
          </Form>
        )}
      </Formik>

      <div className="mt-3">
        
            <Formik 
       initialValues={{
              name: "",
              
              password: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("name is required")
                .max(200, "name too long"),
              password: Yup.string()
                .required("Password is required")
                .min(6, "Password too short")
                .max(200, "Password too long"),
             
            })}
            onSubmit={async (values, actions) => {
              const creds = { ...values };
              actions.resetForm();

              try {
                const { data } = await createAccountMutation({
                  variables:{
                    credentials:{
                      name: creds.name,
                      password: creds.password
                    }
                  }
                });
                notify()
                // <h1>{data?.createAccount?.message}</h1>
                console.log(data?.createAccount?.message);
                // router.push("/");
              } catch (error) {
                // console.log((error as ApolloError).message);
                toast(`${(error as ApolloError).message}`)
              } 
            }}
      >
         {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-3 shadow-lg p-10 rounded-lg">
            <h1 className="mx-auto font-semibold"> Registration Form </h1>
            <label htmlFor="username">Name</label>
            <Field className="border-[1px] rounded-lg border-gray-300" type="name" name="name" />
            <ErrorMessage name="username" component="div" />
            
            
            
            <label htmlFor="Password">Password</label>
            <Field className="border-[1px] rounded-lg border-gray-300" type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <div className="flex justify-around  items-center mt-5">
            <button className="border-[1px]  rounded-lg px-8 py-2 hover:text-zinc-300 transition " type="submit" disabled={isSubmitting}>
              Register
            </button>
            <button className="border-[1px]  rounded-lg px-8 py-2 hover:text-zinc-300 transition "  onClick={() => router.push("/")} >Home</button>
            </div>
            
          </Form>
        )}
      </Formik>

      </div>

    </div>

  );
};

export default Login;

