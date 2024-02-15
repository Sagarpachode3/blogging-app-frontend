import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

function Post({
  post = {
    id: -1,
    title: "This is default post title.",
    content: "This is default post content.",
  },
  deletePost,
}) {
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h3>{post.title}</h3>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 200) + " ...",
          }}
        ></CardText>
        <div>
          <span className="text-muted">
            posted by : {post?.user?.name} on {printDate(post?.addedDate)}
          </span>
        </div>
        <div>
          <Link
            className="btn btn-secondary  mt-1 "
            to={"/posts/" + post.postId}
          >
            Read More...
          </Link>
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                onClick={() => deletePost(post)}
                className="ms-2 mt-1"
                color="danger"
              >
                Delete
              </Button>
            ) : (
              ""
            ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
