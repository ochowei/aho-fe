import React, { Fragment, useState, useEffect } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";

const {Pagination, PaginationItem, PaginationLink} = require('reactstrap');

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const userList = [
   
  ];
  const [state, setState] = useState({userList, userTotal: -1, summary: {}, page: 1, pageSize: 25
  });
  const fetchData = async () => {
    const token = await getAccessTokenSilently();
    const apiOrigin = "https://152.42.180.14";
    //get page from url anchor of variable named page and default to 1
    const page = window.location.hash.split('=')[1] || 1;
    

    let response = await fetch(`${apiOrigin}/api/dashboard/v1/users?page=${page}&pageSize=${state.pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    let responseData = await response.json();

    const summaryResponse = await fetch(`${apiOrigin}/api/dashboard/v1/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const summaryResponseData = await summaryResponse.json();
    setState({ ...state, summary: summaryResponseData.data, userList: responseData.data.rows, userTotal: responseData.data.count});

  };
  useEffect(() => {    
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  //on page change, fetch data
  window.onhashchange = fetchData;

  const page = Number(window.location.hash.split('=')[1]) || 1;
  return (
    (isAuthenticated && user && (state.userTotal >= 0) ) ? (
      <Fragment>       
        <div>
          <h2>Summary</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Total Users</th>
                <th>Today's Session</th>
                <th>Last 7 Days Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state.userTotal}</td>
                <td>{state.summary.userSessionCount.todayTotal}</td>
                <td>{state.summary.userSessionCount.last7DaysAverage}</td>
              </tr>
            </tbody>
          </table>
          <h2>User List</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Type</th>
                <th>Sign Up</th>
                <th>Login Count</th>
                <th>Last Session</th>
              </tr>
            </thead>
            <tbody>
              {state.userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.nickname || user.email }</td>
                  <td>{user.sub.split('|')[0]}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.loginsCount}</td>
                  <td>{user.lastSession}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination aria-label="Page navigation">          
            
            <PaginationItem disabled={page < 2} >
              <PaginationLink href={`#page=${page-1}`} > 
                {page - 1}
              </PaginationLink>
            </PaginationItem>           
            
            <PaginationItem active>
              <PaginationLink href="#">
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={(page) * state.pageSize >= state.userTotal} >
              <PaginationLink href={`#page=${page+1}`} >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
    
         
          </Pagination>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <Hero />
        <hr />
        <Content />
      </Fragment>
    )
    
  );
};

export default Home;
