import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Stack } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicalDetailsInfo from "./MedicalDetailsInfo";
import MedicalDetailsAdd from "./MedicalDetailsAdd";
import MedicalDetailsEdit from "./MedicalDetailsEdit";
import FormDate from "form-data";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

var initialValues = {
  companyId: "",
  companyName: "",
  tpaCode: "",
  prodName: "",
  medicalCategory: "",
  medicalCenter: "",
  mfRate: "",
  startDate: "",
  endDate: "",
};

function MedicalDetails() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [medicalDetailsData, setMedicalDetailsData] = useState(initialValues);
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setMedicalDetailsData({ ...medicalDetailsData, [name]: value });
  };

  const onChangeStartDate = (date) => {
    setMedicalDetailsData({ ...medicalDetailsData, startDate: date });
  };

  const onChangeEndDate = (date) => {
    setMedicalDetailsData({ ...medicalDetailsData, endDate: date });
  };

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

  const handleInfoOpen = (value) => {
    setInfo(value);
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
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

  // get All MedicalDetails
  const getData = () => {
    axios
      .get(
        `http://localhost:8080/medicaldetails/getAll/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [companyData, setcompanyData] = useState([]);
  const getcompanyData = () => {
    axios
      .get(
        `http://localhost:8080/company/getAll/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setcompanyData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("data", companyData);

  //add Medical Details
  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/medicaldetails/add/${userId}`,
        {
          companyId: medicalDetailsData.companyId,
          companyName: medicalDetailsData.companyName,
          tpaCode: medicalDetailsData.tpaCode,
          prodName: medicalDetailsData.prodName,
          medicalCategory: medicalDetailsData.medicalCategory,
          medicalCenter: medicalDetailsData.medicalCenter,
          mfRate: medicalDetailsData.mfRate,
          startDate: moment(medicalDetailsData.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(medicalDetailsData.endDate)
            .format("YYYYMMDD")
            .toString(),
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
        setMedicalDetailsData(initialValues);
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
        `http://localhost:8080/medicaldetails/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          companyName: record.companyName,
          tpaCode: record.tpaCode,
          prodName: record.prodName,
          medicalCategory: record.medicalCategory,
          medicalCenter: record.medicalCenter,
          mfRate: record.mfRate,
          startDate: moment(record.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(record.endDate)
            .format("YYYYMMDD")
            .toString(),
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

  const [file, setFile] = useState(null);
  const upload = (e) => {
    e.preventDefault();
    let formData = new FormDate();
    formData.append("file", file);
    axios.post(`http://localhost:8080/medicaldetails/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/medicaldetails/search/${val}`, {
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

  const rule1 = "medicalCategory";
  const [medicalCategoryData, setmedicalCategoryData] = useState([]);
  const getmedicalCategoryData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalCategoryData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule2 = "medicalCenter";
  const [medicalCenterData, setmedicalCenterData] = useState([]);
  const getmedicalCenterData = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalCenterData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule3 = "medicalTPA";
  const [medicalTpaData, setmedicalTpaData] = useState([]);
  const getmedicalTpa = () => {
    axios
      .get(`http://localhost:8080/param/${rule3}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setmedicalTpaData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/medicaldetails/softdelete/${id}/${sessionStorage.getItem(
          "userId"
        )}`,
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
  useEffect(() => {
    getData();
    getcompanyData();
    getmedicalCategoryData();
    getmedicalCenterData();
    getmedicalTpa();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Medical Details</b>{" "}
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
              <th>TPA Code</th>
              <th>Product Name</th>
              <th>Medical Category</th>
              <th>Medical Center</th>
              <th>Medical TPA Code</th>
              <th>MF Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>{value.tpaCode}</td>
                  <td>{value.prodName}</td>
                  <td>{value.medicalCategory}</td>
                  <td>{value.medicalCenter}</td>
                  <td>{value.tpaCode}</td>
                  <td>{value.mfRate}</td>
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

      <MedicalDetailsAdd
        open={open}
        handleClose={handleClickClose}
        data={medicalDetailsData}
        companyData={companyData}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        medicalCategoryData={medicalCategoryData}
        medicalCenterData={medicalCenterData}
        medicalTpaData={medicalTpaData}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <MedicalDetailsEdit
        open={editOpen}
        handleClose={editClose}
        data={record}
        onChange={editChange}
        companyData={companyData}
        editChangeStartDate={editChangeStartDate}
        editChangeEndDate={editChangeEndDate}
        medicalCategoryData={medicalCategoryData}
        medicalCenterData={medicalCenterData}
        medicalTpaData={medicalTpaData}
        handleFormSubmit={() => editFormSubmit()}
      />
      <MedicalDetailsInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
      />

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
    </>
  );
}

export default MedicalDetails;
