import axios, { AxiosError, AxiosResponse } from "axios";
import { News as NewsItem } from "../models/news";
import { toast } from "react-toastify";
import { router } from "../rooter/Routes";
import { store } from "../stores/store";
import { Category } from "../models/categoty";
import { NewNews } from "../models/newNews";
import { User, UserFormValues } from "../models/user";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

// axios.interceptors.request.use((config) => {
//   const token = store.commonStore.token;
//   if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response! as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
      default:
          break;
        
    }
    return Promise.reject(error);
  }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if(token && config.headers) config.headers.Authorization =`Bearer ${token}`;
  return config;
})


const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const News = {
  list: (params: URLSearchParams) => axios.get<NewsItem[]>("/news", {params}),
  details: (id: string) => requests.get<NewsItem>(`/news/${id}`),
  update: (news: NewNews) => requests.put<void>(`/news/${news.id}`, news),
  create: (news: NewNews) => requests.post<void>(`/news`, news),
  delete: (id: string) => requests.del<void>(`/news/${id}`),
  // listByCategory: (id: string) => requests.get<NewsItem[]>(`/news/category/${id}`)
};

const Categories = {
   list: () => requests.get<Category[]>("/categories"),
}

const Account = {
  current: () => requests.get<User>("/account"),
  register: (user: UserFormValues) => requests.post<User>('account/register', user),
  login: (user: UserFormValues) => requests.post<User>('account/login', user),
}

const agent = {
  News,
  Categories,
  Account,
};

export default agent;
