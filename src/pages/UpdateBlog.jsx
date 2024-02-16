import React, { useContext, useEffect, useRef, useState } from "react";
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { loadPosts, updatePost } from "../services/post-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react";

import { loadAllCategories } from "../services/category-service";

function UpdateBlog() {
  const editor = useRef(null);
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //load the blog from database

    loadPosts(blogId)
      .then((data) => {
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading the blog");
      });
  }, []);

  useEffect(() => {
    //console.log(post);
    //console.log(object);
    if (post) {
      if (post.user.id != object.user.data.id) {
        toast.error("This is not your post");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const doUpdatePost = (event) => {
    event.preventDefault();
    console.log(post);
    updatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((resp) => {
        console.log(resp);
        toast.success("Post Updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in update Post");
      });
  };

  const updateHtml = () => {
    return (
      <div className="wrapper">
        {/* {JSON.stringify(post)} */}
        <Card className="mt-2 shadow">
          <CardHeader>
            <h3
              style={{
                fontFamily: "cursive",
                color: "#FFFFFF",
                backgroundColor: "#3498db",
                padding: "10px",
              }}
            >
              Update post from here
            </h3>
          </CardHeader>

          <CardBody>
            {/* {JSON.stringify(post)} */}
            <Form onSubmit={doUpdatePost}>
              <FormGroup className="my-3">
                <Label for="title">Post title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter title of your post"
                  name="title"
                  value={post.title}
                  onChange={(event) => handleChange(event, "title")}
                />
              </FormGroup>
              <FormGroup className="my-3">
                <Label for="content">Post Content</Label>
                {/* <Input
                type="textarea"
                id="content"
                placeholder="Write content of your post here"
                style={{ height: "200px" }}
              /> */}
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  // config={config}
                  onChange={(newContent) =>
                    setPost({
                      ...post,
                      content: newContent,
                    })
                  }
                />
              </FormGroup>
              {/* file field */}
              <div className="mt-3">
                <Label for="image">Select post banner</Label>
                <Input type="file" id="image" onChange={""}></Input>
              </div>
              <div
                className="ms-2"
                style={{ color: "blue", fontSize: "small" }}
              >
                *Allowed types are PNG, JPEG, or JPG
              </div>

              <FormGroup className="my-3">
                <Label for="category">Category of Post</Label>
                <Input
                  type="select"
                  id="category"
                  name="categoryId"
                  onChange={(event) => handleChange(event, "categoryId")}
                  //defaultValue={0}
                  value={post.categoryId}
                  //placeholder="Select category of your post"
                >
                  <option disabled value={0}>
                    ---Select post category---
                  </option>
                  {/* <option disabled defaultValue={"Select category of your post"}></option> */}
                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTittle}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <Container className="text-end">
                <Button type="submit" color="primary">
                  Update Post
                </Button>
                <Button className="ms-2" type="reset" color="danger">
                  Reset Content
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Base>
      <Container>{post && updateHtml()}</Container>
    </Base>
  );
}

export default UpdateBlog;
