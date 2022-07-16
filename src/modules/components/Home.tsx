import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  
  useFeedQuery, useVoteMutation,
} from "../../../generated/graphql";

interface Props {
  name: string;
}

const Home: React.FC<Props> = ({ name }) => {
  // const [createPost] = usePostMutation();
  const [voteMutation] = useVoteMutation({
    notifyOnNetworkStatusChange: true,
    
  })
  const { data } = useFeedQuery();

  // const voteFunc = async(linkId)=>{
  //   try {
  //     const{data} = await voteMutation({
  //       variables:{
  //         voteLinkId2: linkId
  //       }
  //     })
  //   } catch (error) {
      
  //   }
  // }
  
  return (
    <VStack spacing={2}>
      <Heading>Welcome {name}</Heading>
      <Formik
        initialValues={{ newPost: "", url:"" }}
        validationSchema={Yup.object({
          newPost: Yup.string().required().min(1).max(49),
        })}
        onSubmit={() => {
          // createPost({
          //   variables: {
          //     description: values.newPost,
          //     url: values.url
          //   },
          // });
          // actions.resetForm();
        }}
      >
        <>
          <HStack as={Form}>
            <Field
              as={Input}
              placeholder="new post..."
              name="newPost"
              autoComplete="off"
            />
            <Field
              as={Input}
              placeholder="url"
              name="url"
              autoComplete="off"
            />
            <Button colorScheme="purple" type="submit">
              Submit
            </Button>
          </HStack>
          <ErrorMessage
            name="newPost"
            render={msg => (
              <Text color="red.500" fontSize="sm">
                {msg}
              </Text>
            )}
          />
        </>
      </Formik>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {data?.feed.links.map((link, key) => (
          <GridItem
            key={key}
            bg="gray.100"
            padding="2"
            borderRadius={2}
          >
            <Heading size="md">{link?.url}</Heading>
            <HStack padding="2" justify="space-between" mx="auto">
              <Text fontSize="xs">{link?.description}</Text>
              
              <Button onClick={async() => {
                  try {
                    
                    const {data} = await voteMutation({
                      variables:{
                        voteLinkId2: link.id
                      }
                    })
                      console.log(data?.vote?.user.name)
                    } catch (error) {
                    console.log(error)
                  }
                 
              } }>Upvote</Button>
            </HStack>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Home;
