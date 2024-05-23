import {
  Button,
  Container,
  Menu,
  Image,
  Label,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import CategoryList from "../../features/categories/CategoryList";
import Search from "./Search";


export default observer(function NavBar() {
  const { userStore, modalStore, newsStore } = useStore();
  const { user, logout, isAdmin } = userStore;
  const { setPredicate } = newsStore;



  return (
    <Menu pointing>
      <Container>
        <Menu.Item as={Link} to="/" onClick={() => setPredicate("categoryId", "")}>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px", width: "50px", height: "50px" }}
          ></img>
        </Menu.Item>
        <Menu.Item style={{ width: "40%" }}>
          <Search/>
        </Menu.Item>
        {<CategoryList />}
        {user ? (
          <>
            {isAdmin && (
              <>
                <Menu.Item as={Link} to="errors" name="Erorrs" />
                <Menu.Item>
                  <Button
                    as={Link}
                    to="/createNews"
                    positive
                    content="Create News"
                    onClick={() => setPredicate("categoryId", "")}
                  />
                </Menu.Item>
              </>
            )}
            <Menu.Item position="right">
              <Image src={"assets/user.png"} avatar spaced="right" />
              <Label>{user?.displayName}</Label>
              <Menu.Item onClick={logout} text="Logout" icon="power" />
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item position="right">
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                primary
                content="Sign in"
                style={{ marginRight: "10px" }}
              ></Button>
              <Button
                onClick={() => modalStore.openModal(<RegisterForm />)}
                primary
                content="Sign up"
                style={{ marginRight: "10px" }}
              ></Button>
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
});
