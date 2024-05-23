import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default observer(function NewsList() {
  const { newsStore, userStore } = useStore();
  const { deleteNews, newsByDate, loading } = newsStore;
  const { isAdmin } = userStore;

  const [target, setTarget] = useState("");

  function handleNewsDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteNews(id);
  }

  if(newsByDate.length === 0) return <h1>There is no news</h1>

  return (
    <Segment>
      <Item.Group divided>
        {newsByDate.map((n) => (
          <Item key={n.id}>
            <Item.Content>
              <Item.Header as="a">{n.title}</Item.Header>
              <Item.Meta>{format(n.date, "dd MMM yyyy h:mm aa")}</Item.Meta>
              <Item.Description>
                <div>{n.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/news/${n.id}`}
                  floated="right"
                  content="view"
                  color="blue"
                ></Button>
                {isAdmin && (
                  <Button
                    name={n.id}
                    loading={loading && target === n.id}
                    onClick={(e) => handleNewsDelete(e, n.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  ></Button>
                )}
                <Label basic content={n.categoryName} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
