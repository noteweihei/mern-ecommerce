import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";

const columns = [
  { id: "email", label: "Email", minWidth: 170 },
  { id: "password", label: "Password", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 170 },
  { id: "date", label: "Last Login", minWidth: 170 },
];

export default function StickyHeadTable() {
  const { user } = useSelector((state) => ({ ...state }));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const role = ["admin", "user"];

  React.useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`${import.meta.env.VITE_URL}/user`, {
          headers: {
            Authorization: user.user.token,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return () => {
      loadData();
    };
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = async (id, e) => {
    console.log("ไอดี ", id, "สถานะ ", e.target.value);
    const value = {
      id: id,
      role: e.target.value,
    };
    await axios
      .post(`${import.meta.env.VITE_URL}/changerole`, value, {
        headers: {
          Authorization: user.user.token,
        },
      })
      .then((res) => {
        alert(
          `เปลี่ยนสถานะของผู้ใช้งาน ${res.data.email} เป็น ${res.data.role} เรียบร้อยครับ.`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.password}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={row.role}
                        style={{ width: "100px" }}
                        onChange={(e) => handleChange(row._id, e)}
                      >
                        {role.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      {new Date(row.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
