import toast, { Toaster } from "react-hot-toast";
import { useVoteMutation } from "../../../generated/graphql";
import { useRouter } from "next/router";
import { timeDifferenceForDate } from "../utils/TimeDifference";

interface Ink {
  url: string;
  description: string;
  id: number;
  createdAt?: any;
  postedBy?:
    | {
        __typename?: "User" | undefined;
        name: string;
      }
    | null
    | undefined;

  voters: {
    __typename?: "User" | undefined;
    name: string;
  }[];
}

interface Props {
  link: Ink;
  name?: string;
  loggedIn?: boolean;
  index: number;
}

const Links = (props: Props) => {
  const { link } = props;
  const found = link.voters.filter((voter) => voter.name === props.name);

  const notify = () => toast("Upvoted!");

  const router = useRouter();
  const [vote] = useVoteMutation({
    notifyOnNetworkStatusChange: true,
  });

  return (
    // <div className="flex flex-col mx-auto">
    //     <div className="">
    //         {link.description} ({link.url})
    //     </div>
    // </div>

    <div className="flex items-start space-x-2   ">
      <>
        <div className="flex items-center space-x-1">
            <Toaster />
          <span className={`text-gray-400 text-[13px] ${(props.index + 1)<10? "pl-2": "pl-0"}`}>{props.index + 1}.</span>
          <button
            className={` text-[12px] active:-translate-y-1 transform transition  ${
              found.length === 0 ? "text-gray-400" : "text-orange-500"
            }`}
            onClick={async () => {
              if (!props.loggedIn) {
                //redirecting to login page if someone tries to upvote without logging in
                router.push("./login");
                return;
              }
              notify();
              try {
                //implementing the upvote
                const { data } = await vote({
                  variables: {
                    voteLinkId2: link.id,
                  },
                });
                console.log(`Upvoted by ${data?.vote?.user.name}`);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {/* {link.voters.length} */} ▲
          </button>
        </div>

        <div>
          <div className="flex space-x-1 items-center">
            <a className="text-gray-700 " href={link.url}>
              {link.description}
            </a>
            <a
              href={link.url}
              className="hover:underline decoration-gray-400 text-xs"
            >
              ({link.url})
            </a>
          </div>

          <div className="flex space-x-1.5 text-xs text-gray-500">
            <span> {link.voters.length} points </span>
            <span>by {link.postedBy?.name}</span>
            <span> {timeDifferenceForDate(link.createdAt)} </span>
          </div>
        </div>
      </>
    </div>
  );
};
export default Links;
