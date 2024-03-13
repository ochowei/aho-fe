import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

import {getConfig} from "../config";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent =  () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const config = getConfig();


  const updateProfile = async () => {

  const token = await getAccessTokenSilently();
    
  fetch(`http://152.42.180.14:3002/api/user/v1/afterauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

    })
    .catch((error) => {
      console.error('Error:', error);
    }).finally(() => {
      window.location.href = "/";

    } );
  }

  if (user.sub.startsWith('google-oauth2|')) {
     updateProfile();

  }else{
    window.location.href = "/";
  }
  //redirect to the home page


  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
      
        <Col md>
          <h2>Hello, thanks for Login</h2>
        </Col>
     
      </Row>          
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
