"use client";
import { useEffect, useState } from "react";
import MyTable from "./MyTable";
import SearchTable from "./SearchTable";
import AxiosPrivate from "@/lib/axios/axios";
import usePrivateAxios from "@/lib/axios/usePrivateAxios";
import { Spinner } from "@nextui-org/react";
function DashBoardTable({ columns, url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [PageSize, setPageSize] = useState(10);
  const axios = usePrivateAxios();
  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      await axios
        .get(
          `${url}?PageIndex=${page}&PageSize=${PageSize}&IsPagingEnabled=true`
        )
        .then((data) => {
          setData((prevItems) => [...prevItems, ...data.data.data]);
          setPage((prevPage) => prevPage + 1);
        });
    } catch (error) {
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  return (
    <>
      <SearchTable page={page} data={data} searhableFild="کد" url={url} />
      <MyTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        searhableFild="code"
      />
    </>
  );
}
export default DashBoardTable;
