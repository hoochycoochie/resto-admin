import React from "react";
import {
  Container,
  Divider,
//  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ROOT_PATH, LOGIN_PATH } from "../utils/static_constants";
import { FormattedMessage } from "react-intl";
import { colors } from "../utils/constants";
const logo =
  "https://cdn1.vectorstock.com/i/1000x1000/13/80/organic-food-restaurant-logo-vector-17131380.jpg";
const Layout = ({ children }) => (
  <div>
    <Menu
      fixed="top"
      inverted
      color="purple"
      style={{ backgroundColor: colors.VIOLET }}
    >
      <Container>
        <Menu.Item as={Link} to={ROOT_PATH} header>
          <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
          SenYobante Entreprise
        </Menu.Item>
        <Menu.Item as={Link} to={ROOT_PATH}>
          <FormattedMessage id="home" />
        </Menu.Item>
        <Menu.Item as={Link} to={LOGIN_PATH}>
          <FormattedMessage id="login" />
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: 10 }}>
      {children}
    </Container>

    <Segment
      inverted
      vertical
      style={{
        margin: "5em 0em 0em",
        padding: "5em 0em",
        backgroundColor: colors.VIOLET
      }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 1" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
              <List.Item as="a">Link Two</List.Item>
              <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 2" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
              <List.Item as="a">Link Two</List.Item>
              <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 3" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
              <List.Item as="a">Link Two</List.Item>
              <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as="h4" content="Footer Header" />
            <p>
              Extra space for a call to action inside the footer that could help
              re-engage users.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size="mini" src={logo} />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);

export default Layout;
