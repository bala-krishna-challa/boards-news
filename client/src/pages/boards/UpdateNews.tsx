import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { News } from "../../types/News";
import { PostNews } from "../../types/PostNews";
import { ServiceStatus } from "../../types/Service";
import GoBack from "./GoBack";
import NewsForm from "./NewsForm";

const UpdateNews: React.FC = () => {
  // From route we would know if we have to create or edit or view news
  const { initiateRequest: getNews, result: getResult } = useFetch<
    unknown,
    News
  >();
  const { initiateRequest: updateNews, result: postResult } = useFetch<
    News,
    News
  >();
  const { boardId, newsId, action } = useParams<{
    boardId: string;
    action: string;
    newsId: string;
  }>();
  const { push } = useHistory();

  useEffect(() => {
    getNews(`/api/boards/${boardId}/news/${newsId}`);
  }, [getNews, boardId, newsId, action]);

  const saveNews = (news: PostNews) => {
    // Here we make request to update news...
    updateNews(`/api/boards/${boardId}/news/${newsId}`, "POST", {
      ...news,
      id: +newsId,
    });
  };

  if (postResult.status === ServiceStatus.Loaded) {
    alert("News updated successfully!");
    push(`/boards/${boardId}/news`);
    return null;
  }

  return (
    <div>
      <GoBack />
      {getResult.status === ServiceStatus.Fail && (
        <p>
          Something went wrong while fetching news details! Please try again.
        </p>
      )}
      {postResult.status === ServiceStatus.Fail && (
        <p>Something went wrong while updating news! Please try again.</p>
      )}
      {getResult.status === ServiceStatus.Loaded && getResult.payload && (
        <NewsForm {...getResult.payload} onSave={saveNews} />
      )}
    </div>
  );
};

export default UpdateNews;
