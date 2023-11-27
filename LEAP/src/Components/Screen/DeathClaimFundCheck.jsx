import React from "react";
import { Button, Modal } from "react-bootstrap";
import DraggableComponent from "../Service/DraggableComponent";
import { TablePagination } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Paper from "@mui/material/Paper";
import "../Css/Content.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { textAlign } from "@mui/system";

function DeathClaimFundCheck({ open, close, uinNumber }) {
  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [fundViewData, setfundViewData] = useState([]);
  // Get All Fund details Pas Data
  const getfundViewData = () => {
    axios
      .get(
        `http://localhost:8080/deathClaimLeapFundDetails/getAllFundView/${uinNumber}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setfundViewData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("fund data", fundViewData);

  useEffect(() => {
    getfundViewData();
    return () => {};
  }, [open]);
  return (
    <div>
      <Modal
        show={open}
        dialogAs={DraggableComponent}
        onHide={close}
        keyboard={false}
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Fund Details Checking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Paper
            className="paperStyle"
            style={{ flexGrow: "1", marginTop: "0" }}
          >
            <h3 style={{ textAlign: "center", padding: "0.5rem" }}>
              Fund Details
            </h3>

            <Table striped bordered hover size="sm">
              <thead className="tableheader">
                <tr>
                  <th>Policy No</th>
                  <th>UIN Number</th>
                  <th>Fund Code</th>
                  <th>Fund Name</th>
                  <th>Units</th>
                  <th>PAS Nav Date</th>
                  <th>PAS Nav</th>
                  <th>PAS Fund Value</th>
                  <th>LEAPS Nav Date</th>
                  <th>LEAPS Rate</th>
                  <th>LEAPS Fund Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fundViewData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <tr>
                      <td>{value?.policyNum}</td>
                      <td>{value?.uinNumber}</td>
                      <td>{value?.fundCode}</td>
                      <td>{value?.fundName}</td>
                      <td>{value?.units}</td>
                      <td>{moment(value?.navDate).format("DD-MM-YYYY")}</td>
                      <td>{value?.rateApp}</td>
                      <td>{value?.value}</td>
                      <td style={{ color: "blue" }}>
                        {moment(value?.purpleNavDate).format("DD-MM-YYYY")}
                      </td>
                      <td style={{ color: "blue" }}>{value?.purpleRateApp}</td>
                      <td style={{ color: "blue" }}>
                        {value?.purpleFundValue}
                      </td>
                      <td>{value?.status}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <TablePagination
              className="contentPagination"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={fundViewData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>

          {/* <Paper
                className="paperStyle"
                style={{ flexGrow: "1", marginTop: "0" }}
              >
                <h3 style={{ textAlign: "center", padding: "0.5rem" }}>
                  Purple Fund Details
                </h3>
                <Table striped bordered hover size="sm">
                  <thead className="tableheader">
                    <tr>
                      <th>Policy No</th>
                      <th>Fund Code</th>
                      <th>Fund Name</th>
                      <th>Nav Date</th>
                      <th>Units</th>
                      <th>Rate</th>
                      <th>Fund Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purpleFundData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((value, index) => (
                        <tr>
                          <td>{value?.chdrNum}</td>
                          <td>{value?.fundCode}</td>
                          <td>{value?.fundName}</td>
                          <td>{moment(value?.navDate).format("DD-MM-YYYY")}</td>
                          <td>{value?.units}</td>
                          <td>{value?.rateApp}</td>
                          <td>{value?.fundValue}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <TablePagination
                  className="contentPagination"
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={purpleFundData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeathClaimFundCheck;
