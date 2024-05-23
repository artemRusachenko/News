import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";

export default observer(function newsDetails() {
  const { newsStore, userStore } = useStore();
  const { selectedNews: news, loadingInitial, loadNewsItem } = newsStore;
  const { isAdmin } = userStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadNewsItem(id);
  }, [id, loadNewsItem]);

  if (loadingInitial || !news) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{news.title}</Card.Header>
        <Card.Meta>
          <span>{format(news.date, "dd MMM yyyy h:mm aa")}</span>
        </Card.Meta>
        <Card.Description>{news.content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width="2">
          {isAdmin && (
            <Button
              as={Link}
              to={`/manage/${news.id}`}
              basic
              color="blue"
              content="Edit"
            />
          )}
          <Button as={Link} to={`/`} basic color="grey" content="Go back" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
