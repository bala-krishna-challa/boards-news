import { useCallback, useContext, useState } from "react";
import { AppContext } from "../providers/app-context/AppContext";
import { Service, ServiceStatus } from "../types/Service";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const API_ROOT_URL = "http://localhost:8080";

interface ServiceResponse<TypeIn, TypeOut> {
  initiateRequest: (url: string, method?: Method, body?: TypeIn) => void;
  result: Service<TypeOut | null>;
}

export function useFetch<TypeIn, TypeOut>(): ServiceResponse<TypeIn, TypeOut> {
  const { setError, setIsLoading } = useContext(AppContext);
  const [result, setResult] = useState<Service<TypeOut | null>>({
    status: ServiceStatus.Init,
  });

  const initiateRequest = useCallback(
    async (url: string, method: Method = "GET", body?: TypeIn) => {
      setError(null);
      setIsLoading(true);
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

          if (res.ok && res.status === 204) return Promise.resolve(null);

          return res.json();
        })
        .then((res) => {
          setIsLoading(false);
          if (res === null)
            setResult({ status: ServiceStatus.Loaded, payload: null });
          if (res.status === ServiceStatus.Success) {
            setResult({ status: ServiceStatus.Loaded, payload: res.data });
          } else {
            setResult({ status: ServiceStatus.Fail, error: res.message });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    },
    [setError, setIsLoading, setResult]
  );

  return { initiateRequest, result };
}
