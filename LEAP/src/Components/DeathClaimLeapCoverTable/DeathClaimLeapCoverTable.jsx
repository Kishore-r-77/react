import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import { InputAdornment, TextField } from "@mui/material";
import moment from "moment";
import DeathClaimLeapCoverTableAdd from "./DeathClaimLeapCoverTableAdd";
import DeathClaimLeapCoverTableEdit from "./DeathClaimLeapCoverTableEdit";
import DeathClaimLeapCoverTableInfo from "./DeathClaimLeapCoverTableInfo";
import { MdOutlineFileUpload } from "react-icons/md";
import FormDate from "form-data";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

var initialValues = {
  companyId: "",
  uinNumber: "",
  doc: "",
  riskComDate: "",
  originalSumAssured: "",
  pasSumAssured: "",
  leapSumAssured: "",
  leapFlag: "",
  leapRemark: "",
  qcRemark: "",
};

function DeathClaimLeapCoverTable() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [deathClaimData, setdeathClaimData] = useState(initialValues);
  const [record, setRecord] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [info, setInfo] = useState("");
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    setRecord(item);
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  const handleInfoOpen = (value) => {
    setInfo(value);
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setdeathClaimData({ ...deathClaimData, [name]: value });
  };

  const onChangeRiskComDate = (date) => {
    setdeathClaimData({ ...deathClaimData, riskComDate: date });
  };
  const onChangeDoc = (date) => {
    setdeathClaimData({ ...deathClaimData, doc: date });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const editRiskComDate = (date) => {
    setRecord({ ...record, riskComDate: date });
  };

  const editChangeDoc = (date) => {
    setRecord({ ...record, doc: date });
  };

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

  // Get All Mortality  Details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/deathClaimLeapCoverTable/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [companyData, setcompanyData] = useState([]);
  const getcompanyData = () => {
    axios
      .get(`http://localhost:8080/company/getAll/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setcompanyData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/deathClaimLeapCoverTable/add/${userId}`,
        {
          companyId: deathClaimData.companyId,
          uinNumber: deathClaimData.uinNumber,
          doc: deathClaimData.doc,
          riskComDate: moment(deathClaimData.riskComDate)
            .format("YYYYMMDD")
            .toString(),
          originalSumAssured: deathClaimData.originalSumAssured,
          pasSumAssured: deathClaimData.pasSumAssured,
          leapSumAssured: deathClaimData.leapSumAssured,
          leapFlag: deathClaimData.leapFlag,
          leapRemark: deathClaimData.leapRemark,
          qcRemark: deathClaimData.qcRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        setdeathClaimData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/deathClaimLeapCoverTable/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          uinNumber: record.uinNumber,
          doc: record.doc,
          riskComDate: moment(record.riskComDate)
            .format("YYYYMMDD")
            .toString(),
          originalSumAssured: record.originalSumAssured,
          pasSumAssured: record.pasSumAssured,
          leapSumAssured: record.leapSumAssured,
          leapFlag: record.leapFlag,
          leapRemark: record.leapRemark,
          qcRemark: record.qcRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        editClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/deathClaimLeapCoverTable/softdelete/${id}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        getData();
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
      });
  };

  const [file, setFile] = useState(null);
  const upload = (e) => {
    e.preventDefault();
    let formData = new FormDate();
    formData.append("file", file);
    axios.post(
      `http://localhost:8080/deathClaimLeapCoverTable/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/deathClaimLeapCoverTable/search/${val}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  // Dropdown tables

  useEffect(() => {
    getData();
    getcompanyData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Death Claim Leap Cover Table</b>{" "}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          style={{ marginLeft: 80 }}
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            globalsearch(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullwidth
        />
        <Button
          variant="contained"
          style={{
            marginRight: 80,
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
            backgroundColor: "#0a3161",
          }}
        >
          <AddBoxIcon fontSize="large" onClick={() => handleClickOpen()} />
        </Button>
      </div>
      <Paper className="paperStyle">
        <Table striped bordered hover size="md">
          <thead className="tableheader">
            <tr>
              {/* <th>Id </th> */}
              <th>UIN Number</th>
              <th>Doc</th>
              <th>riskComDate</th>
              <th>originalSumAssured</th>
              <th>pasSumAssured</th>
              <th>leapSumAssured</th>
              <th>leapFlag</th>
              <th>leapRemark</th>
              <th>qcRemark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  {/* <td>{value.id}</td> */}
                  <td>{value.uinNumber}</td>
                  <td>{moment(value.doc).format("YYYY-MM-DD")}</td>
                  <td>{moment(value.riskComDate).format("YYYY-MM-DD")}</td>
                  <td>{value.originalSumAssured}</td>
                  <td>{value.pasSumAssured}</td>
                  <td>{value.leapSumAssured}</td>
                  <td>{value.leapFlag}</td>
                  <td>{value.leapRemark}</td>
                  <td>{value.qcRemark}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <EditIcon
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => editClickOpen(value)}
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        className="deleteClass"
                        color="error"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              handleDelete(value.id);
                            },
                          });
                        }}
                      />
                      <InfoIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleInfoOpen(value)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <TablePagination
          className="contentPagination"
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <DeathClaimLeapCoverTableAdd
        open={open}
        handleClose={handleClickClose}
        data={deathClaimData}
        companyData={companyData}
        onChangeRiskComDate={onChangeRiskComDate}
        onChangeDoc={onChangeDoc}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <DeathClaimLeapCoverTableEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        onChangeRiskComDate={editRiskComDate}
        onChangeDoc={editChangeDoc}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <DeathClaimLeapCoverTableInfo
        companyData={companyData}
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <br />

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
    </>
  );
}

export default DeathClaimLeapCoverTable;
