import RiFileExcel2Line from "@/../public/icons/RiFileExcel2Line.svg";
import useTableSearch from "@/hooks/useTableSearch";
import ExcelExportComponent from "@/@core/components/ExcelExportComponent/ExcelExportComponent";
import { useEffect, useState } from "react";
import { Axios } from "@/lib/axios/axios";
import usePrivateAxios from "@/lib/axios/usePrivateAxios";




function SearchTable ({ url, searhableFild }) {
  const { inputSearchValue, updateSearchValue, dataForExcel, setData } =
    useTableSearch();
  const AxiosPrivate = usePrivateAxios();
  const [isLoading, setIsLoading] = useState(false);
  const searchHandler = (value) => {
    updateSearchValue(value);
  };




  return (
    <div className="flex justify-between m-2 w-[99%] gap-1">
      <input
        value={inputSearchValue}
        onChange={(e) => searchHandler(e.target.value)}
        placeholder={searhableFild}
        className="flex items-center justify-center border-1 border-neutral-200 py-2 text-sm px-1 rounded-md w-full"
      />

      <ExcelExportComponent
        data={dataForExcel.length > 0 && dataForExcel}
        url={url}
        isLoading={isLoading}
      ></ExcelExportComponent>
    </div>
  );
}

export default SearchTable;
