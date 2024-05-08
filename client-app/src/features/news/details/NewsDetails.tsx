import { Button, Card } from "semantic-ui-react";
import { News } from "../../../app/models/news";

interface Props {
  news: News;
  cancelSelectNews: () => void;
  openForm: (id:string) => void;
}

export default function newsDetails({ news, cancelSelectNews, openForm }: Props) {
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
          <Button onClick={() => openForm(news.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectNews} basic color="red" content="Delete" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}