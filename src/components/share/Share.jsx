import { useContext, useRef, useState } from "react";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { AuthContext } from './../../context/AuthContext';

export default function Share() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc=useRef()
  const [file,setFile] = useState(null)
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const newPost={
      userId : user._id,
      desc: desc.current.value
    }
    if(file){
      const data =new FormData();
      const fileName = Date.now() +file.name;
      data.append("file",file)
      data.append("name",fileName)
      newPost.img = fileName
      try {
        const response = await fetch(`http://localhost:8800/api/upload`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });
      } catch (error) {
        console.log(error);
        
      }
    }
    try {
      const response = await fetch(`http://localhost:8800/api/posts`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      }); 
      window.location.reload()
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper" >
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ?PF+user.profilePicture:PF+"person/1.jpeg"} alt="" />
          <input
            placeholder={"What's in your mind "+user.username+"?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
