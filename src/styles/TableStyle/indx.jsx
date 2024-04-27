import { TableCell, styled, tableCellClasses } from "@mui/material";

export  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.black,
      textTransform: "capitalize",
      fontWeight: 500,
      fontSize: 13,
      lineHeight: "24px",
      borderBottom: "1px solid #D7D7D7",
      minWidth: 100,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      lineHeight: "21px",
      color: theme.palette.common.black,
      minWidth: 100,
      fontWeight: 400,
      borderBottom: "1px solid #D7D7D7",
    },
  }));