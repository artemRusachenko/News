import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function newsDetails() {
  const { newsStore } = useStore();
  const { selectedNews: news, loadingInitial, loadNewsItem } = newsStore;
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
          <span>{news.date}</span>
        </Card.Meta>
        <Card.Description>{news.content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width="2">
          <Button
            as={Link}
            to={`/manage/${news.id}`}
            basic
            color="blue"
            content="Edit"
          />
          {/* onClick={() => openForm(news.id)} */}
          <Button as={Link}
            to={`/`} basic color="red" content="Cancel" />
          {/* onClick={cancellSelectedNews}  */}
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
