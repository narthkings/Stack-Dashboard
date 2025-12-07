'use client';
import React from 'react';

const getMatches = (query: string) => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }
  return false;
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleSizeChange = () => setMatches(getMatches(query));

    const matchMedia = window.matchMedia(query);
    handleSizeChange();

    matchMedia.addEventListener('change', handleSizeChange);

    return () => {
      matchMedia.removeEventListener('change', handleSizeChange);
    };
  }, [query]);

  return mounted ? matches : false;
};

export default useMediaQuery;
