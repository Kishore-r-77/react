import { TablePagination } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import DeathClaimParamAdd from "./DeathClaimParamAdd";
import DeathClaimParamEdit from "./DeathClaimParamEdit";
import DeathClaimParamInfo from "./DeathClaimParamInfo";
import FormDate from "form-data";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

var initialValues = {
  companyId: "",
  uinNumber: "",
  causeOfDeath: "",
  fromMonth: "",
  toMonth: "",
  policyStatus: "",
  startDate: "",
  endDate: "",
  factor: "",
  premFactor: "",
  calculationMethod: "",
};

function DeathClaimParam() {
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
  const onChangeStartDate = (date) => {
    setdeathClaimData({ ...deathClaimData, startDate: date });
  };
  const onChangeEndDate = (date) => {
    setdeathClaimData({ ...deathClaimData, endDate: date });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const editChangeStartDate = (date) => {
    setRecord({ ...record, startDate: date });
  };
  const editChangeEndDate = (date) => {
    setRecord({ ...record, endDate: date });
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
      .get(`http://localhost:8080/deathClaimParam/getAll/${userId}`, {
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
        `http://localhost:8080/deathClaimParam/add/${userId}`,
        {
          companyId: deathClaimData.companyId,
          uinNumber: deathClaimData.uinNumber,
          causeOfDeath: deathClaimData.causeOfDeath,
          fromMonth: deathClaimData.fromMonth,
          toMonth: deathClaimData.toMonth,
          policyStatus: deathClaimData.policyStatus,
          startDate: moment(deathClaimData.startDate).format("YYYYMMDD"),
          endDate: moment(deathClaimData.endDate).format("YYYYMMDD"),
          factor: deathClaimData.factor,
          premFactor: deathClaimData.premFactor,
          calculationMethod: deathClaimData.calculationMethod,
          createdBy: userId,
          modifiedBy: userId,
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
        `http://localhost:8080/deathClaimParam/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          uinNumber: record.uinNumber,
          causeOfDeath: record.causeOfDeath,
          fromMonth: record.fromMonth,
          toMonth: record.toMonth,
          policyStatus: record.policyStatus,
          startDate: record.startDate,
          endDate: record.endDate,
          factor: record.factor,
          premFactor: record.premFactor,
          calculationMethod: record.calculationMethod,
          createdBy: userId,
          modifiedBy: userId,
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
        `http://localhost:8080/deathClaimParam/softdelete/${id}/${userId}`,
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

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/deathClaimParam/search/${val}`, {
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

  const [file, setFile] = useState(null);
  const upload = (e) => {
    e.preventDefault();
    let formData = new FormDate();
    formData.append("file", file);
    axios.post(`http://localhost:8080/deathClaimParam/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    // location = "deathClaimParam";
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
          <b>Death Claim Param</b>{" "}
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
        <div style={{ margin: "auto" }}>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <Button
            onClick={(e) => upload(e)}
            variant="contained"
            style={{
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
          >
            <DriveFolderUploadIcon />
          </Button>
        </div>
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
              <th>Uin Number</th>
              <th>Cause Of Death</th>
              <th>From Month</th>
              <th>To Month</th>
              <th>Policy Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Factor</th>
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
                  <td>{value.causeOfDeath}</td>
                  <td>{value.fromMonth}</td>
                  <td>{value.toMonth}</td>
                  <td>{value.policyStatus}</td>
                  <td>{moment(value.startDate).format("YYYY-MM-DD")}</td>
                  <td>{moment(value.endDate).format("YYYY-MM-DD")}</td>
                  <td>{value.factor}</td>
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
      <DeathClaimParamAdd
        open={open}
        handleClose={handleClickClose}
        data={deathClaimData}
        companyData={companyData}
        onChange={onChange}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <DeathClaimParamEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        data={record}
        onChange={editChange}
        onChangeStartDate={editChangeStartDate}
        onChangeEndDate={editChangeEndDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <DeathClaimParamInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        companyData={companyData}
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

export default DeathClaimParam;
