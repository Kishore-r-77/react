import { TablePagination } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import FormDate from "form-data";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import LoyaltyAdditionAdd from "./LoyaltyAdditionBonusAdd";
import LoyaltyAdditionEdit from "./LoyaltyAdditionBonusEdit";
import LoyaltyAdditionInfo from "./LoyaltyAdditionBonusInfo";

var initialValues = {
  companyId: "",
  uinNumber: "",
  planName: "",
  planCode: "",
  financialYear: "",
  bonusRate: "",
  bonusType: "",
  startDate: "",
  endDate: "",
};

function LoyaltyAdditionBonus() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [loyaltyAdditionRateData, setloyaltyAdditionRateData] = useState(
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setloyaltyAdditionRateData({ ...loyaltyAdditionRateData, [name]: value });
  };

  // Customer Details On Change Date

  const onChangeFinancialYear = (date) => {
    setloyaltyAdditionRateData({
      ...loyaltyAdditionRateData,
      financialYear: date,
    });
  };
  const onChangeStartDate = (date) => {
    setloyaltyAdditionRateData({ ...loyaltyAdditionRateData, startDate: date });
  };
  const onChangeEndDate = (date) => {
    setloyaltyAdditionRateData({ ...loyaltyAdditionRateData, endDate: date });
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

  const handleInfoOpen = (value) => {
    setInfo(value);
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  // Customer Details Edit Change
  const editChangeFinancialYear = (date) => {
    setRecord({ ...record, financialYear: date });
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

  // Get All loyaltyAdditionRate details Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/loyaltyAdditionRate/getall/${userId}`, {
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

  const [emailError, setemailError] = useState("");
  const [clientNumError, setClientNumError] = useState("");
  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8080/loyaltyAdditionRate/add/${userId}`,
        {
          companyId: loyaltyAdditionRateData.companyId,
          uinNumber: loyaltyAdditionRateData.uinNumber,
          planName: loyaltyAdditionRateData.planName,
          planCode: loyaltyAdditionRateData.planCode,
          bonusRate: loyaltyAdditionRateData.bonusRate,
          bonusType: loyaltyAdditionRateData.bonusType,
          financialYear: moment(loyaltyAdditionRateData.financialYear)
            .format("YYYYMMDD")
            .toString(),
          startDate: moment(loyaltyAdditionRateData.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(loyaltyAdditionRateData.endDate)
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
        setloyaltyAdditionRateData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
        setemailError("");
        setClientNumError("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/loyaltyAdditionRate/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          uinNumber: record.uinNumber,
          planName: record.planName,
          planCode: record.planCode,
          bonusRate: record.bonusRate,
          bonusType: record.bonusType,
          financialYear: moment(record.financialYear)
            .format("YYYYMMDD")
            .toString(),
          startDate: moment(record.startDate)
            .format("YYYYMMDD")
            .toString(),
          endDate: moment(record.endDate)
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
        setRecord(record);
        setemailError("");
        setClientNumError("");
      })
      .catch((err) => {
        console.log(err);
        setemailError(err.response.data.emailId);
        setClientNumError(err.response.data.message);
        getData();
      });
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/loyaltyAdditionRate/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/loyaltyAdditionRate/search/${val}`, {
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

  const rule1 = "coverName";
  const [coverNameData, setcoverNameData] = useState([]);
  const getcoverNameData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcoverNameData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule2 = "coverCode";
  const [coverCodeData, setcoverCodeData] = useState([]);
  const getcoverCodeData = () => {
    axios
      .get(`http://localhost:8080/param/${rule2}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcoverCodeData(resp.data);
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
    axios.post(`http://localhost:8080/loyaltyAdditionRate/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    location = "loyaltyAdditionRate";
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getcoverNameData();
    getcoverCodeData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Loyalty Additions Rate</b>{" "}
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

        {/* <div style={{ margin: "auto" }}>
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
        </div> */}
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
      {/* <input
          type="file"
          name="file"
          onChange={(e) =>{
            setFile(e.target.files[0]);
          }}
          />
          <button onClick={(e)=>upload(e)}>Submit</button> */}
      <Paper className="paperStyle">
        <Table striped bordered hover size="md">
          <thead className="tableheader">
            <tr>
              <th>UIN Number</th>
              <th>Plan Name</th>
              <th>Financial Year</th>
              <th>Bonus Rate</th>
              <th>Bonus Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>{value.uinNumber}</td>
                  <td>{value.planName}</td>
                  <td>{moment(value.financialYear).format("DD/MM/YYYY")}</td>
                  <td>{value.bonusRate}</td>
                  <td>{value.bonusType}</td>
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
      <LoyaltyAdditionAdd
        open={open}
        handleClose={handleClickClose}
        data={loyaltyAdditionRateData}
        companyData={companyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        onChange={onChange}
        onChangeFinancialYear={onChangeFinancialYear}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <LoyaltyAdditionEdit
        open={editOpen}
        emailError={emailError}
        handleClose={editClose}
        companyData={companyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        data={record}
        onChange={editChange}
        onChangeFinancialYear={editChangeFinancialYear}
        onChangeStartDate={editChangeStartDate}
        onChangeEndDate={editChangeEndDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <LoyaltyAdditionInfo
        open={infoOpen}
        companyData={companyData}
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

export default LoyaltyAdditionBonus;
