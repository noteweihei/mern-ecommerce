import * as React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ManageUser = () => {
  const columns = [
    { id: "id", label: "ลำดับ", minWidth: 80, align: "left" },
    { id: "name", label: "ชื่อสินค้า", minWidth: 170 },
    {
      id: "price",
      label: "ราคา",
      align: "center",
      minWidth: 170,
    },
    {
      id: "stock",
      label: "สินค้าในคลัง",
      align: "center",
      minWidth: 170,
    },
    {
      id: "action",
      label: "ลบ/แก้ไข",
      align: "center",
      minWidth: 170,
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataRows, setDataRows] = React.useState([]);
  const format = (value) => value.toLocaleString("en-US");
  React.useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_URL}/product`)
        .then((res) => {
          setDataRows(res.data);
        })
        .catch((err) => console.log(err));
    };

    return () => {
      fetchData();
    };
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteData = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_URL}/deleteproduct/${id}`)
      .then(() => {
        alert("ลบข้อมูลเรียบร้อย");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500, maxWidth: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{format(row.price)} ฿.</TableCell>
                    <TableCell align="center">
                      {format(row.stock)} ชิ้น
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteData(row._id)}
                      >
                        <DeleteForeverIcon />
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        href={`/admin/edit/${row._id}`}
                      >
                        <EditNoteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={dataRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ManageUser;
