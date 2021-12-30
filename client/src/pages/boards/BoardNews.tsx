import {
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { News } from "../../types/News";
import { ServiceStatus } from "../../types/Service";
import NewsTile from "../../components/NewsTile";
import { AuthEmitter } from "../../emitters/AuthEmitter";
import { useEffect, useState } from "react";

const BoardNews: React.FC<RouteComponentProps> = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const history = useHistory();
  const location = useLocation();
  const { initiateRequest: loadNews, result: newsResult } = useFetch<
    unknown,
    News[]
  >();
  const { initiateRequest: deleteNews, result: deleteNewsResult } = useFetch<
    unknown,
    unknown
  >();

  const [userEmail, setUserEmail] = useState<string>("");
  const { subscribe } = AuthEmitter;

  useEffect(() => {
    loadNews(`/api/boards/${boardId}/news`);
  }, [loadNews, boardId]);

  useEffect(() => {
    const subscription = subscribe(({ email }) => {
      setUserEmail(email);
    });

    return () => subscription.unsubscribe();
  }, [subscribe, setUserEmail]);

  if (deleteNewsResult.status === ServiceStatus.Loaded) {
    history.push(`/`);
    setTimeout(() => history.replace(`/boards/${boardId}/news`));
    return null;
  }

  const newsHandler = (newsId: number, action: string) => {
    if (action === "delete") {
      deleteNews(`/api/boards/${boardId}/news/${newsId}`, "DELETE");
    } else {
      history.push(`${location.pathname}/${newsId}/${action}`);
    }
  };

  console.log("Boardsnews loading...");

  const newsActions = (news: News) => ({
    onView: () => newsHandler(news.id, "view"),
    onEdit: () => newsHandler(news.id, "edit"),
    onDelete: () => newsHandler(news.id, "delete"),
  });

  const allowEdit = (news: News): boolean => news.author === userEmail;

  return (
    <>
      <div>
        <div>
          <button onClick={() => history.push(`${location.pathname}/create`)}>
            Add News
          </button>
        </div>
        {newsResult.status === ServiceStatus.Fail && (
          <div>{newsResult.error}</div>
        )}
        {newsResult.status === ServiceStatus.Loaded && newsResult.payload && (
          <div>
            {newsResult.payload.length === 0 && (
              <p>No news available to show. Please add news.</p>
            )}
            {newsResult.payload.length > 0 &&
              newsResult.payload.map((news) => (
                <NewsTile
                  allowEdit={allowEdit(news)}
                  key={news.id}
                  title={news.title}
                  body={news.body}
                  {...newsActions(news)}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BoardNews;
