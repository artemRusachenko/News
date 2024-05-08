import { Button, Item, Label, Segment } from "semantic-ui-react";
import { News } from "../../../app/models/news";

interface Props {
  news: News[];
  selectNews: (id: string) => void;
  deleteNews: (id: string) => void;

}
export default function NewsList({ news, selectNews, deleteNews}: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {news.map((n) => (
          <Item key={n.id}>
            <Item.Content>
              <Item.Header as="a">{n.title}</Item.Header>
              <Item.Meta>{n.date}</Item.Meta>
              <Item.Description>
                <div>{n.description}</div>
              </Item.Description>
              <Item.Extra>
              <Button onClick={() => selectNews(n.id)} floated="right" content="view" color="blue"></Button>
              <Button onClick={() => deleteNews(n.id)} floated="right" content="delete" color="red"></Button>
                <Label basic content={n.categoryName} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
