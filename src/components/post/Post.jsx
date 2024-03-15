import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {format} from "timeago.js"
import { AuthContext } from "../../context/AuthContext";
export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const {user:currentUser}=useContext(AuthContext)
  const PF =process.env.REACT_APP_PUBLIC_FOLDER
  const url = `http://localhost:8800/api/users/${post.userId}`; 
  const likeHandler = async () => {
    try {
      const response = await fetch(`http://localhost:8800/api/posts/${post._id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to like the post');
      }
  
      setLike((prevLike) => isLiked ? prevLike - 1 : prevLike + 1);
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/users/${post.userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
      }
    };
    fetchUser();
  }, [url]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ?PF+user.profilePicture : PF+"person/1.jpeg"}
              alt=""
              />
              </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
