import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import { deletePostById, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const Userdashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log("error");
        toast.error("error in loading use posts");
      });
  }, []);

  //function to delete post

  function deletePost(post) {
    //going to delete post
    deletePostById(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("post is deleted ...");
      })
      .catch((error) => {
        console.log("error in deleting post.");
        toast.error("error in deleting post.");
      });
  }
  return (
    <Base>
      <Container>
        <AddPost />

        <h1 className="my-3">Your own Posts Count : ({posts.length})</h1>

        {posts.map((post, index) => {
          return <Post post={post} key={index} deletePost={deletePost} />;
        })}
      </Container>
    </Base>
  );
};

export default Userdashboard;
