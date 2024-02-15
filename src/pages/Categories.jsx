import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router";
import { Col, Container, Row } from "reactstrap";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";
import {
  loadPostCategoryWise,
  deletePostService,
} from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";

function Categories() {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log("error");
        toast.error("error in loading post");
      });
  }, [categoryId]);

  function deletePost(post) {
    //going to delete post
    console.log(post);
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostService(post.postId)
        .then((res) => {
          console.log(res);
          toast.success("Post Deleted Sucessfully");
          let newPosts = posts.filter((p) => p.postId != post.postId);
          setPosts([...newPosts]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("error in deleting post");
        });
    }
  }

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h1>Blog Count ({posts.length})</h1>

            {posts &&
              posts.map((post, index) => {
                return <Post key={index} deletePost={deletePost} post={post} />;
              })}

            {posts.length <= 0 ? <h1>No posts in this category</h1> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
