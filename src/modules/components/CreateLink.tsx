import { useState } from "react";
import { usePostMutation } from "../../../generated/graphql";
import toast, {Toaster} from "react-hot-toast"

import Link from "next/link";

const CreateLink = () => {
  

  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

const [post] = usePostMutation({
    notifyOnNetworkStatusChange: true
})
const notify = ()=> toast("New link posted!")


  return (
    <div className="mt-4 border-2 max-w-2xl mx-auto rounded-lg px-2 py-2">
      <Toaster />
      <form
        onSubmit={async(e) => {
          e.preventDefault();
          // setFormState({                          
          //   description: "",
          //   url: ""
          // })
        //   postMutation();
        try {
           const {data} = await post({
                variables:{
                    description: formState.description,
                    url: formState.url
                }
            })
           
            notify()
            console.log(data)
        } 
        
        catch (error) {
            console.log(error)
        }
        }}
      >
        <div className="flex flex-col">
          <input
            className="mb-2 border-[1px] rounded-lg text-center"
            type="text"
            placeholder="enter a description"
            onChange={(e) => {
              setFormState({ ...formState, description: e.target.value });
            }}
          />
          <input
            className="mb-2 border-[1px] rounded-lg text-center"
            type="text"
            placeholder="enter the url link"
            onChange={(e) => {
              setFormState({ ...formState, url: e.target.value });
            }}
          />
        </div>
        <div className="flex justify-around items-center my-4">
        <button className="border-[1px]  rounded-lg  px-8 py-2 hover:text-zinc-300 transition" type="submit">Submit</button>
        {/* <button className="border-[1px]  rounded-lg  px-8 py-2 hover:text-zinc-300 transition" onClick={()=>router.push("/")}>Home</button> */}
        <Link href="/">
            <p className="border-[1px]  rounded-lg  px-8 py-2 hover:text-zinc-300 transition hover:cursor-pointer">Home</p>
        </Link>
        </div>
      
      </form>
    </div>
  );
};
export default CreateLink;