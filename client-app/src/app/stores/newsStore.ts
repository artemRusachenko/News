import { makeAutoObservable, runInAction } from "mobx";
import { News } from "../models/news";
import agent from "../api/agent";
import { NewNews } from "../models/newNews";

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
      (a, b) =>b.date.getTime() - a.date.getTime()
    );
  }

  loadNews = async () => {
    this.setLoadingInitial(true);
    try {
      const news = await agent.News.list();
      news.forEach((n) => {
        this.setNews(n);
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
        this.setNews(news);
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

  private setNews = (news: News) => {
    news.date = new Date(news.date);
    this.newsRegistry.set(news.id, news);
  };

  private getNews = (id: string) => {
    return this.newsRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };


  createNews = async (news: News, categoryId: string) => {
    this.loading = true;
    const newNews: NewNews = {
      id: news.id,
      date: news.date,
      title: news.title,
      description: news.description,
      content: news.content,
      categoryId: categoryId,
    };
    console.log(newNews);
    try {
      await agent.News.create(newNews);
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

  updateNews = async (news: News, categoryId: string) => {
    this.loading = true;
    const newNews: NewNews = {
      id: news.id,
      date: news.date,
      title: news.title,
      description: news.description,
      content: news.content,
      categoryId: categoryId,
    };
    console.log(newNews);
    try {
      await agent.News.update(newNews);
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
