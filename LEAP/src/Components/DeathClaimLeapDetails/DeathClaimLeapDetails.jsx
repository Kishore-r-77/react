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
import DeathClaimLeapDetailsEdit from "./DeathClaimLeapDetailsEdit";
import DeathClaimLeapDetailsInfo from "./DeathClaimLeapDetailsInfo";
import DeathClaimQC from "../Screen/DeathClaimQc";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

var initialValues = {
  companyId: "",
  policyNo: "",
  transNo: "",
  uinNumber: "",
  reqDate: "",
  logDate: "",
  clientId: "",
  contractType: "",
  productType: "",
  policyStatus: "",
  fup: "",
  totalPremium: "",
  basicSa: "",
  additionalSa: "",
  inbuiltRiderSa: "",
  reversionaryBonus: "",
  interimBonus: "",
  guranteedAddition: "",
  loyaltyAddtion: "",
  otherRiderBenefit: "",
  terminalBonus: "",
  totalBonus: "",
  annuityRefund: "",
  fundValue: "",
  totalDeathClaim: "",
  policyDeposit: "",
  penalInterest: "",
  grossPayable: "",
  termPremRecov: "",
  interestOnPremium: "",
  gstOnPremium: "",
  cdaCharges: "",
  otherCharges: "",
  policyLoan: "",
  policyLoanInterest: "",
  moneybackPaid: "",
  annuityPaid: "",
  mortChargesRefund: "",
  adminFeeRefund: "",
  guranteedAddCharges: "",
  tds: "",
  totalRecovery: "",
  netPayable: "",
  leappfFlag: "",
  leappfRemarks: "",
  qcApprovalFlag: "",
  qcApprovalRemark: "",
  qcApprovalDate: "",
  approvalQcUserId: "",
  pasUpdateFlag: "",
};

function DeathClaimLeapDetails() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [deathClaimLeapData, setdeathClaimLeapData] = useState(initialValues);
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

  const editChangeReqDate = (date) => {
    setRecord({ ...record, reqDate: date });
  };
  const editChangeLogDate = (date) => {
    setRecord({ ...record, logDate: date });
  };
  const editChangeEffDate = (date) => {
    setRecord({ ...record, effDate: date });
  };
  const editChangeAppDate = (date) => {
    setRecord({ ...record, approvDate: date });
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

  // Get All IPCA Surrender Data
  const getData = () => {
    axios
      .get(
        `http://localhost:8080/deathClaimLeap/getAllQCPending/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setData(resp.data);
        console.log("Data...", resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [passFail, setpassFail] = useState([]);
  const rule1 = "passFailFlag";
  const getpassFail = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpassFail(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/deathClaimLeap/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          policyNo: record.policyNo,
          tranNo: record.tranNo,
          uinNumber: record.uinNumber,
          reqDate: moment(record.reqDate)
            .format("YYYYMMDD")
            .toString(),
          logDate: moment(record.logDate)
            .format("YYYYMMDD")
            .toString(),
          clientId: record.clientId,
          contractType: record.contractType,
          productType: record.productType,
          policyStatus: record.policyStatus,
          fup: record.fup,
          totalPremium: record.totalPremium,
          basicSa: record.basicSa,
          additionalSa: record.additionalSa,
          inbuiltRiderSa: record.inbuiltRiderSa,
          reversionaryBonus: record.reversionaryBonus,
          interimBonus: record.interimBonus,
          guranteedAddition: record.guranteedAddition,
          loyaltyAddtion: record.loyaltyAddtion,
          otherRiderBenefit: record.otherRiderBenefit,
          terminalBonus: record.terminalBonus,
          totalBonus: record.totalBonus,
          annuityRefund: record.annuityRefund,
          fundValue: record.fundValue,
          totalDeathClaim: record.totalDeathClaim,
          policyDeposit: record.policyDeposit,
          penalInterest: record.penalInterest,
          grossPayable: record.grossPayable,
          termPremRecov: record.termPremRecov,
          interestOnPremium: record.interestOnPremium,
          gstOnPremium: record.gstOnPremium,
          cdaCharges: record.cdaCharges,
          otherCharges: record.otherCharges,
          policyLoan: record.policyLoan,
          policyLoanInterest: record.policyLoanInterest,
          moneybackPaid: record.moneybackPaid,
          annuityPaid: record.annuityPaid,
          mortChargesRefund: record.mortChargesRefund,
          adminFeeRefund: record.adminFeeRefund,
          guranteedAddCharges: record.guranteedAddCharges,
          tds: record.tds,
          totalRecovery: record.totalRecovery,
          netPayable: record.netPayable,
          leappfFlag: record.leappfFlag,
          leappfRemarks: record.leappfRemarks,
          qcApprovalFlag: record.qcApprovalFlag,
          qcApprovalRemark: record.qcApprovalRemark,
          qcApprovalDate: record.qcApprovalDate,
          approvalQcUserId: record.approvalQcUserId,
          pasUpdateFlag: record.pasUpdateFlag,
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

  // const handleDelete = (val) => {
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false,
  //   });
  //   axios
  //     .patch(
  //       `http://localhost:8080/deathClaimLeap/reinitiateTrans/${val}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       getData();
  //       setNotify({
  //         isOpen: true,
  //         message: "Deleted Successfully",
  //         type: "error",
  //       });
  //     });
  // };

  const handleDelete = (val) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8080/deathClaimLeap/softdelete/${val}/${userId}`,
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

  const [qc, setqc] = useState([]);
  const [qcOpen, setqcOpen] = useState(false);
  const qualityCheckingOpen = (val) => {
    setqcOpen(true);
    setqc(val);
  };

  const qualityCheckingClose = () => {
    setqcOpen(false);
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8080/deathClaimLeap/search/${val}`, {
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

  useEffect(() => {
    getData();
    getpassFail();
    return () => {};
  }, []);

  return (
    <>
      {qcOpen === true ? (
        <DeathClaimQC
          open={qcOpen}
          close={() => qualityCheckingClose()}
          data={qc}
          getData={getData}
        />
      ) : (
        <>
          <div className="classTitle">
            <h2>
              {" "}
              <b>Death Claim Payout Result</b>{" "}
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              style={{ marginLeft: 80 }}
              label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                second;
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
            {/* <Button
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
          <AddBoxIcon  fontSize="large" onClick={() => handleClickOpen()} />
        </Button> */}
          </div>
          <Paper className="paperStyle">
            <Table striped bordered hover size="md">
              <thead className="tableheader">
                <tr>
                  {/* <th>Id </th> */}
                  <th>Policy No</th>
                  <th>Transaction No</th>
                  <th>UIN Number</th>
                  <th>Req Date</th>
                  <th>Log Date</th>
                  <th>Product Type</th>
                  <th>Result</th>
                  <th>Quality Checking</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <tr>
                      {/* <td>{value.id}</td> */}
                      <td>{value.policyNo}</td>
                      <td>{value.transNo}</td>
                      <td>{value.uinNumber}</td>
                      <td>{moment(value.reqDate).format("DD-MM-yyyy")}</td>
                      <td>{moment(value.logDate).format("DD-MM-yyyy")}</td>
                      <td>{value.productType}</td>
                      <td>{value.leapFlag}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <PendingActionsIcon
                            style={{ cursor: "pointer" }}
                            className="deleteClass"
                            color="primary"
                            onClick={() => {
                              qualityCheckingOpen(value);
                            }}
                          />
                        </div>
                      </td>
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
                          {/* <DeleteIcon
                            style={{ cursor: "pointer" }}
                            className="deleteClass"
                            color="error"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this record?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  handleDelete(value.policyNo);
                                },
                              });
                            }}
                          /> */}
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

          <DeathClaimLeapDetailsEdit
            open={editOpen}
            handleClose={editClose}
            data={record}
            passFail={passFail}
            onChange={editChange}
            onChangeReqDate={editChangeReqDate}
            onChangeLogDate={editChangeLogDate}
            onChangeEffDate={editChangeEffDate}
            onChangeAppDate={editChangeAppDate}
            handleFormSubmit={() => editFormSubmit()}
          />
          <DeathClaimLeapDetailsInfo
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
        </>
      )}

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
    </>
  );
}

export default DeathClaimLeapDetails;
