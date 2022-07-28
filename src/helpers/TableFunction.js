import { Box, Pagination } from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

export const CustomToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0px",
        margin: "0px",
        height: "50px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
        zIndex: "1",
      }}
    >
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
      <GridToolbarQuickFilter
        placeholder="Search"
        sx={{
          width: "200px",
          borderRadius: "5px",
          border: "1px solid #e0e0e0",
          padding: "5px",
          backgroundColor: "#f5f5f5",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#000",
        }}
      />
    </GridToolbarContainer>
  );
};
export const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      variant="text"
      shape="circular"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};
export const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "0px",
        margin: "0px",
        border: "1px solid #e0e0e0",
        height: "50px",
        zIndex: "1",
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
        variant="standard"
        sx={{
          width: "50%",
        }}
        placeholder="Enter to search"
      />
    </Box>
  );
};
