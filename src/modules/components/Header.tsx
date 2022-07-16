import Link from "next/link";

interface Props {
  loggedin: boolean;
}

export const Header = ({loggedin}: Props) => {
  function NavLink({ href, text }: any) {
    return (
      <li className="ml-6 font-medium text-black hover:text-black-300 list-none ">
        <Link href={href}>
          <a>{text}</a>
        </Link>
      </li>
    );
  }
 
  return (
    <div className="flex justify-between bg-orange-500 px-2">
      <div className="flex  items-center ">
        <div className="flex items-center justify-between ">
          <ul className="flex">
            <NavLink href="/" text="Hackernews" />
            <NavLink href="/new" text="New" />
            <NavLink href="/submit" text="Submit" />
          </ul>
        </div>
      </div>
      <div>
        {/* <NavLink href="/login" text="Login" /> */}

        {loggedin?<NavLink href="/logout" text="Logout" />: <NavLink href="/login" text="Login" />}        
       
      </div>
    </div>
  );
};
