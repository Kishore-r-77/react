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
import DeathClaimLeapParameterAdd from "./DeathClaimLeapParameterAdd";
import DeathClaimLeapParameterEdit from "./DeathClaimLeapParameterEdit";
import DeathClaimLeapParameterInfo from "./DeathClaimLeapParameterInfo";

var initialValues = {
  companyId: "",
  basicSa: "",
  increaseSaYears: "",
  percentageSaIncrease: "",
  reversionaryBonus: "",
  loyaltyBonus: "",
  guaranteedBonus: "",
  terminalBonus: "",
  suicideClause: "",
  waitingPeriod: "",
  refundOfAdminFee: "",
  refundOfMc: "",
  refundOfGuaranteedCharges: "",
  returnOfPremiums: "",
  fundvalueSaPayable: "",
  claimConcession: "",
  tdsType: "",
  tdsRate: "",
};

function DeathClaimLeapParameter() {
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

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
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
      .get(`http://localhost:8080/deathClaimLeapParameter/getAll/${userId}`, {
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
        `http://localhost:8080/deathClaimLeapParameter/add/${userId}`,
        {
          companyId: deathClaimData.companyId,
          basicSa: deathClaimData.basicSa,
          increaseSaYears: deathClaimData.increaseSaYears,
          percentageSaIncrease: deathClaimData.percentageSaIncrease,
          reversionaryBonus: deathClaimData.reversionaryBonus,
          loyaltyBonus: deathClaimData.loyaltyBonus,
          guaranteedBonus: deathClaimData.guaranteedBonus,
          terminalBonus: deathClaimData.terminalBonus,
          suicideClause: deathClaimData.suicideClause,
          waitingPeriod: deathClaimData.waitingPeriod,
          refundOfAdminFee: deathClaimData.refundOfAdminFee,
          refundOfMc: deathClaimData.refundOfMc,
          refundOfGuaranteedCharges: deathClaimData.refundOfGuaranteedCharges,
          returnOfPremiums: deathClaimData.returnOfPremiums,
          fundvalueSaPayable: deathClaimData.fundvalueSaPayable,
          claimConcession: deathClaimData.claimConcession,
          tdsType: deathClaimData.tdsType,
          tdsRate: deathClaimData.tdsRate,
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
        `http://localhost:8080/deathClaimLeapParameter/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          basicSa: record.basicSa,
          increaseSaYears: record.increaseSaYears,
          percentageSaIncrease: record.percentageSaIncrease,
          reversionaryBonus: record.reversionaryBonus,
          loyaltyBonus: record.loyaltyBonus,
          guaranteedBonus: record.guaranteedBonus,
          terminalBonus: record.terminalBonus,
          suicideClause: record.suicideClause,
          waitingPeriod: record.waitingPeriod,
          refundOfAdminFee: record.refundOfAdminFee,
          refundOfMc: record.refundOfMc,
          refundOfGuaranteedCharges: record.refundOfGuaranteedCharges,
          returnOfPremiums: record.returnOfPremiums,
          fundvalueSaPayable: record.fundvalueSaPayable,
          claimConcession: record.claimConcession,
          tdsType: record.tdsType,
          tdsRate: record.tdsRate,
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
        `http://localhost:8080/deathClaimLeapParameter/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/deathClaimLeapParameter/search/${val}`, {
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

  const rule1 = "yesNoFlag";
  const [yesNoData, setyesNoData] = useState([]);
  const getyesNoData = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setyesNoData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getyesNoData();
    return () => {};
  }, []);

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Death Claim Leap Parameter</b>{" "}
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
              <th>Basic Sa</th>
              <th>Increase Sa Years</th>
              <th>Percentage Sa Increase</th>
              <th>Reversionary Bonus</th>
              <th>Loyalty Bonus</th>
              <th>Guaranteed Bonus</th>
              <th>Terminal Bonus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  {/* <td>{value.id}</td> */}
                  <td>{value.basicSa}</td>
                  <td>{value.increaseSaYears}</td>
                  <td>{value.percentageSaIncrease}</td>
                  <td>{value.reversionaryBonus}</td>
                  <td>{value.loyaltyBonus}</td>
                  <td>{value.guaranteedBonus}</td>
                  <td>{value.terminalBonus}</td>
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
      <DeathClaimLeapParameterAdd
        open={open}
        handleClose={handleClickClose}
        data={deathClaimData}
        companyData={companyData}
        yesNoData={yesNoData}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <DeathClaimLeapParameterEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        yesNoData={yesNoData}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <DeathClaimLeapParameterInfo
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

export default DeathClaimLeapParameter;
