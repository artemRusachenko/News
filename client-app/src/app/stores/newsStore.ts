import { makeAutoObservable, runInAction } from "mobx";
import { News } from "../models/news";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class NewsStore {
  newsRegistry = new Map<string, News>();
  selectedNews: News | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get newsByDate() {
    return Array.from(this.newsRegistry.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  }

  loadNews = async () => {
    this.setLoadingInitial(true);
    try {
      const news = await agent.News.list();
      news.forEach((n) => {
        runInAction(() => this.newsRegistry.set(n.id, n));
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadNewsItem = async (id: string) => {
    let news = this.getNews(id);
    if (news) {
      this.selectedNews = news;
      return news;
    } else {
      this.setLoadingInitial(true);
      try {
        news = await agent.News.details(id);
        this.newsRegistry.set(news.id, news);
        runInAction(() => {
          this.selectedNews = news;
        });
        this.setLoadingInitial(false);
        return news;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getNews = (id: string) => {
    return this.newsRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // selectNews = (id: string) => {
  //   this.selectedNews = this.newsRegistry.get(id);
  // };

  // cancellSelectedNews = () => {
  //   this.selectedNews = undefined;
  // };

  // openForm = (id?: string) => {
  //   id ? this.selectNews(id) : this.cancellSelectedNews();
  //   this.editMode = true;
  // };

  // closeForm = () => {
  //   this.editMode = false;
  // };

  createNews = async (news: News) => {
    this.loading = true;
    news.id = uuid();
    try {
      await agent.News.create(news);
      runInAction(() => {
        this.newsRegistry.set(news.id, news);
        this.selectedNews = news;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateNews = async (news: News) => {
    this.loading = true;
    try {
      await agent.News.update(news);
      runInAction(() => {
        this.newsRegistry.set(news.id, news);
        this.selectedNews = news;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteNews = async (id: string) => {
    this.loading = true;
    try {
      await agent.News.delete(id);
      runInAction(() => {
        this.newsRegistry.delete(id);
        //if (this.selectedNews?.id === id) this.cancellSelectedNews();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
