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

const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const config = {
    placeholder: "Start typing ...",
  };
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  return (
    <div className="wrapper">
      <Card className="mt-2 shadow">
        <CardHeader>
          <h3>Express. Engage. Inspire. Start blogging now!</h3>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title of your post"
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
                value={content}
                config={config}
                onChange={(newContent) => setContent(newContent)}
              />
            </FormGroup>
            <FormGroup className="my-3">
              <Label for="category">Category of Post</Label>
              <Input
                type="select"
                id="category"
                //placeholder="Select category of your post"
              >
                {/* <option disabled defaultValue={"Select category of your post"}></option> */}
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTittle}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Container className="text-end">
              <Button color="primary">Create Post</Button>
              <Button className="ms-2" type="reset" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
          {content}
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
