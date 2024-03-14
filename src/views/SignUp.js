import React from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";

import { useAuth0 } from "@auth0/auth0-react";
const handleSignup = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const user = { email, password };
    const response = await fetch("https://152.42.180.14/api/auth0db/v1/create", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
        "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    const { getA } = useAuth0;
}   

 const SignupComponent = () => {
//   const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <Form onSubmit={handleSignup}>
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="Email"
      type="email"
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="Password"
      type="password"
    />
  </FormGroup>
  {' '}
  <Button>
    Submit
  </Button>
</Form>
    </Container>
  );
};

export default SignupComponent;
