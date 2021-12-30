import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Route,
  RouteComponentProps,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Board } from "../types/Board";
import { ServiceStatus } from "../types/Service";
import { Input } from "../UI/controls/Input";
import BoardNews from "./boards/BoardNews";
import CreateNews from "./boards/CreateNews";
import UpdateNews from "./boards/UpdateNews";

const Boards: React.FC<RouteComponentProps> = () => {
  const { initiateRequest, result } = useFetch<unknown, Board[]>();
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const { push } = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    initiateRequest("/api/boards");
  }, [initiateRequest]);

  const boardChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedBoard(value);
      if (value) {
        push(`${path}/${value}/news`);
      } else {
        push(`${path}`);
      }
    },
    [path, push]
  );

  console.log("boards loading...");

  const boardOptions = useMemo(
    () =>
      result.status === ServiceStatus.Loaded && result.payload
        ? [
            { value: "", displayText: "Select a board" },
            ...result.payload.map((board) => ({
              value: board.id,
              displayText: board.name,
            })),
          ]
        : [],
    [result]
  );

  const boardSelectConfig = useMemo(
    () => ({
      elementType: "select",
      value: selectedBoard,
      elementConfig: { options: boardOptions },
      changeHandler: boardChangeHandler,
    }),
    [boardChangeHandler, boardOptions, selectedBoard]
  );

  return (
    <>
      {result.status === ServiceStatus.Fail && <div>{result.error}</div>}
      {result.status === ServiceStatus.Loaded && (
        <div>
          <Input {...boardSelectConfig} />
          {!selectedBoard && <p>Please select a board to display news!</p>}
          <Route path="/boards/:boardId/news" exact component={BoardNews} />
          <Route
            path="/boards/:boardId/news/:action"
            exact
            component={CreateNews}
          />
          <Route
            path="/boards/:boardId/news/:newsId/:action"
            exact
            component={UpdateNews}
          />
        </div>
      )}
    </>
  );
};

export default Boards;
