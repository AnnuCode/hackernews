import { useFeedQuery } from "../../../generated/graphql";
import Link from "./Links";

interface Props{
  name: string;
  loggedIn: boolean;
}

const LinkList = (props: Props) => {
  const { data } = useFeedQuery({
    notifyOnNetworkStatusChange: true,
    
  });

  return (
    <div className="">
      {data && (
        <>
          {data.feed.links.map((link,index) => (
            <Link  key={link.id} link={link} name={props.name} loggedIn = {props.loggedIn} index= {index} />
          ))}
        </>
      )}
    </div>
  );
};
export default LinkList;
