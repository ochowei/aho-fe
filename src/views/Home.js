import React, { Fragment, useState, useEffect } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";



const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const userList = [
   
  ];
  const [state, setState] = useState({userList
  });
 
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
      const apiOrigin = "http://localhost:3001";
      const response = await fetch(`${apiOrigin}/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const responseData = await response.json();
      setState({ ...state, userList: responseData.userList});
    };
    fetchData();
  }, []);

  return (
    (isAuthenticated && user) ? (
      <Fragment>       
        <div>
          <h2>User List</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sign Up</th>
                <th>Login Count</th>
                <th>Last Session</th>
              </tr>
            </thead>
            <tbody>
              {state.userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.signUp}</td>
                  <td>{user.loginCount}</td>
                  <td>{user.lastSession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <Hero />
        <hr />
        <Content />
      </Fragment>
  ));
};

export default Home;
