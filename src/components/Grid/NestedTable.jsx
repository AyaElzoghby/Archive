/* eslint-disable react/prop-types */

import { useState, useEffect, useRef, useCallback } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import {
  get,
  put,
  post,
  Delete,
  RenderCellContent,
  validationFunction,
  buildTree,
} from "./utilities/";
import { Pagination, DraftModal, Modal, TableButton, Spinner } from "./UI";
import {
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Table,
} from "./tableStructure";
import toast from "react-hot-toast";
import { deleteIcon } from "./assets";

function NestedTable({
  tableConfig = [],
  params = {},
  rowKey,
  rowPerPage = 10,
  dir = "ltr",
  DeleteRoute = "table",
  UpdRoute = "table",
  InsRoute = "table",
  getRoute = "table",
  searchCol = "",
  ParentkeyName = "",
  clickable = null,
  displayedRow,
  OrderBy,
  globalParams,
  tableKey,
  onRowClick,
  onRowDblClick,
  haveCrud = true,
  haveEdit = true,
  haveIns = true,
  haveDel = true,
  rowCrud,
}) {
  const [tableData, setTableData] = useState([]);
  const [manipulatedRow, setManipulatedRow] = useState({});
  const [expandedRows, setExpandedRows] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const cellWidths = tableConfig.map((config) =>
    config?.hidden ? 150 : config?.width || 150
  );
  cellWidths.push(170);
  // console.log(cellWidths);

  const [columnWidths, setColumnWidths] = useState(cellWidths);

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
    }
  );

  const deleteMutation = useMutation(
    (row) =>
      Delete(DeleteRoute, {
        [rowKey]: row[rowKey],
        ...params.del,
        ...globalParams,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tableData-${tableKey || 0}`); // Invalidate cache
        toast.success("Row deleted successfully.");
      },
      onError: (error) => toast.error(error.message),
    }
  );

  const addMutation = useMutation(
    (row) => post(InsRoute, { ...params.ins, ...globalParams }, row),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tableData-${tableKey || 0}`); // Invalidate cache
        toast.success("Row added successfully.");
      },
      onError: (error) => toast.error(error.message),
    }
  );

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
  // console.log(manipulatedRow);

  //   const getData = useCallback(async () => {
  //     try {
  //       const response = await api.get(
  //         `table?sp=${getRoute}${Object.keys(params)
  //           .map((key) => `&${key}=${params[key]}`)
  //           .join("")}`
  //       );
  //       setTableData(buildTree(response.data.data, null, ParentkeyName, rowKey));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, [getRoute, stableParams]);

  //   const handleDeleteRow = async (row) => {
  //     try {
  //       const res = await Delete(DeleteRoute, {
  //         [rowKey]: row[rowKey],
  //         ...params,
  //         sp: spDel,
  //       });

  //       await getData();
  //       setTableData((prev) =>
  //         prev.filter((item) => item[rowKey] !== row[rowKey])
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleDeleteRow = useCallback((row) => {
    deleteMutation.mutate(row);
    hideModel();
  }, []);

  const handleUpdateRow = useCallback(
    (row) => {
      // console.log(manipulatedRow, "manipulatedRow, update rowwww");

      if (!validationFunction(row, tableConfig, toast)) {
        console.log("Validation failed");
        return;
      }
      setManipulatedRow({ ...manipulatedRow, children: [] });
      updateMutation.mutate(manipulatedRow);
      hideModel();
    },
    [manipulatedRow]
  );

  const handleAddRow = useCallback(
    (row) => {
      if (!validationFunction(row, tableConfig, toast)) return;
      console.log(manipulatedRow);

      const added = { ...row, children: [] };

      console.log(added);
      addMutation.mutate(added);
      hideModel();
    },
    [manipulatedRow]
  );

  const hideModel = () => {
    setShowModal(null);
    setManipulatedRow({});
  };

  // Handling search

  const handleSearch = (event) => {
    paginationData((prev) => ({ ...prev, search: event.target.value }));
  };

  const handleChangeInput = (key, value) => {
    setManipulatedRow((prevRow) => ({
      ...prevRow,
      [key]: value,
    }));
  };

  //   useEffect(() => {
  //     getData();
  //   }, [getData]);

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

  // Toggle row expansion
  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const handleResize = (index, newWidth) => {
    setColumnWidths((prev) => {
      const updatedWidths = [...prev];
      updatedWidths[index] = newWidth;
      return updatedWidths;
    });
  };

  const handlePageChange = (newPage) => {
    setPaginationData((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const delettetext = dir == "rtl" ? "حذف" : "delete ";
  const updateText = dir == "rtl" ? "تعديل" : "edit ";
  const insertText = dir == "rtl" ? "اضافه" : "Add ";
  const renderRows = (nodes, depth = 0) => {
    return nodes.map((node) => {
      const crudHandler = rowCrud
        ? {
            ins: !haveIns ? false : rowCrud(node).ins ?? true,
            edit: !haveEdit ? false : rowCrud(node).edit ?? true,
            del: !haveDel ? false : rowCrud(node).del ?? true,
          }
        : {
            ins: haveIns ? true : false,
            edit: haveEdit ? true : false,
            del: haveDel ? true : false,
          };

      return (
        <div key={node[rowKey]} className="w-fit">
          <TableRow
            handleClick={() => {
              if (onRowClick) {
                onRowClick({ ...node, children: [] });
              }
            }}
            handleDblClick={() => {
              if (onRowDblClick) {
                onRowDblClick({ ...node, children: [] });
              }
              if (manipulatedRow[rowKey] === node[rowKey]) {
                setManipulatedRow("");
              } else {
                setManipulatedRow({ ...node, children: [] });
              }
            }}
            style={`${clickable ? "cursor-pointer" : ""} ${
              displayedRow === node[rowKey] ? "bg-[#226F9930]" : ""
            } ${manipulatedRow[rowKey] === node[rowKey] ? "bg-gray-100" : ""}`}
          >
            <TableCell>
              {node.children.length > 0 && (
                <button
                  className="w-full h-full"
                  onClick={() => toggleRow(node[rowKey])}
                >
                  {expandedRows.includes(node[rowKey]) ? "-" : "+"}
                </button>
              )}
            </TableCell>

            {tableConfig.map((config, index) => {
              if (config.hidden) return null;
              return (
                <TableCell
                  onResize={handleResize}
                  colIndex={index}
                  width={columnWidths[index]}
                  key={config.keyName}
                >
                  <div className="flex justify-center items-center">
                    <RenderCellContent row={node} item={config} />
                  </div>
                </TableCell>
              );
            })}

            {haveCrud && (
              <TableCell
                onResize={handleResize}
                colIndex={columnWidths.length - 1}
                width={columnWidths[columnWidths.length - 1]}
              >
                <div className="flex justify-center items-center gap-2 overflow-hidden">
                  {crudHandler.edit && (
                    <TableButton
                      theme="edit"
                      onClick={() => {
                        setManipulatedRow(node);
                        setShowModal("edit");
                      }}
                    >
                      {updateText}
                    </TableButton>
                  )}

                  {crudHandler.del && (
                    <TableButton
                      theme="cancel"
                      onClick={() => {
                        setShowModal("del");
                        setManipulatedRow(node);
                      }}
                    >
                      {delettetext}
                    </TableButton>
                  )}
                  {crudHandler.ins && (
                    <TableButton
                      theme={"add"}
                      onClick={() => {
                        const configObject = tableConfig.reduce((acc, item) => {
                          acc[item.keyName] = item.defaultValue
                            ? item.defaultValue
                            : item.type === "checkbox"
                            ? false // Default value for checkbox
                            : "";
                          return acc;
                        }, {});
                        setManipulatedRow({
                          ...configObject,
                          [ParentkeyName]: node[rowKey],
                        });
                        setShowModal("add");
                      }}
                    >
                      {insertText}
                    </TableButton>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>

          {expandedRows.includes(node[rowKey]) && (
            <div
              style={{
                paddingLeft: dir == "ltr" ? (depth + 1) * 20 : "",
                paddingRight: dir == "rtl" ? (depth + 1) * 20 : "",
              }}
              className={`p-[${depth * 2}px]`}
            >
              {renderRows(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  // Cancel editing the row

  useEffect(() => {
    if (fetchedData?.data) {
      // console.log(fetchedData);

      setTableData(buildTree(fetchedData.data, null, ParentkeyName, rowKey));
    }
  }, [fetchedData, ParentkeyName, rowKey]);

  // console.log(tableData);

  return (
    <>
      {haveCrud && haveIns && (
        <DraftModal
          title
          tableConfig={tableConfig}
          type={"add"}
          open={showModal === "add"}
          onClose={hideModel}
          handleChange={handleChangeInput}
          enCaption={dir == "ltr"}
          manipulatedRow={manipulatedRow}
          onSubmit={() => handleAddRow(manipulatedRow)}
          handleHideModal={hideModel}
          keyName={rowKey}
        />
      )}

      {haveCrud && haveEdit && (
        <DraftModal
          title
          tableConfig={tableConfig}
          open={showModal === "edit"}
          enCaption={dir == "ltr"}
          onClose={hideModel}
          handleChange={handleChangeInput}
          manipulatedRow={manipulatedRow}
          onSubmit={() => handleUpdateRow(manipulatedRow)}
          handleHideModal={hideModel}
          keyName={rowKey}
        />
      )}

      {haveCrud && haveDel && (
        <Modal open={showModal === "del"} onClose={hideModel}>
          <div className="relative">
            <button
              onClick={hideModel}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              &times;
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
                Are you sure you want to delete this field?{" "}
              </p>
              <p className="text-sm text-gray-600 text-center mb-6">
                Please note that you will lose all data for this field.{" "}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  handleDeleteRow(manipulatedRow);
                  setShowModal(null);
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-lg  focus:outline-none flex items-center gap-2"
              >
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  width="16"
                  height="16"
                />
                {delettetext}
              </button>

              <button
                onClick={hideModel}
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 focus:outline-none"
              >
                {/* <img src={undo} alt="Delete Icon" width="16" height="16" /> */}
                cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {!isLoading && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>
                <div className=" flex flex-1"></div>
              </TableCell>
              {tableConfig.map((header, index) => {
                // console.log(index, columnWidths[index], header);

                return (
                  !tableConfig[index].hidden && (
                    <TableCell
                      key={index}
                      colIndex={index}
                      width={columnWidths[index]}
                      onResize={handleResize}
                      isHead
                    >
                      <button className="h-full w-full">
                        <div className="flex items-center justify-center gap-1">
                          <p>
                            {dir == "rtl"
                              ? header?.arCaption
                              : header?.enCaption}
                          </p>
                        </div>
                      </button>
                    </TableCell>
                  )
                );
              })}

              {haveCrud && (
                <TableCell
                  isHead
                  colIndex={columnWidths.length - 1}
                  width={columnWidths[columnWidths.length - 1]}
                  onResize={handleResize}
                >
                  {haveIns ? (
                    <TableButton
                      theme
                      onClick={() => {
                        const configObject = tableConfig.reduce((acc, item) => {
                          acc[item.keyName] = item.defaultValue
                            ? item.defaultValue
                            : item.type === "checkbox"
                            ? false // Default value for checkbox
                            : "";
                          return acc;
                        }, {});

                        setManipulatedRow({
                          ...configObject,
                          [ParentkeyName]: null,
                        });
                        setShowModal("add");
                      }}
                    >
                      {insertText}
                    </TableButton>
                  ) : (
                    <p></p>
                  )}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>{renderRows(paginatedData, 0)}</TableBody>
        </Table>
      )}

      {isLoading && <Spinner />}

      {paginatedData.totalPages > 1 && (
        <Pagination
          currentPage={paginationData.currentPage}
          totalPages={paginationData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default NestedTable;
