// import React, { useEffect } from "react";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import PageTabs from "./Components/Tabs";
import Home from './pages/Home'


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
         {/* <Header /> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
          <PageTabs /> 
          <Sidebar />
        </div>
      </Router>
    </ApolloProvider>


    
  );
}

export default App;



