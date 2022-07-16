import { useState } from "react";
import { object } from "yup";
import { useFeedQuery } from "../../../generated/graphql";
// import { useFeedLazyQuery } from "../../../generated/graphql";
import Links from "./Links";

const Search = () => {
//   const [searchFilter, setSearchFIlter] = useState("");
// //   const [executeSearch, {data}] = useFeedLazyQuery()
// const {data} = useFeedQuery({
//     variables: {
//         filter: searchFilter
//     }
// })
// console.log(data)
//   return (
//     <div>
//       <input className="rounded-lg bg-slate-100" type="text" onChange={(e) => setSearchFIlter(e.target.value)} />
//       <button onClick={()=> {
//             // executeSearch({variables:{filter: searchFilter}})
//             // console.log(data)
//       } }>Search</button>
//       {/* {data && 
//        data.feed.links.map((link, index)=>{
//         // <Links index={index} key={link.id} link={link}  />
//         <h1>Filtered link is here: {link.url} with an index of {index}</h1>
//        })
//       } */}
//      {data?.feed.links.map(link=><h1>{link.description}</h1>)}
    
//     </div>
    
//   );
};
export default Search;
