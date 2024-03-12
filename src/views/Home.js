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
      const apiOrigin = "http://152.42.180.14:3002";
      const response = await fetch(`${apiOrigin}/api/dashboard/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const responseData = await response.json();
      console.log(responseData.data);
      setState({ ...state, userList: responseData.data.rows});
    };
    fetchData();
  }, []);

  return (
    (isAuthenticated && user ) ? (
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
                  <td>{user.nickname || user.email }</td>
                  <td>{user.createdAt}</td>
                  <td>{user.loginsCount}</td>
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
