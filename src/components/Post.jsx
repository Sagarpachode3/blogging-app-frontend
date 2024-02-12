import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";

function Post({
  post = {
    title: "This is default post title.",
    content: "This is default post content.",
  },
}) {
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };
  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h3>{post.title}</h3>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 150) + " ...",
          }}
        ></CardText>
        <div>
          <span className="text-muted">
            posted by : {post?.user?.name} on {printDate(post?.addedDate)}
          </span>
        </div>
        <div>
          <Link className="btn btn-secondary mt-2" to={"/posts/" + post.postId}>
            Read More...
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
