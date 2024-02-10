import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { loadPosts } from "../services/post-service";
import { toast } from "react-toastify";

export const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    //load post of postId
    loadPosts(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .then((error) => {
        console.log(error);
        toast.error("Couldn't Load post");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };
  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link>
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-4">
              <CardBody>
                <CardText>
                  Posted By : <b>{post?.user?.name}</b> on{" "}
                  <b>{printDate(post?.addedDate)}</b>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
