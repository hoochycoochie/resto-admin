import React from "react";
import { Container, Header, Image } from "semantic-ui-react";
import Layout from "./layout";
const logo =
  "https://cdn1.vectorstock.com/i/1000x1000/13/80/organic-food-restaurant-logo-vector-17131380.jpg";
const Home = ({ children }) => (
  <Layout>
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>

      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
    </Container>
  </Layout>
);

export default Home;
