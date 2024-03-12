import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

import {getConfig} from "../config";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();
  const config = getConfig();
  const reset = () => { 
    fetch(`https://${config.domain}/dbconnections/change_password`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        client_id: config.clientId,
        email: user.email,
        connection: 'test'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
    console.error('Error:', error);
});
  }

  const sendVerificationEmail = () => {
    fetch(`http://152.42.180.14:3002/api/user/v1/verification/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.secToken}`,
      },
      body: JSON.stringify({
        email: user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
      <Row>
        <Col>
        <Button color="primary" className="mt-5" onClick={reset}>
          Send reset password email
        </Button>
        </Col>
        <Col>
        <Button color="primary" className="mt-5" onClick={sendVerificationEmail}>
          Send verification email
        </Button>
        </Col>
        </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
