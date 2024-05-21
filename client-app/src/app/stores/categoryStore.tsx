import { makeAutoObservable, runInAction } from "mobx";
import { Category } from "../models/categoty";
import agent from "../api/agent";

export default class CategoryStore {
  categoriesRegistry = new Map<string, Category>();
  loadingInitial = false;
  selectedCategory: Category | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get categeryOptions() {
    return Array.from(this.categoriesRegistry.values()).map((category) => ({
      text: category.name,
      value: category.name,
    }));
  }

  loadCategories = async () => {
    this.setLoadingInitial(true);
    try {
      const categories = await agent.Categories.list();
      categories.forEach((c) => {
        runInAction(() => this.categoriesRegistry.set(c.id, c));
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  selectCategory = (name: any) => {
    this.selectedCategory = Array.from(this.categoriesRegistry.values()).find(category => category.name === name);
    runInAction(() => console.log(this.selectedCategory));
  };

  private setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
