import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { login } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const submitForm = (event) => {
    event.preventDefault();
    console.log(loginDetails);

    //validation
    if (
      loginDetails.username.trim() == "" ||
      loginDetails.password.trim() == ""
    ) {
      toast.error("Username and Password are mandatory !");
      return;
    }

    //submit the data to server to generate token
    login(loginDetails)
      .then((data) => {
        console.log(data);

        //save the data to local storage

        doLogin(data, () => {
          console.log("Login detail is saved to local storage.");
          //redirect to user dashboard page
          //navigate("/user/dashboard");
        });
        toast.success("User logged in !");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          //toast.error(error.response.data.message);
          toast.error("Invalid username or password !");
        } else {
          toast.error("Something went wrong on server!");
        }
      });
  };

  //handle change
  const handleChange = (event, property) => {
    setLoginDetails({ ...loginDetails, [property]: event.target.value });
  };

  const resetData = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
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
                    <Label for="email">Username *</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email as username here"
                      id="email"
                      onChange={(e) => handleChange(e, "username")}
                      value={loginDetails.username}
                    />
                  </FormGroup>

                  {/* Password Field */}
                  <FormGroup>
                    <Label for="password">Password *</Label>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={loginDetails.password}
                    />
                  </FormGroup>

                  <Container className="text-center">
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
                <p className="mandatory-text">* Marked fields are mandatory.</p>
                <a href="/signup" className="register-link">
                  New user ? Register here !
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
