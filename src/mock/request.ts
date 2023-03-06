import useSWR from 'swr';

const useRequest = (urlProps: string, bodyProps?: any) => {
  const fetcher = ([url, body]: [string, any]) =>
    fetch(url, { ...body }).then((res) => res.json());

  const { data, error, isLoading } = useSWR([urlProps, bodyProps], fetcher);
  return {
    data,
    error,
    isLoading,
  };
};
export default useRequest;
