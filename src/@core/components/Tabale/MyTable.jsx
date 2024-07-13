import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { EyeIcon } from "@/@core/components/Tabale/icons/EyeIcon";
import { EditIcon } from "@/@core/components/Tabale/icons/EditIcon";
import { DeleteIcon } from "@/@core/components/Tabale/icons/DeleteIcon";
import useTableSearch from "@/hooks/useTableSearch";




const statusColorMap= {
  true: "success",
  false: "danger",
};

function DashBoardTable ({
  columns,
  data,
  isLoading,
  isError,
  searhableFild,
  url,
}) {
  const { inputSearchValue, setDataForExcel } = useTableSearch();

  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    if (inputSearchValue) {
      const newTableData = data.filter((d) =>
        d[searhableFild].includes(inputSearchValue)
      );
      setTableData(newTableData);
    } else {
      setTableData([...data]);
    }
  }, [inputSearchValue, data]);

  const [selectedItems, setSelectedItems] = useState<Set<React.Key>>(new Set([]));
  const selectedItemsArr = Array.from(selectedItems);

  const dataForExcel = Array.from(selectedItems).map(
    (index) => tableData[index]
  );

  useEffect(() => {
    setDataForExcel(dataForExcel);
  }, [selectedItems]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "isEnabled":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.isEnabled]}
            size="sm"
            variant="flat"
          >
            {cellValue == true && "فعال"}
            {cellValue == false && "تایید نشده"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="جزئیات">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="اصلاح">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="حذف">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className=" overflow-auto w-full flex flex-row h-full justify-center ">
      {isLoading && !isError ? (
        <Spinner
          label="در حال بارگیری..."
          color="default"
          labelColor="foreground"
        />
      ) : (
        <Table
          aria-label="table"
          className="dashboard-table border-none"
          shadow="none"
          color="danger"
          border={0}
          css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
          selectionMode="multiple"
          selectedKeys={selectedItems}
          onSelectionChange={setSelectedItems}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} className="text-start">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={tableData}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {isError && !isLoading && <h2>مشکلی پیش آمده</h2>}
    </div>
  );
}

export default DashBoardTable;
