import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router";
import { Col, Container, Row } from "reactstrap";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";
import { loadPostCategoryWise } from "../services/post-service";
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
                return <Post key={index} post={post} />;
              })}

            {posts.length <= 0 ? <h1>No posts in this category</h1> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
