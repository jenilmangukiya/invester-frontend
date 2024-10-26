import React from "react";
import { Button } from "@mui/material";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useGetInvesterList } from "../../services/Invester/useGetInvesterList";
import { useDeleteInvester } from "../../services/Invester/useDeleteInvester";
import { useSnackbar } from "../../components";
import { useQueryClient } from "@tanstack/react-query";

const useDashboard = () => {
  const { setSnackbarConfig } = useSnackbar();
  const queryClient = useQueryClient();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: "name",
      sort: "desc",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [selectedRowId, setSelectedRowId] = React.useState(null);

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      // Here you save the data you need from the sort model
      console.log("sortModel", sortModel);
      setSortModel(sortModel);
    },
    []
  );

  const { isLoading, data: investerData } = useGetInvesterList({
    searchText,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    sortBy: sortModel[0]?.field || "",
    sortType: sortModel[0]?.sort || "",
  });

  const rows = investerData?.docs || [];
  const rowCountRef = React.useRef(investerData?.totalDocs || 0);
  const rowCount = React.useMemo(() => {
    if (investerData?.totalDocs !== undefined) {
      rowCountRef.current = investerData.totalDocs;
    }
    return rowCountRef.current;
  }, [investerData?.totalDocs]);

  const handleClickOpen = (params: any) => {
    console.log("params", params);
    setSelectedRowId(params.id);
  };

  const handleClose = () => {
    setSelectedRowId(null);
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Invester name",
      width: 200,
      editable: false,
    },
    {
      field: "content",
      headerName: "Content",
      editable: false,
      flex: 1,
    },
    {
      field: "",
      headerName: "Actions",
      editable: false,
      width: 160,
      sortable: false,
      renderCell(params) {
        return (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleClickOpen(params)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const { mutate: deleteInvester, isPending: isDeleteInvesterLoading } =
    useDeleteInvester({
      onSuccess: () => {
        setSnackbarConfig({
          message: "Invester deleted successfully",
          open: true,
          severity: "success",
        });
        setSelectedRowId(null);
        queryClient.invalidateQueries({ queryKey: ["investerList"] });
      },
      onError: (error) => {
        console.error("Error Deleting invester:", error);
        setSnackbarConfig({
          message: "Error Deleting invester.",
          open: true,
          severity: "error",
        });
        setSelectedRowId(null);
      },
    });

  const handleDeleteInvester = () => {
    deleteInvester(selectedRowId);
  };

  return {
    setPaginationModel,
    handleClose,
    selectedRowId,
    rowCount,
    rows,
    isLoading,
    handleSortModelChange,
    setSearchText,
    columns,
    paginationModel,
    sortModel,
    handleDeleteInvester,
    isDeleteInvesterLoading,
  };
};

export default useDashboard;
