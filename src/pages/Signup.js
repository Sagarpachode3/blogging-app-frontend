import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //Submitting the form

  const submitForm = (event) => {
    event.preventDefault();

    // if (error.isError) {
    //   toast.error(
    //     "Form Data is invalid, Please check again and then Register !"
    //   );
    //   setError({ ...error, isError: false });
    //   return;
    // }
    console.log(data);
    //data validation

    //Call Server API for sending Data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success Log");
        toast.success("User Registered Successfully.");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error Log");

        //handle error in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  // Reset Data
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };
  //handle change
  const handleChange = (event, property) => {
    //console.log("name chnaged");
    //console.log(event.target.value);
    setData({ ...data, [property]: event.target.value });
  };
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Fill Information to Register !</h3>
              </CardHeader>

              <CardBody>
                {/* Signup form */}
                <Form onSubmit={submitForm}>
                  {/* Name Field */}
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter name here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  {/* Email Field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  {/* Password Field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  {/* About Field */}
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      placeholder="Write something about your self"
                      id="about"
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      style={{ height: "150px" }}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="danger">Register</Button>
                    <Button
                      className="ms-2"
                      color="secondary"
                      type="reset"
                      onClick={resetData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
