import "./App.css";
import useFetch from "./hooks/useFetch";
import { useAppContext } from "./providers/app-context/AppContext";
import { Board } from "./types/Board";
import { ServiceStatus } from "./types/Service";

function App() {
  const service = useFetch<Board[]>("/api/boards");
  const { isLoading } = useAppContext();

  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      {service.status === ServiceStatus.Loaded && (
        <div>
          {service.payload.map((b) => (
            <div>{b.id}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
