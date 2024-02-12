import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { createComment, loadPosts } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { loadPosts } from "../services/post-service";

export const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const [comment, setComment] = useState({
    content: "",
  });

  useEffect(() => {
    //load post of postId
    loadPosts(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Couldn't Load post");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };


  const submitComment = () => {
    if (!isLoggedIn()) {
      toast.warning("Need to login first !!!");
      return;
    }
    if (comment.content.trim() === "") {
      toast.warning("Can not add blank comment !");
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("comment added !");
        setPost({ ...post, comments: [...post.comments, data.data] });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-4 ps-2">
              {post && (
                <CardBody>
                  <CardText>
                    Posted By : <b>{post?.user?.name}</b> on{" "}
                    <b>{printDate(post?.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      Posted in the category : {post?.category?.categoryTittle}
                    </span>
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <h1 className="mt-3">{post?.title}</h1>

                  <div
                    className="image-container mt-4 shadow container text-center"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post?.imageName}
                      alt=""
                    ></img>
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ({post ? post.comments.length : ""})</h3>
            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-2 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-2 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter your comment here"
                  value={comment.content}
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                ></Input>
                <Button
                  onClick={submitComment}
                  className="mt-3"
                  color="primary"
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Base>
  );
};

export default PostPage;
