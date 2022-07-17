### A fullstack GraphQl Hackernews clone which is end to end type-safe. 

#### [Live Demo](https://hackernews-eta.vercel.app)

#### Features:

- Logged-in users can see highlighted upvote icon against the links which they upvoted in past.
- End to end typesafety by combining Typescript,Nexus and codegen for graphql resolvers, queries/mutations & client/server side code.
- JWT authentication (cookies) coupled with implicit login feature (app remembers its logged-in user for a certain time), taking advantage of server side rendering in Next.js.
- See the latest links by clicking ‘New’ in the header made possible by enabling sorting in graphql query.
- Used custom scalar types in GraphQl to keep track of date & time of each posted link.
- Forms are made using Formik and Yup for validation.
- Reusable React components ensure both modularity and scalability while increasing the efficiency of the development workflow.

![loggedIn](https://user-images.githubusercontent.com/97174641/179411485-58b881ba-0e01-462f-94e7-4eb1145c95a3.png)


### Technologies Used:

- Next.js
- TypeScript
- Prisma
- GraphQL Nexus
- Apollo Server
- Apollo Client configured SSR/SSG and CSR
- GraphQL Codegen
