import { use, useRef } from "react";
import { Button } from "./components/ui/button"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  const audio_ref=useRef(null)
  const image_ref=useRef(null)
  const sendReq = async () => {
    // let res = await fetch('http://localhost:5000/api/auth/callback', {
    //   method: 'GET',
    //   credentials: 'include',
    // });
    console.log(audio_ref,image_ref)
    const formData = new FormData();
    formData.append("audio_file", audio_ref.current.files[0]);
    formData.append("image_file", image_ref.current.files[0]);
    formData.append("song_name", "test");
    formData.append("artist", "Arpit");
    formData.append("duration", 25);
    formData.append("albumId", image_ref.current.files[0]);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1].name || pair[1]}`);
    }
  
    let res = await fetch('http://localhost:5000/api/admin/song', {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data", // Set the content type to JSON
      // },
      body: formData, // FormData automatically sets the correct headers for multipart/form-data
    })
    res=await res.json()
    console.log(res);
  }
  return (
    <header>
      {/* <SignedOut>
        <SignInButton/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Button onClick={()=>sendReq()}>send req</Button> */}
      <input ref={audio_ref} type="file" id="audioInput"/>
      <input ref={image_ref} type="file" id="imageInput"/>
      <button onClick={()=>sendReq()} id="uploadButton">Upload File</button>
    </header>
  );
}
