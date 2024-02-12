import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { loadPosts } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";

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
      .catch((error) => {
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
      </Container>
    </Base>
  );
};

export default PostPage;
