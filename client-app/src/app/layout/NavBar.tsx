import { Button, Container, Input, Menu } from "semantic-ui-react";
// import { useStore } from "../stores/store";
import { Link } from "react-router-dom";
// import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  // const {newsStore} = useStore();
  return (
    <Menu pointing>
      <Container>
        <Menu.Item as={Link} to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px", width: "50px", height: "50px" }}
          ></img>
        </Menu.Item>
        <Menu.Item style={{ width: "40%" }}>
          <Input icon="search" placeholder="Search..." size="large" />
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/createNews" positive content="Create News" />
          {/* onClick={() => newsStore.openForm()}  */}
        </Menu.Item>
        <Menu.Item as={Link} to="errors" name="Erorrs"/>
        <Menu.Item position="right">
          <Button
            primary
            content="Sign in"
            style={{ marginRight: "10px" }}
          ></Button>
          <Button
            primary
            content="Sign up"
            style={{ marginRight: "10px" }}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
