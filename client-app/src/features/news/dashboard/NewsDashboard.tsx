import { Grid } from "semantic-ui-react";
import { News } from "../../../app/models/news";
import NewsList from "./NewsList";
import NewsForm from "../form/NewsForm";
import NewsDetails from "../details/NewsDetails";

interface Props {
  news: News[];
  selectedNews: News | undefined;
  selectNews: (id: string) => void;
  cancelSelectNews: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (news: News) => void;
  deleteNews: (id: string) => void;
}

export default function NewsDashboard({
  news,
  selectedNews,
  selectNews,
  cancelSelectNews,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteNews,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <NewsList news={news} selectNews={selectNews} deleteNews={deleteNews} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedNews && !editMode&&  (
          <NewsDetails
            news={selectedNews}
            cancelSelectNews={cancelSelectNews}
            openForm={openForm}
          />
        )}
        {editMode && (
          <NewsForm
            closeForm={closeForm}
            news={selectedNews}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
