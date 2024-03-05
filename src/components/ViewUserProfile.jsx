import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
} from "reactstrap";
import userDefaultImg from "../images/userDefault.jpg";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const ViewUserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardBody>
        <h3 className="text-uppercase">User Information</h3>
        <Container className="text-center">
          <img
            style={{ maxWidth: "250px", maxHeight: "250px" }}
            src={user.image ? user.image : userDefaultImg}
            alt="User"
            className="img-fluid rounded-circle"
          />
        </Container>

        <Table hover bordered={true} className="mt-5">
          <tbody>
            <tr>
              <td>LCWSBLOGS ID</td>
              <td>LCWS{user?.id}</td>
            </tr>
            <tr>
              <td>User Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>User Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>About</td>
              <td>{user.about}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>
                {user.roles.map((role) => {
                  return <div key={role.id}>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>
        {currentUser ? (
          currentUser.id == user.id ? (
            <CardFooter className="text-center">
              <Button color="warning">Update Profile</Button>
            </CardFooter>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
