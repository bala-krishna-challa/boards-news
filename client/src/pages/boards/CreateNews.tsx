import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthEmitter } from "../../emitters/AuthEmitter";
import { useFetch } from "../../hooks/useFetch";
import { News } from "../../types/News";
import { PostNews } from "../../types/PostNews";
import { ServiceStatus } from "../../types/Service";
import GoBack from "./GoBack";
import NewsForm from "./NewsForm";

const CreateNews: React.FC = () => {
  // From route we would know if we have to create or edit or view news
  const { initiateRequest, result } = useFetch<PostNews, News>();
  const { push } = useHistory();

  const { boardId } = useParams<{
    boardId: string;
    newsId: string | undefined;
  }>();

  const [userEmail, setUserEmail] = useState<string>("");
  const { subscribe } = AuthEmitter;

  useEffect(() => {
    const subscription = subscribe(({ email }) => {
      setUserEmail(email);
    });

    return () => subscription.unsubscribe();
  }, [subscribe, setUserEmail]);

  const news = useMemo(
    () => ({
      title: "",
      body: "",
      author: "",
      boardId: +boardId,
    }),
    [boardId]
  );

  const createNews = useCallback(
    (news: PostNews) => {
      // Here we make request to update news...
      news.author = userEmail;
      initiateRequest(`/api/boards/${boardId}/news`, "POST", news);
    },
    [boardId, initiateRequest, userEmail]
  );

  if (result.status === ServiceStatus.Loaded) {
    push(`/boards/${boardId}/news`);
    return null;
  }

  return (
    <div>
      <GoBack />
      {result.status === ServiceStatus.Fail && (
        <p>Something went wrong while creating news. Please try again.</p>
      )}
      <NewsForm {...news} onSave={createNews} />
    </div>
  );
};

export default CreateNews;
