import { Button, Container, Input, Menu } from "semantic-ui-react";
// import { Link, NavLink } from "react-router-dom";

interface Props{
  openForm:() => void;
}

export default function NavBar({openForm} : Props) {
  return (
    <Menu pointing>
      <Container>
        <Menu.Item>
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
          <Button onClick={openForm} to="/createNews" positive content="Create News" />
        </Menu.Item>
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
