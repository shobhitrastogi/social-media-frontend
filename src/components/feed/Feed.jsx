import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const url = username ?`http://localhost:8800/api/posts/profile/${username}`
  :"http://localhost:8800/api/posts/timeline/"+user._id ; 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using the fetch method
        const response = await fetch(username ?`http://localhost:8800/api/posts/profile/${username}`
        :"http://localhost:8800/api/posts/timeline/"+user._id  );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data as JSON
        const data = await response.json();

        // Set the posts state with the fetched data
        setPosts(data.sort((p1,p2)=>{
          return new Date(p2.createdAt) -new Date(p1.createdAt)
                }));
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [username,user._id]);

  return (
    <div className="feed">
      {/* <input type="text" onChange={(e) => setText(e.target.value)} /> */}
      <div className="feedWrapper">
        {(!username ||  username ===user.username) && <Share />}
        {posts.map((p,index) => (
          <Post key={index} post={p} />
        ))}
      </div>
    </div>
  );
}
