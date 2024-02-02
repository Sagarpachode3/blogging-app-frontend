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

const Signup = () => {
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
                <Form>
                  {/* Name Field */}
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter name here"
                      id="name"
                    />
                  </FormGroup>
                  {/* Email Field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email here"
                      id="email"
                    />
                  </FormGroup>
                  {/* Password Field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      id="password"
                    />
                  </FormGroup>
                  {/* About Field */}
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      placeholder="Write something about your self"
                      id="password"
                      style={{ height: "150px" }}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="danger">Register</Button>
                    <Button className="ms-2" color="secondary" type="reset">
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
