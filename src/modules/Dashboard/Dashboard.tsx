import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useDashboard from "./useDashboard";

export const Dashboard = () => {
  const {
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
  } = useDashboard();

  return (
    <>
      <div style={{ width: "100%", height: "auto", padding: "20px" }}>
        <Box sx={{ width: "98%", mx: "auto" }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ mb: 2 }}
          >
            <Typography variant="h4" sx={{ fontWeight: "500" }}>
              Investers
            </Typography>
            <TextField
              label="Search"
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ width: "36%" }}
            ></TextField>
          </Stack>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            loading={isLoading}
            pageSizeOptions={[5, 10, 15]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={(data) => {
              console.log("data", data);
              setPaginationModel(data);
            }}
            getRowId={(row) => row._id}
            rowSelection={false}
            disableRowSelectionOnClick
            sortingMode="server"
            onSortModelChange={handleSortModelChange}
            sortModel={sortModel}
          />
        </Box>
        <Dialog
          open={!!selectedRowId}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure do you want to remove this Invester?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Click delete to permanatly delete the invester.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isDeleteInvesterLoading}>
              cancle
            </Button>
            <Button
              onClick={handleDeleteInvester}
              autoFocus
              disabled={isDeleteInvesterLoading}
            >
              delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Dashboard;
