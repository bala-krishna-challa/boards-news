import { useContext, useEffect, useState } from "react";
import { AppContext } from "../providers/app-context/AppContext";
import { Service, ServiceStatus } from "../types/Service";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const API_ROOT_URL = "http://localhost:8080";

function useFetch<T>(
  url: string,
  method: Method = "GET",
  body?: T
): Service<T> {
  const { setError, setIsLoading } = useContext(AppContext);
  const [result, setResult] = useState<Service<T>>({
    status: ServiceStatus.Init,
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions =
        method === "POST" || method === "PUT"
          ? {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          : { method };

      await fetch(`${API_ROOT_URL}${url}`, requestOptions)
        .then((res) => {
          if (!res.ok && res.status === 500)
            return Promise.reject(res.statusText);

          return res.json();
        })
        .then((res) => {
          if (res.status === ServiceStatus.Success) {
            setResult({ status: ServiceStatus.Loaded, payload: res.data });
          } else {
            setResult({ status: ServiceStatus.Fail, error: res.message });
          }

          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    };

    fetchData();

    setError(null);
    setIsLoading(true);
  }, [url, body, method, setError, setIsLoading]);

  return result;
}

export default useFetch;
