import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useState } from "react";
import  Button  from "@/@core/components/Button/index";
import usePrivateAxios from "@/lib/axios/usePrivateAxios";
import { Icon } from "@iconify/react";

function ExcelExportComponent({ data, url }) {
  const [isLoading, setIsLoading] = useState(false);
  const AxiosPrivate = usePrivateAxios();
  const [exportData, setExportData] = useState(false);
  const exportToExcel = (DataForExpoet) => {
    const worksheet = XLSX.utils.json_to_sheet(DataForExpoet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "exportedData.xlsx");
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (data) {
        exportToExcel(data);
      } else {
        const response = await AxiosPrivate.get(url);
        console.log(response);
        exportToExcel([...response.data.data]);
      }
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<Icon icon="teenyicons:ms-excel-outline"></Icon>}
      onClick={handleClick}
    >
      خروجی اکسل
    </Button>
  );
}

export default ExcelExportComponent;