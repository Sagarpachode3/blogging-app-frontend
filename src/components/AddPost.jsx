import React, { useEffect, useRef, useState } from "react";
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
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { doCreatePost, uploadPostImage } from "../services/post-service";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../auth";

const AddPost = () => {
  const editor = useRef(null);
  //const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);

  const [user, setUser] = useState(undefined);
  const [post, setPost] = useState({ title: "", content: "", categoryId: "" });
  const [image, setImage] = useState(null);
  // const config = {
  //   placeholder: "Start typing ...",
  // };
  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    //console.log(event.target.name);
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  //for getting content of JODIT Editor
  const ContentFieldChanged = (data) => {
    //console.log(event.target.name);
    setPost({ ...post, content: data });
  };

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //create post function

  const createPost = (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      toast.error("Post title cannot be empty !");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("Post content cannot be empty !");
      return;
    }
    if (post.categoryId.trim() === "") {
      toast.error("Please select post category !");
      return;
    }
    if (!validateImageType(image)) {
      toast.error("Invalid image type. Allowed types are PNG, JPEG, or JPG.");
      return;
    }
    console.log("Form Submitted !");
    //console.log(post);

    //submit the form on server
    post["userId"] = user.id;

    doCreatePost(post)
      .then((data) => {
        uploadPostImage(image, data.postId)
          .then((data) => {
            toast.success("Image Uploaded !!!");
          })
          .catch((error) => {
            toast.error("Error in uploading image ");
            console.log(error);
          });

        toast.success("Post Created");
        setPost({ title: "", content: "", categoryId: "" });
        //console.log(post);
      })
      .catch((error) => {
        toast.error("error");
        console.log(error);
      });
  };
  //handling file change event
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const validateImageType = (file) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className="wrapper">
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
            Express. Engage. Inspire. Start blogging now!
          </h3>
        </CardHeader>

        <CardBody>
          {/* {JSON.stringify(post)} */}
          <Form onSubmit={createPost}>
            <FormGroup className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title of your post"
                onChange={fieldChanged}
                name="title"
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
                onChange={ContentFieldChanged}
              />
            </FormGroup>
            {/* file field */}
            <div className="mt-3">
              <Label for="image">Select post banner</Label>
              <Input type="file" id="image" onChange={handleFileChange}></Input>
            </div>
            <div className="ms-2" style={{ color: "blue", fontSize: "small" }}>
              *Allowed types are PNG, JPEG, or JPG
            </div>

            <FormGroup className="my-3">
              <Label for="category">Category of Post</Label>
              <Input
                type="select"
                id="category"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
                //placeholder="Select category of your post"
              >
                <option disabled value={0}>
                  ---Select post category---
                </option>
                {/* <option disabled defaultValue={"Select category of your post"}></option> */}
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTittle}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Container className="text-end">
              <Button type="submit" color="primary">
                Create Post
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

export default AddPost;
