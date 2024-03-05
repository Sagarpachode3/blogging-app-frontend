import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/user-service";
import ViewUserProfile from "../../components/ViewUserProfile";
import { Col, Row } from "reactstrap";

const ProfileInfo = () => {
  const object = useContext(userContext);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  //console.log(userId);

  useEffect(() => {
    getUser(userId).then((data) => {
      console.log(data);
      setUser({ ...data });
    });
  }, []);

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    );
  };

  return <Base>{user ? userView() : "User Details Loading ..."}</Base>;
};

export default ProfileInfo;
