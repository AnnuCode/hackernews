// import { ApolloError } from "@apollo/client";
// import {
//   Button,
//   ButtonGroup,
//   Container,
//   Heading,
//   VStack,
// } from "@chakra-ui/react";
// import { Form, Formik } from "formik";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import * as Yup from "yup";
// import { use } from "../../../../generated/graphql";
// import LoginInput from "./LoginInput";
// import StatusText from "./StatusText";

// const Register = () => {
//   const router = useRouter();
//   const [registerMutation] = useRegisterAccountMutation({
//     notifyOnNetworkStatusChange: true,
//   });
//   const [errMsg, setErrMsg] = useState<string | undefined>();
//   const [statusMsg, setStatusMsg] = useState<string | undefined>();
//   return (
//     <Container h="100vh">
//       <Formik
//         initialValues={{
//           name: "",
          
//           password: "",
          
//         }}
//         validationSchema={Yup.object({
//           name: Yup.string()
//             .required("name is required")
//             .max(200, "name too long"),
//           password: Yup.string()
//             .required("Password is required")
//             .min(6, "Password too short")
//             .max(200, "Password too long"),
         
//         })}
//         onSubmit={async (values, actions) => {
//           const creds = { ...values };
//           actions.resetForm();
//           try {
//             const { data } = await registerMutation({
//               variables: {
//                 credentials: {
                  
//                   name: creds.name,
//                   password: creds.password,
//                 },
//               },
//             });
//             setStatusMsg(data?.createAccount?.message);
//           } catch (error) {
//             setErrMsg((error as ApolloError).message);
//           }
//         }}
//       >
//         <VStack h="100%" justify="center">
//           <VStack as={Form} shadow="2xl" w="100%" bg="gray.50" p="4">
//             <Heading>Register</Heading>
//             <StatusText errMsg={errMsg} statusMsg={statusMsg} />
            
//             <LoginInput name="name" label="Name" />
//             <LoginInput
//               name="password"
//               type="password"
//               label="Password"
//             />
            
//             <ButtonGroup
//               colorScheme="purple"
//               w="100%"
//               size="lg"
//               pt="4"
//             >
//               <Button
//                 variant="outline"
//                 w="100%"
//                 onClick={() => router.push("/login")}
//               >
//                 Login
//               </Button>
//               <Button w="100%" type="submit">
//                 Sign Up
//               </Button>
//             </ButtonGroup>
//           </VStack>
//         </VStack>
//       </Formik>
//     </Container>
//   );
// };

// export default Register;

const Register = ()=>{

}
export default Register
