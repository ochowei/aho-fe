import React, {useEffect} from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import {getConfig} from "../config";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent =  () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const config = getConfig();
  const history = useHistory();

  const updateProfile = async (callback) => {

  const token = await getAccessTokenSilently();
    
  fetch(`https://152.42.180.14:40443/api/user/v1/afterauth`, {
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
      history.push('/');

    })
    .catch((error) => {
      console.error('Error:', error);
    }).finally(() => {
      
      history.push('/');
    } );
  }
  useEffect(() => {
    if (user.sub.startsWith('google-oauth2|')) {
       updateProfile();

    }else{
      history.push('/');
    }
    //redirect to the home page
  });

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
