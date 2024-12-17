/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
  cloneElement,
} from "react";
import { TableButton, Modal, DraftModal, Pagination, Spinner } from "./UI";
import {
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  TableToolBar,
} from "./tableStructure";
import {
  get,
  put,
  post,
  Delete,
  validationFunction,
  RenderCellContent,
} from "./utilities";
import toast from "react-hot-toast";
import { deleteIcon, arrowUp, arrowDown } from "./assets";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { CrudButton } from "../UI";

function LocalGrid({
  tableConfig = [],
  filltersComponent = [],
  params = {},
  OrderBy,
  rowKey,
  haveSearch = false,
  searchCol = "",
  rowPerPage = 10,
  dir = "rtl",
  DeleteRoute = "table",
  UpdRoute = "table/",
  InsRoute = "table",
  getRoute = "table",
  children,
  tableKey,
  isExpand,
  globalParams,
  haveCrud = true,
  onRowClick,
  onRowDblClick,
  rowCrud,
  haveEdit = true,
  haveIns = true,
  haveDel = true,
  hasToolBar = false,
  toolBarContent,
}) {
  const [tableData, setTableData] = useState([]);
  const [manipulatedRow, setManipulatedRow] = useState({});
  const [showModal, setShowModal] = useState(null);
  const [expandElementID, setExpandElementID] = useState(null);

  const cellWidths = tableConfig.map((config) =>
    config?.hidden ? 0 : config?.width || 0
  );
  cellWidths.unshift(150);

  const [columnWidths, setColumnWidths] = useState([...cellWidths]);

  let toolBarWidth = columnWidths.reduce(
    (total, currentWidth) => total + currentWidth,
    0
  );

  if (isExpand) {
    toolBarWidth += 50;
  }

  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    PageSize: rowPerPage,
    totalPages: 1,
    OrderBy: OrderBy,
    orderDir: "desc",
    search: "",
    searchCol: searchCol,
  });

  const [crudModal, setCrudModal] = useState(false);

  const [crudModalContent, setCrudModalContent] = useState({
    modalMessage: "",
    body: {},
  });
  const [crudLoader, setCrudLoader] = useState("");
  const queryClient = useQueryClient();
  const defaultParamsRef = useRef({});
  const defaultGlobalParamsRef = useRef({});
  const stableParams = params || defaultParamsRef.current;
  const stableGlobalParams = globalParams || defaultGlobalParamsRef.current;

  const {
    data: fetchedData,
    refetch,
    isLoading,
  } = useQuery(
    [`tableData-${tableKey || 0}`, stableParams, stableGlobalParams],
    () => get(getRoute, { ...params.trx, ...globalParams, ...paginationData }),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 15, // 15 minutes
      refetchOnWindowFocus: false, // avoids refetch on window focus
      // onSuccess: (data) => {
      //   console.log("Fetched Data on Success:", data); // Use the `data` argument
      // },
    }
  );

  //   console.log(fetchedData);

  // console.log(manipulatedRow, "manipulatedRow  LocalGrid 1");
  useEffect(() => {
    if (fetchedData) setTableData(fetchedData.data);
  }, [fetchedData]);

  const deleteMutation = useMutation(
    (row) =>
      Delete(DeleteRoute, {
        [rowKey]: row[rowKey],
        ...params.del,
        ...globalParams,
      }),

    {
      onSuccess: () => {
        setCrudLoader("");
        hideModel();
        queryClient.invalidateQueries(`tableData-${tableKey || 0}`); // Invalidate cache
        toast.success("Row deleted successfully.");
      },
      onError: (error) => {
        setCrudLoader("");
        toast.error(error.response.data.message);
      },
    }
  );

  const addMutation = useMutation(
    (row) => post(InsRoute, { ...params.ins, ...globalParams }, row),
    {
      onSuccess: () => {
        setCrudLoader("");
        hideModel();
        queryClient.invalidateQueries(`tableData-${tableKey || 0}`); // Invalidate cache
        toast.success("Row added successfully.");
      },
      onError: (error) => {
        hideModel();
        toast.error(error.response.data.message);
      },
    }
  );

  const updateMutation = useMutation(
    (row) => put(UpdRoute, { ...params.upd, ...globalParams }, row),
    {
      onSuccess: () => {
        setCrudLoader("");
        hideModel();
        queryClient.invalidateQueries(`tableData-${tableKey || 0}`); // Invalidate cache
        toast.success("Row updated successfully.");
      },
      onError: (error) => {
        hideModel();
        toast.error(error.response.data.message);
      },
    }
  );

  const handleDeleteRow = useCallback((row) => {
    setCrudLoader("delete");

    deleteMutation.mutate(row);
  }, []);

  const handleUpdateRow = useCallback((row) => {
    if (!validationFunction(row, tableConfig, toast)) return;
    setCrudLoader("edit");
    updateMutation.mutate(row);
  }, []);

  const handleAddRow = useCallback((row) => {
    if (!validationFunction(row, tableConfig, toast)) return;
    setCrudLoader("add");
    addMutation.mutate(row);
  }, []);

  const hideModel = () => {
    setShowModal("");
    setManipulatedRow({});
  };

  const handleStartEditRow = (id) => {
    const row = tableData.find((row) => row[rowKey] === id);
    setManipulatedRow(row);
    setShowModal("edit");
  };

  const handleExpand = (row) => {
    if (expandElementID === row[rowKey]) {
      setExpandElementID(null);
    } else {
      setExpandElementID(row[rowKey]);
    }
  };

  const handleChangeInput = useCallback((key, value) => {
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

  const handleSearch = useCallback((event) => {
    setPaginationData((prev) => ({
      ...prev,
      search: event.target.value,
      currentPage: 1,
    }));
  }, []);

  // Filtered and Paginated Data
  const filteredData = tableData.filter((row) =>
    searchCol
      ? row[searchCol]
          .toString()
          .toLowerCase()
          .includes(paginationData.search.toLowerCase())
      : true
  );

  const paginatedData = filteredData.slice(
    (paginationData.currentPage - 1) * paginationData.PageSize,
    paginationData.currentPage * paginationData.PageSize
  );

  const handlePageChange = (newPage) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const handleSort = (columnKey) => {
    setPaginationData((prev) => ({
      ...prev,
      OrderBy: columnKey,
      orderDir: prev.orderDir === "desc" ? "asc" : "desc",
    }));

    setTableData((prevData) => {
      return [...prevData].sort((a, b) => {
        const aValue = a[columnKey];
        const bValue = b[columnKey];
        if (aValue === bValue) return 0;
        if (paginationData.orderDir === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    });
  };

  //  handle Crud Modal

  useEffect(() => {
    setPaginationData((prev) => ({
      ...prev,
      totalPages: Math.ceil(filteredData.length / paginationData.PageSize),
    }));
  }, [filteredData.length, paginationData.PageSize]);

  return (
    <>
      {showModal === "add" && (
        <DraftModal
          title
          tableConfig={tableConfig}
          type={"add"}
          open={showModal === "add"}
          loading={crudLoader == "add"}
          onClose={showModal === "add" ? hideModel : null}
          handleChange={handleChangeInput}
          manipulatedRow={manipulatedRow}
          onSubmit={() => handleAddRow(manipulatedRow)}
          handleHideModal={hideModel}
          keyName={rowKey}
        />
      )}

      {showModal === "edit" && (
        <DraftModal
          title
          tableConfig={tableConfig}
          open={showModal === "edit"}
          loading={crudLoader == "edit"}
          onClose={showModal === "edit" ? hideModel : null}
          handleChange={handleChangeInput}
          manipulatedRow={manipulatedRow}
          onSubmit={() => handleUpdateRow(manipulatedRow)} // Fixed here
          handleHideModal={hideModel}
          keyName={rowKey}
        />
      )}

      {showModal === "del" && (
        <Modal open={showModal === "del"} onClose={hideModel}>
          <div className="relative">
            <button
              onClick={hideModel}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <span className="sr-only">Close</span>
            </button>

            <div className="flex flex-col items-center mb-4">
              <div className="text-red-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01M12 3a9 9 0 11-9 9 9 9 0 019-9z"
                  />
                </svg>
              </div>

              <p className="text-lg font-semibold text-gray-800 text-center mb-2">
                هل أنت متأكد من حذف هذا الحقل؟
              </p>
              <p className="text-sm text-gray-600 text-center mb-6">
                يرجى العلم أنه سوف تفقد كافة البيانات الخاصة بهذا الحقل
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  handleDeleteRow(manipulatedRow);
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-lg  focus:outline-none flex items-center gap-2"
              >
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  width="16"
                  height="16"
                />
                {crudLoader == "delete" ? (
                  <Spinner
                    parentStyle={"min-h-4"}
                    childStyle={"h-4 w-4"}
                  ></Spinner>
                ) : (
                  "حذف"
                )}
              </button>

              <button
                onClick={hideModel}
                disabled={crudLoader == "delete"}
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 focus:outline-none"
              >
                {/* <img src={undo} alt="Delete Icon" width="16" height="16" /> */}
                إلغاء
              </button>
            </div>
          </div>
        </Modal>
      )}

      {crudModal && (
        <Modal
          open={crudModal}
          onClose={crudModal ? () => setCrudModal(false) : null}
        >
          <div className="  min-h-[200px] flex flex-col justify-between">
            <p className="text-lg font-semibold text-gray-800 text-center mb-2">
              {crudModalContent.modalMessage}
            </p>
            <div className="flex justify-center items-center gap-4">
              <CrudButton
                onsuccess={() => {
                  setCrudModal(false);
                  toast.success("تمت العملية بنجاح");
                  refetch();
                }}
                title={"تأكيد"}
                body={crudModalContent.body}
              />

              <button
                onClick={() => setCrudModal(false)}
                className="bg-[#F9EAEB] text-[#F15555] hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg  focus:outline-none duration-300"
              >
                {/* <img src={undo} alt="Delete Icon" width="16" height="16" /> */}
                إلغاء
              </button>
            </div>
          </div>
        </Modal>
      )}

      {filltersComponent.length > 1 && (
        <Modal open={showModal === "filters"} onClose={hideModel}>
          {filltersComponent.map((item, index) => {
            return item;
          })}
        </Modal>
      )}

      {hasToolBar && (
        <TableToolBar
          toolBarContent={toolBarContent}
          toolBarWidth={toolBarWidth}
        >
          {haveSearch && (
            <input
              type="text"
              placeholder="بحث"
              value={paginationData.search}
              onChange={handleSearch}
              className=" border-2 p-2 border-gray-300 rounded-md outline-none"
            />
          )}

          {filltersComponent.length == 0 ? (
            <></>
          ) : filltersComponent.length > 1 ? (
            <button
              onClick={() => {
                setShowModal("filters");
              }}
            >
              تصفيه
            </button>
          ) : (
            filltersComponent[0]
          )}
        </TableToolBar>
      )}
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
                  {haveIns === true ? (
                    <div className="flex flex-1 py-1 px-2">
                      <TableButton
                        theme
                        onClick={() => {
                          const configObject = tableConfig.reduce(
                            (acc, item) => {
                              acc[item.keyName] = item.defaultValue
                                ? item.defaultValue
                                : item.type === "checkbox"
                                ? false // Default value for checkbox
                                : "";
                              return acc;
                            }
                          );
                          setManipulatedRow(configObject);
                          setShowModal("add");
                        }}
                      >
                        اضافه
                      </TableButton>
                    </div>
                  ) : (
                    <p>#</p>
                  )}
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
                      <button
                        className="h-full w-full"
                        onClick={() => handleSort(header.keyName)}
                      >
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
                          {header.type !== "sub" &&
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
                            )}
                        </div>
                      </button>
                    </TableCell>
                  )
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => {
              const crudHandler = rowCrud
                ? {
                    edit: !haveEdit ? false : rowCrud(row).edit ?? true,
                    del: !haveDel ? false : rowCrud(row).del ?? true,
                  }
                : {
                    edit: haveEdit ? true : false,
                    del: haveDel ? true : false,
                  };

              return (
                <Fragment key={rowIndex}>
                  <TableRow
                    handleClick={() => {
                      if (manipulatedRow === row) {
                        setManipulatedRow("");
                      } else {
                        setManipulatedRow(row);
                      }
                      onRowClick && onRowClick(row);
                    }}
                    handleDblClick={() => {
                      setManipulatedRow(row);
                      onRowDblClick && onRowDblClick(row);
                    }}
                    style={`${
                      row[rowKey] === manipulatedRow[rowKey]
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >
                    {isExpand && (
                      <TableCell width={10}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="w-4 h-4"
                            onClick={() => handleExpand(row)}
                          >
                            {expandElementID === row[rowKey] ? "-" : "+"}
                          </button>
                        </div>
                      </TableCell>
                    )}

                    {haveCrud && (
                      <TableCell
                        width={columnWidths[0]}
                        colIndex={0}
                        onResize={handleResize}
                      >
                        <div className="flex items-center justify-center gap-2 overflow-hidden">
                          {crudHandler.edit && (
                            <TableButton
                              theme="edit"
                              onClick={() => handleStartEditRow(row[rowKey])}
                            >
                              تعديل
                            </TableButton>
                          )}
                          {crudHandler.del && (
                            <TableButton
                              theme="cancel"
                              onClick={() => {
                                setManipulatedRow(row);
                                setShowModal("del");
                              }}
                            >
                              حذف
                            </TableButton>
                          )}
                        </div>
                      </TableCell>
                    )}

                    {tableConfig.map((item, cellIndex) => {
                      // console.log("Current item:", item); // Log each item

                      if (!item.hidden) {
                        if (item.type === "button") {
                          // Render buttons inside a TableCell
                          return (
                            <TableCell
                              key={cellIndex}
                              width={columnWidths[cellIndex + 1]}
                              colIndex={cellIndex + 1}
                              onResize={handleResize}
                            >
                              {item.buttons.map((button, index) => (
                                <TableButton
                                  key={`${cellIndex}-${index}`}
                                  style={button?.hidden?.(row) ? "hidden" : ""}
                                  theme={button.theme}
                                  onClick={() => {
                                    setCrudModal(true);
                                    setCrudModalContent((prev) => ({
                                      ...prev,
                                      modalMessage: button.modalMessage,
                                      body: button.requestParam(row),
                                    }));
                                  }}
                                >
                                  {button.children}
                                </TableButton>
                              ))}
                            </TableCell>
                          );
                        }

                        // Render normal cell content
                        return (
                          <TableCell
                            key={cellIndex}
                            width={columnWidths[cellIndex + 1]}
                            colIndex={cellIndex + 1}
                            onResize={handleResize}
                          >
                            {<RenderCellContent row={row} item={item} />}
                          </TableCell>
                        );
                      }

                      return null; // Explicitly return null for hidden items
                    })}
                  </TableRow>

                  {expandElementID === row[rowKey] && (
                    <TableRow>
                      <TableCell>
                        {cloneElement(children, {
                          globalParams: { ...globalParams, ...row },
                        })}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
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
            {`عدد العناصر : ${filteredData.length}`}
          </p>
        </div>
      )}
    </>
  );
}

export default LocalGrid;
