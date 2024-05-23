import { Menu } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function CategoryList() {
  const { categoryStore, newsStore } = useStore();
  const { loadCategories, categoriesRegistry, categories, loadingInitial } =
    categoryStore;
  const { predicate, setPredicate } = newsStore;

  useEffect(() => {
    if (categoriesRegistry.size == 0) loadCategories();
  }, [loadCategories, categoriesRegistry.size]);

  // if (loadingInitial) return <LoadingComponent />;

  return (
    <Menu pointing>
      {categories.map((c) => (
        <Menu.Item
          key={c.id}
          content={c.name}
          active={predicate.get("categoryId") === c.id}
          onClick={() => setPredicate("categoryId", c.id)}
          as={Link} to="/"
        />
      ))}
    </Menu>
  );
});
