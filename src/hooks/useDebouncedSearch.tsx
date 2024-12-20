import React, { useEffect } from "react";

function useDebouncedSearch(search: string, delay: number = 500): string {
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);
  return debouncedSearch;
}

export { useDebouncedSearch };
