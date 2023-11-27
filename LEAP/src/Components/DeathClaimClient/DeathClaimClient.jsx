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
import DeathClaimClientAdd from "./DeathClaimClientAdd";
import DeathClaimClientEdit from "./DeathClaimClientEdit";
import DeathClaimClientInfo from "./DeathClaimClientInfo";

var initialValues = {
  companyId: "",
  clntNum: "",
  laName: "",
  laDob: "",
  nationality: "",
  residentStatus: "",
  gender: "",
  contactNumber: "",
  emailId: "",
  createdBy: "",
  modifiedBy: "",
};

function DeathClaimClient() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [deathClaimClientData, setdeathClaimClientData] = useState(
    initialValues
  );
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
    setdeathClaimClientData({ ...deathClaimClientData, [name]: value });
  };

  const onChangeLaDob = (date) => {
    setdeathClaimClientData({ ...deathClaimClientData, laDob: date });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const editChangelaDob = (date) => {
    setRecord({ ...record, laDob: date });
  };

  const editChangeendDate = (date) => {
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
      .get(`http://localhost:8080/deathClaimClientDetails/getAll/${userId}`, {
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
        `http://localhost:8080/deathClaimClientDetails/add/${userId}`,
        {
          companyId: deathClaimClientData.companyId,
          clntNum: deathClaimClientData.clntNum,
          laName: deathClaimClientData.laName,
          nationality: deathClaimClientData.nationality,
          residentStatus: deathClaimClientData.residentStatus,
          gender: deathClaimClientData.gender,
          contactNumber: deathClaimClientData.contactNumber,
          emailId: deathClaimClientData.emailId,
          laDob: moment(deathClaimClientData.laDob)
            .format("YYYYMMDD")
            .toString(),
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
        setdeathClaimClientData(initialValues);
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
        `http://localhost:8080/deathClaimClientDetails/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          clntNum: record.clntNum,
          laName: record.laName,
          nationality: record.nationality,
          residentStatus: record.residentStatus,
          gender: record.gender,
          contactNumber: record.contactNumber,
          emailId: record.emailId,
          laDob: moment(record.laDob)
            .format("YYYYMMDD")
            .toString(),
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
        `http://localhost:8080/deathClaimClientDetails/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/deathClaimClientDetails/search/${val}`, {
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

  const rule1 = "gender";
  const [genderData, setgenderData] = useState([]);
  const getgenderData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setgenderData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule2 = "nationality";
  const [nationalityData, setnationalityData] = useState([]);
  const getnationalityData = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setnationalityData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule3 = "residentStatus";
  const [residentStatusData, setresidentStatusData] = useState([]);
  const getresidentStatusData = () => {
    axios
      .get(`http://localhost:8080/param/${rule3}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setresidentStatusData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getgenderData();
    getnationalityData();
    getresidentStatusData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Death Claim Client</b>{" "}
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
            marginRight: 90,
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
              <th>Client No</th>
              <th>La Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Mobile Number</th>
              <th>Resident Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  {/* <td>{value.id}</td> */}
                  <td>{value.clntNum}</td>
                  <td>{value.laName}</td>
                  <td>{moment(value.laDob).format("DD-MM-YYYY")}</td>
                  <td>{value.gender}</td>
                  <td>{value.contactNumber}</td>
                  <td>{value.residentStatus}</td>
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
      <DeathClaimClientAdd
        open={open}
        handleClose={handleClickClose}
        data={deathClaimClientData}
        companyData={companyData}
        onChangeLaDob={onChangeLaDob}
        genderData={genderData}
        nationalityData={nationalityData}
        residentStatusData={residentStatusData}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <DeathClaimClientEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        onChangeLaDob={editChangelaDob}
        genderData={genderData}
        nationalityData={nationalityData}
        residentStatusData={residentStatusData}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <DeathClaimClientInfo
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

export default DeathClaimClient;
