/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getData } from "../services/data.service";

type FetchResponse<T> = {
  response: T | null;
  error: Error | null;
  isLoading: boolean;
  setResponse: (val: T | null) => void;
};

function useFetch<T>(
  url: string | null,
  dependencies: any[] = []
): FetchResponse<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getData<T>(url);
        setResponse(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, ...dependencies]);

  return { response, error, isLoading, setResponse };
}

export default useFetch;
