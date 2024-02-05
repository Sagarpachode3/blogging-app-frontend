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
import { useState } from "react";
import { login } from "../services/user-service";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    login(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success Log");
        toast.success("User Logged in SuccessFully");
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
    setData({ ...data, [property]: event.target.value });
  };
  return (
    <Base>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card className="mt-4" color="dark" inverse>
              <CardHeader>
                <h3>Enter Login Details</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
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
                        error.errors?.response?.data?.message ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.message}
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
                        error.errors?.response?.data?.message ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.message}
                    </FormFeedback>
                  </FormGroup>
                  <Container>
                    <Button color="primary">Login</Button>
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

export default Login;
