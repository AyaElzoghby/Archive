/* eslint-disable react/prop-types */
import { TableButton, Pagination, Spinner } from "./UI";

import {
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
} from "./tableStructure";

import {
  get,
  put,
  validationFunction,
  handleDateFormat,
  handleInlineDropdownFormat,
} from "./utilities";

import toast from "react-hot-toast";
import { arrowUp, arrowDown } from "../Grid/assets";
import { useQueryClient, useQuery, useMutation } from "react-query";

import { useState, useEffect, useCallback, useRef } from "react";

import { RenderCellContent, handleDropdownFormat } from "../Grid/utilities";
import { DropDown, MainInput, Checkbox, DateInput } from "../Inputs";
import { api } from "../../utilities";

const DynamicCell = ({
  dataTypeID,
  row,
  manipulatedRowIndex,
  rowIndex,
  dynamicDropDownsData,
  handleChangeInput,
  dynamicDropDownLabelKey = "",
}) => {
  const [specialCaseDropdownOptions, setSpecialCaseDropdownOptions] = useState(
    []
  );
  const [loadingSpecialCase, setLoadingSpecialCase] = useState(false);

  const generateDynamicCellType = (id) => {
    switch (id) {
      case 1:
        return { type: "text" };
      case 4:
        return { type: "date" };

      case 5:
        return { type: "checkbox" };

      case 6:
        return { type: "dropDown" };

      case 7:
        return { type: "dropDown", sp: "api_asset_PumpPostion_list" };

      case 8:
        return { type: "dropDown", sp: "api_admin_departments" };

      default:
        return { type: "number" };
    }
  };

  const cellObj = generateDynamicCellType(dataTypeID);
  // console.log(cellObj);

  const cellType = cellObj?.type;

  switch (cellType) {
    case "dropDown": {
      if (!row?.AdditionID) {
        console.error("AdditionID is undefined for row:", row);
        return <p className="text-red-500">Data unavailable</p>;
      }

      if (!dynamicDropDownsData) {
        console.error("dynamicDropDownsData is undefined or null");
        return <p className="text-red-500">Data unavailable</p>;
      }

      useEffect(() => {
        if (cellObj.sp) {
          const fetchSpecialCaseDropDown = async () => {
            setLoadingSpecialCase(true);
            try {
              const response = await api.get(`table/filter?sp=${cellObj.sp}`);
              console.log("Special case dropdown data:", response.data.data);
              setSpecialCaseDropdownOptions(
                handleDropdownFormat(
                  response.data.data,
                  "DepartmentID",
                  "DepartmentNameAr"
                )
              );
            } catch (error) {
              console.error("Error fetching special case dropdown:", error);
              setSpecialCaseDropdownOptions([]);
            } finally {
              setLoadingSpecialCase(false);
            }
          };

          fetchSpecialCaseDropDown();
        }
      }, []);

      const dataTypeKey = cellObj.sp ? 7 : dataTypeID;

      console.log(specialCaseDropdownOptions);

      const dropDownOptions = dynamicDropDownsData.filter(
        (item) => item.AdditionID === row?.AdditionID
      );

      const structuredDropdownOptions = handleDropdownFormat(
        dropDownOptions,
        "SelectID",
        "SelectName"
      );

      console.log(structuredDropdownOptions);

      const valueKey = cellObj.sp
        ? specialCaseDropdownOptions.find(
            (item) => item.value === row[`AdditionValue${dataTypeKey}`]
          )
        : structuredDropdownOptions.find(
            (item) => item.value === row[`AdditionValue${dataTypeKey}`]
          );

      if (manipulatedRowIndex !== rowIndex) {
        return <p className="overflow-hidden">{valueKey?.label || ""}</p>;
      }

      return (
        <DropDown
          placeHolder={row[dynamicDropDownLabelKey]}
          onChange={(value) =>
            handleChangeInput(`AdditionValue${dataTypeKey}`, value)
          }
          options={
            cellObj.sp ? specialCaseDropdownOptions : structuredDropdownOptions
          }
          haveSearch={true}
          value={valueKey?.label}
        />
      );
    }

    case "checkbox": {
      const valueKey = row[`AdditionValue${dataTypeID}`]
        ? row[`AdditionValue${dataTypeID}`]
        : 0;

      return (
        <div className="overflow-hidden">
          <Checkbox
            value={valueKey}
            isEditable={manipulatedRowIndex === rowIndex}
            onChange={(value) =>
              handleChangeInput(`AdditionValue${dataTypeID}`, value)
            }
          />
        </div>
      );
    }

    case "date": {
      const valueKey = row[`AdditionValue${dataTypeID}`];

      if (manipulatedRowIndex !== rowIndex) {
        return <p className="overflow-hidden">{handleDateFormat(valueKey)}</p>;
      }
      return (
        <DateInput
          value={valueKey}
          onChange={(value) =>
            handleChangeInput(`AdditionValue${dataTypeID}`, value)
          }
        />
      );
    }

    default: {
      const valueKey = row[`AdditionValue${dataTypeID}`];

      if (manipulatedRowIndex !== rowIndex) {
        return <p className="overflow-hidden">{valueKey}</p>;
      }

      return (
        <MainInput
          type={cellType}
          value={valueKey || valueKey === 0 ? valueKey : ""}
          inputName={valueKey}
          onChange={(value) =>
            handleChangeInput(`AdditionValue${dataTypeID}`, value)
          }
        />
      );
    }
  }
};

function InlineGrid({
  tableConfig = [],
  //   filltersComponent = [],
  params = {},
  OrderBy,
  rowKey,
  //   haveSearch = false,
  searchCol = "",
  rowPerPage = 10,
  dir = "rtl",
  //   DeleteRoute = "table",
  UpdRoute = "table/",
  //   InsRoute = "table",
  getRoute = "table",
  //   children,
  tableKey,
  isExpand,
  globalParams,
  haveCrud = true,
  //   onRowClick,
  //   onRowDblClick,
  //   rowCrud,
  //   haveEdit = true,
  //   haveIns = true,
  //   haveDel = true,
  dynamicColName = "#",
  dynamicDropDownsData = [],
  dynamicDropDownLabelKey = "",
}) {
  const [tableData, setTableData] = useState([]);
  const [manipulatedRow, setManipulatedRow] = useState({});
  const [manipulatedRowIndex, setManipulatedRowIndex] = useState(null);

  const cellWidths = tableConfig.map((config) =>
    config?.hidden ? 0 : config?.width || 0
  );
  cellWidths.unshift(150);
  cellWidths.push(300);

  const [columnWidths, setColumnWidths] = useState([...cellWidths]);

  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    PageSize: rowPerPage,
    totalPages: 1,
    OrderBy: OrderBy,
    orderDir: "desc",
    search: "",
    searchCol: searchCol,
  });

  const queryClient = useQueryClient();
  const defaultParamsRef = useRef({});
  const defaultGlobalParamsRef = useRef({});
  const stableParams = params || defaultParamsRef.current;
  const stableGlobalParams = globalParams || defaultGlobalParamsRef.current;

  const { data: fetchedData, isLoading } = useQuery(
    [`tableData-${tableKey || 0}`, stableParams, stableGlobalParams],
    () => get(getRoute, { ...params.trx, ...globalParams }),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 15, // 15 minutes
      refetchOnWindowFocus: false, // avoids refetch on window focus
      onSuccess: (data) => {
        console.log("Fetched Data on Success:", data); // Use the `data` argument
      },
    }
  );

  // console.log(manipulatedRow, "manipulatedRow  LocalGrid 1");

  const handlePageChange = (newPage) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const paginatedData = tableData.slice(
    (paginationData.currentPage - 1) * paginationData.PageSize,
    paginationData.currentPage * paginationData.PageSize
  );

  useEffect(() => {
    if (fetchedData) {
      setTableData(fetchedData.data);
      setPaginationData((prev) => ({
        ...prev,
        totalPages: Math.ceil(
          fetchedData.data.length / paginationData.PageSize
        ),
      }));
    }
  }, [fetchedData, paginationData.PageSize]);

  const updateMutation = useMutation(
    (row) => put(UpdRoute, { ...params.upd, ...globalParams }, row),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tableData-${tableKey || 0}`); // Invalidate cache
        toast.success("Row updated successfully.");
      },
      onError: (error) => toast.error(error.message),
    }
  );

  const handleUpdateRow = useCallback((row) => {
    if (!validationFunction(row, tableConfig, toast)) return;
    updateMutation.mutate(row);
    setManipulatedRow(null);
  }, []);

  // Start editing a row
  const handleStartEditRow = (id) => {
    const row = tableData.find((row) => row[rowKey] === id);
    //     console.log(row);
    setManipulatedRow(row);
  };

  const handleChangeInput = useCallback((key, value) => {
    console.log(key, value);

    setManipulatedRow((prevRow) => ({
      ...prevRow,
      [key]: value,
    }));
  }, []);

  const handleResize = useCallback((index, newWidth) => {
    setColumnWidths((prev) => {
      const updatedWidths = [...prev];
      updatedWidths[index] = newWidth;
      return updatedWidths;
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <Table>
          <TableHead>
            <TableRow isHead>
              {isExpand && (
                <TableCell isHead>
                  <div className=" flex flex-1"></div>
                </TableCell>
              )}
              {haveCrud && (
                <TableCell
                  isHead
                  width={columnWidths[0]}
                  colIndex={0}
                  onResize={handleResize}
                >
                  <p>#</p>
                </TableCell>
              )}

              {tableConfig.map((header, index) => {
                // console.log(header.type);
                return (
                  !header.hidden && (
                    <TableCell
                      key={index}
                      width={columnWidths[index + 1]}
                      colIndex={index + 1}
                      onResize={handleResize}
                      isHead
                    >
                      <button className="h-full w-full">
                        <div className="flex items-center justify-center">
                          {!header.children && (
                            <p className=" py-[2px] px-2">
                              {dir == "rtl"
                                ? header?.arCaption
                                : header?.enCaption}
                            </p>
                          )}

                          {header.children && (
                            <div className={`flex flex-1 flex-col`}>
                              <p className={`mb-1 `}>
                                {dir == "rtl"
                                  ? header?.arCaption
                                  : header?.enCaption}
                              </p>
                              <div className="flex justify-center border-t-2">
                                {header.children.map((child, index) => {
                                  return (
                                    <p
                                      key={index}
                                      className={`flex-1 self-center p-1 ${
                                        index === 0 ? "border-l-2" : ""
                                      }`}
                                    >
                                      {dir == "rtl"
                                        ? child?.arCaption
                                        : child?.enCaption}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {/* {header.type !== "sub" &&
                            paginationData.OrderBy === header.keyName && (
                              <img
                                src={
                                  paginationData.orderDir === "desc"
                                    ? arrowDown // Show descending arrow
                                    : arrowUp
                                  // Show ascending arrow
                                  // Show reset arrow when sorting is cleared (third click)
                                  // Default reset arrow for unsorted columns
                                }
                                className="w-[15px] h-[15px] cursor-pointer"
                              />
                            )} */}
                        </div>
                      </button>
                    </TableCell>
                  )
                );
              })}

              <TableCell
                isHead
                width={columnWidths[columnWidths.length - 1]}
                colIndex={columnWidths.length - 1}
                onResize={handleResize}
              >
                {dynamicColName}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData &&
              paginatedData.length > 0 &&
              paginatedData.map((row, rowIndex) => {
                return (
                  <TableRow key={row[rowKey]}>
                    {/* Action Buttons */}
                    <TableCell
                      width={columnWidths[0]}
                      colIndex={0}
                      onResize={handleResize}
                    >
                      {manipulatedRowIndex !== rowIndex ? (
                        <TableButton
                          theme="edit"
                          onClick={() => {
                            setManipulatedRowIndex(rowIndex);
                            handleStartEditRow(row[rowKey]);
                          }}
                        >
                          تعديل
                        </TableButton>
                      ) : (
                        <div className=" flex gap-1">
                          <TableButton
                            onClick={() => {
                              handleUpdateRow(manipulatedRow);
                              setManipulatedRowIndex(null);
                            }}
                          >
                            حفظ
                          </TableButton>
                          <TableButton
                            theme="cancel"
                            onClick={() => {
                              setManipulatedRowIndex(null);
                              setManipulatedRow(null);
                            }}
                          >
                            الغاء
                          </TableButton>
                        </div>
                      )}
                    </TableCell>

                    {/* Regular Table Cells */}
                    {tableConfig.map((item, cellIndex) => {
                      if (!item.hidden) {
                        return (
                          <TableCell
                            key={cellIndex}
                            width={columnWidths[cellIndex + 1]}
                            colIndex={cellIndex + 1}
                            onResize={handleResize}
                          >
                            <RenderCellContent row={row} item={item} />
                          </TableCell>
                        );
                      }
                      return null;
                    })}

                    {/* Dynamic Cell */}
                    <TableCell
                      width={columnWidths[columnWidths.length - 1]}
                      colIndex={columnWidths.length - 1}
                      onResize={handleResize}
                    >
                      <DynamicCell
                        dataTypeID={row.DataTypeID}
                        row={row}
                        manipulatedRowIndex={manipulatedRowIndex}
                        rowIndex={rowIndex}
                        dynamicDropDownsData={
                          dynamicDropDownsData ? dynamicDropDownsData : []
                        }
                        manipulatedRow={manipulatedRow}
                        handleChangeInput={handleChangeInput}
                        dynamicDropDownLabelKey={dynamicDropDownLabelKey}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}

      {isLoading && <Spinner />}

      {paginationData.totalPages > 1 && (
        <div className="flex justify-between  flex-row-reverse items-center">
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handlePageChange}
          />
          <p className="font-tajawal font-medium flex flex-row flex-nowrap min-w-[150px]  ">
            {`عدد العناصر : ${paginatedData.length}`}
          </p>
        </div>
      )}
    </>
  );
}

export default InlineGrid;
