import { TablePagination } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../Css/Content.css";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";

import DeathClaimTransactionAdd from "./DeathClaimTransactionAdd";
import DeathClaimTransactionEdit from "./DeathClaimTransactionEdit";
import DeathClaimTransactionInfo from "./DeathClaimTransactionInfo";
import SaveIcon from "@mui/icons-material/Save";

var initialValues = {
  companyId: "",
  policyNo: "",
  transNo: "",
  uinNumber: "",

  productType: "",
  contractType: "",
  planName: "",
  planCode: "",
  doc: "",

  riskComDate: "",
  policyTerm: "",
  premiumTerm: "",
  installmentPremium: "",
  billFreq: "",

  policyStatus: "",
  fup: "",
  dateOfRevival: "",
  dateOfDeath: "",
  dateOfIntimation: "",

  dateOfLogin: "",
  causeOfDeath: "",
  deathReasonCode: "",
  basicSumAssured: "",
  additionalSumAssured: "",

  termRiderSumAssured: "",
  inbuiltRiderSumAssured: "",
  reversionaryBonus: "",
  interimBonus: "",
  guranteedBonus: "",

  loyaltyAddition: "",
  otherRider: "",
  terminalBonus: "",
  totalBonus: "",
  refundOfPurchasePrice: "",

  fundValue: "",
  effectiveDate: "",
  approvalDate: "",
  totalDeathClaim: "",
  policyDeposit: "",
  penalInterest: "",
  grossPay: "",

  terminalPremRecov: "",
  interestOnPrem: "",
  gstOnPrem: "",
  cdaCharges: "",
  otherCharges: "",

  policyLoan: "",
  policyLoanInterest: "",
  moneybackPaidRecov: "",
  annuityPaidRecov: "",
  mortalityChargeRefund: "",

  yearlyAnnuityAmunt: "",
  annuityStartDate: "",
  annuityGuranteedYears: "",
  deathBenefitType:"",

  adminFeeRefund: "",
  guranteedAdditionCharges: "",
  tds: "",
  totalRecovery: "",
  netPayable: "",

  nominationFlag: "",
  nomineeClientId: "",
  assignementFlag: "",
  assigneeClientId: "",
  dateOfAssignment: "",
  claimId: "",
  deathClaimPayoutDate: "",

  makerFlag: "",
  checkerFlag: "",
  leapApprovalFlag: "",
  leapApprovalRemarks: "",
  leapApprovalDate: "",
  qcUserId: "",
  interimStatus: "",
};

function DeathClaimTransaction() {
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [deathClaimTransData, setdeathClaimTransData] = useState(initialValues);
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
    setdeathClaimTransData({ ...deathClaimTransData, [name]: value });
  };

  const onChangeDoc = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, doc: date });
  };

  const onChangeRiskComDate = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, riskComDate: date });
  };

  const onChangeFup = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, fup: date });
  };

  const onChangeDateOfRevival = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, dateOfRevival: date });
  };

  const onChangeDateOfDeath = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, dateOfDeath: date });
  };

  const onChangeDateOfIntimation = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, dateOfIntimation: date });
  };

  const onChangeDateOfLogin = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, dateOfLogin: date });
  };

  const onChangeAnnuityStartDate = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, annuityStartDate: date });
  };

  const onChangeEffectiveDate = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, effectiveDate: date });
  };

  const onChangeApprovalDate = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, approvalDate: date });
  };

  const onChangeDateOfAssignment = (date) => {
    setdeathClaimTransData({ ...deathClaimTransData, dateOfAssignment: date });
  };

  const onChangeDeathClaimPayoutDate = (date) => {
    setdeathClaimTransData({
      ...deathClaimTransData,
      deathClaimPayoutDate: date,
    });
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const editChangeDoc = (date) => {
    setRecord({ ...record, doc: date });
  };

  const editChangeRiskComDate = (date) => {
    setRecord({ ...record, riskComDate: date });
  };

  const editChangeFup = (date) => {
    setRecord({ ...record, fup: date });
  };

  const editChangeDateOfRevival = (date) => {
    setRecord({ ...record, dateOfRevival: date });
  };

  const editChangeDateOfDeath = (date) => {
    setRecord({ ...record, dateOfDeath: date });
  };

  const editChangeDateOfIntimation = (date) => {
    setRecord({ ...record, dateOfIntimation: date });
  };

  const editChangeDateOfLogin = (date) => {
    setRecord({ ...record, dateOfLogin: date });
  };

  const editChangeAnnuityStartDate = (date) => {
    setRecord({ ...record, annuityStartDate: date });
  };

  const editChangeEffectiveDate = (date) => {
    setRecord({ ...record, effectiveDate: date });
  };

  const editChangeApprovalDate = (date) => {
    setRecord({ ...record, approvalDate: date });
  };

  const editChangeDateOfAssignment = (date) => {
    setRecord({ ...record, dateOfAssignment: date });
  };

  const editChangeDeathClaimPayoutDate = (date) => {
    setRecord({
      ...record,
      deathClaimPayoutDate: date,
    });
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

  // Get All Client details Pas Data
  const getData = () => {
    axios
      .get(`http://localhost:8080/deathClaimTransactionPas/getAll/${userId}`, {
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
        `http://localhost:8080/deathClaimTransactionPas/add/${userId}`,
        {
          companyId: deathClaimTransData.companyId,
          policyNo: deathClaimTransData.policyNo,
          transNo: deathClaimTransData.transNo,
          uinNumber: deathClaimTransData.uinNumber,

          productType: deathClaimTransData.productType,
          contractType: deathClaimTransData.contractType,
          planName: deathClaimTransData.planName,
          planCode: deathClaimTransData.planCode,
          doc: moment(deathClaimTransData.doc)
            .format("YYYYMMDD")
            .toString(),

          riskComDate: moment(deathClaimTransData.riskComDate)
            .format("YYYYMMDD")
            .toString(),
          policyTerm: deathClaimTransData.policyTerm,
          premiumTerm: deathClaimTransData.premiumTerm,
          installmentPremium: deathClaimTransData.installmentPremium,
          billFreq: deathClaimTransData.billFreq,

          policyStatus: deathClaimTransData.policyStatus,
          fup: moment(deathClaimTransData.fup)
            .format("YYYYMMDD")
            .toString(),
          dateOfRevival: moment(deathClaimTransData.dateOfRevival)
            .format("YYYYMMDD")
            .toString(),
          dateOfDeath: moment(deathClaimTransData.dateOfDeath)
            .format("YYYYMMDD")
            .toString(),
          dateOfIntimation: moment(deathClaimTransData.dateOfIntimation)
            .format("YYYYMMDD")
            .toString(),

          dateOfLogin: moment(deathClaimTransData.dateOfLogin)
            .format("YYYYMMDD")
            .toString(),
          causeOfDeath: deathClaimTransData.causeOfDeath,
          deathReasonCode: deathClaimTransData.deathReasonCode,
          basicSumAssured: deathClaimTransData.basicSumAssured,
          additionalSumAssured: deathClaimTransData.additionalSumAssured,

          termRiderSumAssured: deathClaimTransData.termRiderSumAssured,
          inbuiltRiderSumAssured: deathClaimTransData.inbuiltRiderSumAssured,
          reversionaryBonus: deathClaimTransData.reversionaryBonus,
          interimBonus: deathClaimTransData.interimBonus,
          guranteedBonus: deathClaimTransData.guranteedBonus,

          loyaltyAddition: deathClaimTransData.loyaltyAddition,
          otherRider: deathClaimTransData.otherRider,
          terminalBonus: deathClaimTransData.terminalBonus,
          totalBonus: deathClaimTransData.totalBonus,
          refundOfPurchasePrice: deathClaimTransData.refundOfPurchasePrice,

          fundValue: deathClaimTransData.fundValue,
          effectiveDate: moment(deathClaimTransData.effectiveDate)
            .format("YYYYMMDD")
            .toString(),
          approvalDate: moment(deathClaimTransData.approvalDate)
            .format("YYYYMMDD")
            .toString(),
          totalDeathClaim: deathClaimTransData.totalDeathClaim,
          policyDeposit: deathClaimTransData.policyDeposit,
          penalInterest: deathClaimTransData.penalInterest,
          grossPay: deathClaimTransData.grossPay,

          terminalPremRecov: deathClaimTransData.terminalPremRecov,
          interestOnPrem: deathClaimTransData.interestOnPrem,
          gstOnPrem: deathClaimTransData.gstOnPrem,
          cdaCharges: deathClaimTransData.cdaCharges,
          otherCharges: deathClaimTransData.otherCharges,

          policyLoan: deathClaimTransData.policyLoan,
          policyLoanInterest: deathClaimTransData.policyLoanInterest,
          moneybackPaidRecov: deathClaimTransData.moneybackPaidRecov,
          annuityPaidRecov: deathClaimTransData.annuityPaidRecov,
          mortalityChargeRefund: deathClaimTransData.mortalityChargeRefund,

          annuityStartDate: moment(deathClaimTransData.annuityStartDate)
            .format("YYYYMMDD")
            .toString(),
          yearlyAnnuityAmunt: deathClaimTransData.yearlyAnnuityAmunt,
          annuityGuranteedYears: deathClaimTransData.annuityGuranteedYears,

          adminFeeRefund: deathClaimTransData.adminFeeRefund,
          guranteedAdditionCharges:
            deathClaimTransData.guranteedAdditionCharges,
          tds: deathClaimTransData.tds,
          totalRecovery: deathClaimTransData.totalRecovery,
          netPayable: deathClaimTransData.netPayable,

          nominationFlag: deathClaimTransData.nominationFlag,
          nomineeClientId: deathClaimTransData.nomineeClientId,
          assignementFlag: deathClaimTransData.assignementFlag,
          assigneeClientId: deathClaimTransData.assigneeClientId,
          dateOfAssignment: moment(deathClaimTransData.dateOfAssignment)
            .format("YYYYMMDD")
            .toString(),
          claimId: deathClaimTransData.claimId,
          deathClaimPayoutDate: moment(deathClaimTransData.deathClaimPayoutDate)
            .format("YYYYMMDD")
            .toString(),

          makerFlag: deathClaimTransData.makerFlag,
          checkerFlag: deathClaimTransData.checkerFlag,
          leapApprovalFlag: deathClaimTransData.leapApprovalFlag,
          leapApprovalRemarks: deathClaimTransData.leapApprovalRemarks,
          leapApprovalDate: moment(deathClaimTransData.leapApprovalDate)
            .format("YYYYMMDD")
            .toString(),
          qcUserId: deathClaimTransData.qcUserId,
          interimStatus: deathClaimTransData.interimStatus,
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
        setdeathClaimTransData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/deathClaimTransactionPas/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          policyNo: record.policyNo,
          transNo: record.transNo,
          uinNumber: record.uinNumber,

          productType: record.productType,
          contractType: record.contractType,
          planName: record.planName,
          planCode: record.planCode,
          doc: moment(record.doc)
            .format("YYYYMMDD")
            .toString(),

          riskComDate: moment(record.riskComDate)
            .format("YYYYMMDD")
            .toString(),
          policyTerm: record.policyTerm,
          premiumTerm: record.premiumTerm,
          installmentPremium: record.installmentPremium,
          billFreq: record.billFreq,

          policyStatus: record.policyStatus,
          fup: moment(record.fup)
            .format("YYYYMMDD")
            .toString(),
          dateOfRevival: moment(record.dateOfRevival)
            .format("YYYYMMDD")
            .toString(),
          dateOfDeath: moment(record.dateOfDeath)
            .format("YYYYMMDD")
            .toString(),
          dateOfIntimation: moment(record.dateOfIntimation)
            .format("YYYYMMDD")
            .toString(),

          dateOfLogin: moment(record.dateOfLogin)
            .format("YYYYMMDD")
            .toString(),
          causeOfDeath: record.causeOfDeath,
          deathReasonCode: record.deathReasonCode,
          basicSumAssured: record.basicSumAssured,
          additionalSumAssured: record.additionalSumAssured,

          termRiderSumAssured: record.termRiderSumAssured,
          inbuiltRiderSumAssured: record.inbuiltRiderSumAssured,
          reversionaryBonus: record.reversionaryBonus,
          interimBonus: record.interimBonus,
          guranteedBonus: record.guranteedBonus,

          loyaltyAddition: record.loyaltyAddition,
          otherRider: record.otherRider,
          terminalBonus: record.terminalBonus,
          totalBonus: record.totalBonus,
          refundOfPurchasePrice: record.refundOfPurchasePrice,

          fundValue: record.fundValue,
          effectiveDate: moment(record.effectiveDate)
            .format("YYYYMMDD")
            .toString(),
          approvalDate: moment(record.approvalDate)
            .format("YYYYMMDD")
            .toString(),
          totalDeathClaim: record.totalDeathClaim,
          policyDeposit: record.policyDeposit,
          penalInterest: record.penalInterest,
          grossPay: record.grossPay,

          terminalPremRecov: record.terminalPremRecov,
          interestOnPrem: record.interestOnPrem,
          gstOnPrem: record.gstOnPrem,
          cdaCharges: record.cdaCharges,
          otherCharges: record.otherCharges,

          policyLoan: record.policyLoan,
          policyLoanInterest: record.policyLoanInterest,
          moneybackPaidRecov: record.moneybackPaidRecov,
          annuityPaidRecov: record.annuityPaidRecov,
          mortalityChargeRefund: record.mortalityChargeRefund,

          annuityStartDate: moment(record.annuityStartDate)
            .format("YYYYMMDD")
            .toString(),
          yearlyAnnuityAmunt: record.yearlyAnnuityAmunt,
          annuityGuranteedYears: record.annuityGuranteedYears,

          adminFeeRefund: record.adminFeeRefund,
          guranteedAdditionCharges: record.guranteedAdditionCharges,
          tds: record.tds,
          totalRecovery: record.totalRecovery,
          netPayable: record.netPayable,

          nominationFlag: record.nominationFlag,
          nomineeClientId: record.nomineeClientId,
          assignementFlag: record.assignementFlag,
          assigneeClientId: record.assigneeClientId,
          dateOfAssignment: moment(record.dateOfAssignment)
            .format("YYYYMMDD")
            .toString(),
          claimId: record.claimId,
          deathClaimPayoutDate: moment(record.deathClaimPayoutDate)
            .format("YYYYMMDD")
            .toString(),

          makerFlag: record.makerFlag,
          checkerFlag: record.checkerFlag,
          leapApprovalFlag: record.leapApprovalFlag,
          leapApprovalRemarks: record.leapApprovalRemarks,
          leapApprovalDate: moment(record.leapApprovalDate)
            .format("YYYYMMDD")
            .toString(),
          qcUserId: record.qcUserId,
          interimStatus: record.interimStatus,
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
      })
      .catch((err) => {
        console.log(err);
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
        `http://localhost:8080/deathClaimTransactionPas/softdelete/${id}/${userId}`,
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
          .get(`http://localhost:8080/deathClaimTransactionPas/search/${val}`, {
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
  const rule1 = "coverName";
  const [coverNameData, setcoverNameData] = useState([]);
  const getCoverNameData = () => {
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

  const rule3 = "billFrequency";
  const [billFrequencyData, setbillFrequencyData] = useState([]);
  const getBillFrequencyData = () => {
    axios
      .get(`http://localhost:8080/param/${rule3}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setbillFrequencyData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule4 = "statusType";
  const [statusCodeData, setstatusCodeData] = useState([]);
  const getStatusTypeData = () => {
    axios
      .get(`http://localhost:8080/param/${rule4}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setstatusCodeData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule5 = "yesNoFlag";
  const [yesNoFlagData, setyesNoFlagData] = useState([]);
  const getYesNoFlagData = () => {
    axios
      .get(`http://localhost:8080/param/${rule5}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setyesNoFlagData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule6 = "interimstatus";
  const [InterimStatusData, setInterimStatusData] = useState([]);
  const getInterimStatusData = () => {
    axios
      .get(`http://localhost:8080/param/${rule6}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setInterimStatusData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rule7 = "causeOfDeath";
  const [causeOfDeathData, setcauseOfDeathData] = useState([]);
  const getcauseOfDeathData = () => {
    axios
      .get(`http://localhost:8080/param/${rule7}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setcauseOfDeathData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getcompanyData();
    getBillFrequencyData();
    getCoverNameData();
    getcoverCodeData();
    getStatusTypeData();
    getYesNoFlagData();
    getInterimStatusData();
    getcauseOfDeathData();
    return () => {};
  }, []);

  const bulkApproval = () => {
    let uinNoData = [];
    data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((value, index) => {
        if (value.selected) {
          console.log(
            "id:" + value.id,
            "selected:" + value.selected + "policynum:" + value.uinNumber
          );
          uinNoData.push(value.uinNumber);
        }
      });
    console.log(uinNoData, "policyNo");
    axios
      .post(
        `http://localhost:8080/deathClaimLeap/assignMultipleTrans/${userId}`,

        uinNoData,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "error",
        });
        window.location = "deathClaimLeapDetails";
      });
  };

  const [calculationCheck, setcalculationCheck] = useState(true);

  const handleCheckAll = (e) => {
    const { value, checked } = e.target;

    setData((prevdata) =>
      prevdata.map((val, index) => {
        if (
          index >= page * rowsPerPage &&
          index < page * rowsPerPage + rowsPerPage
        ) {
          if (checked) {
            setcalculationCheck(false);
            return { ...val, selected: true };
          } else {
            setcalculationCheck(true);
            return { ...val, selected: false };
          }
        } else {
          return val;
        }
      })
    );
  };

  const handleCheck = (e, id) => {
    const { value, checked } = e.target;
    setData((prevdata) =>
      prevdata.map((val, index) => {
        if (
          index >= page * rowsPerPage &&
          index < page * rowsPerPage + rowsPerPage &&
          val.id === id
        ) {
          if (checked) {
            setcalculationCheck(false);
            return { ...val, selected: true };
          } else {
            setcalculationCheck(true);
            return { ...val, selected: false };
          }
        } else {
          return val;
        }
      })
    );
  };

  return (
    <>
      <div className="classTitle">
        <h2>
          {" "}
          <b>Death Claim Transaction PAS</b>{" "}
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
        <Tooltip title="Proceed For Calculation">
          <Button
            onClick={() => bulkApproval()}
            disabled={calculationCheck}
            variant="contained"
            color="primary"
            style={{
              marginRight: "52rem",
              marginTop: "0.5rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
          >
            <SaveIcon />
          </Button>
        </Tooltip>
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
              <th>
                Select
                <br />
                <input
                  style={{ width: "1rem", height: "1rem" }}
                  type="checkbox"
                  name="selectAll"
                  onChange={handleCheckAll}
                />
              </th>
              <th>Policy No</th>
              <th>Trans No</th>
              <th>UIN Number</th>
              <th>Date Of Death</th>
              <th>Date Of Login</th>
              <th>Cause Of Death</th>
              <th>Sum Assured</th>
              <th>Policy Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value, index) => (
                <tr>
                  <td>
                    <input
                      style={{ width: "20px", height: "20px" }}
                      type="checkbox"
                      name={value.flcPolicyNo}
                      value={value.flcPolicyNo}
                      checked={!!value.selected}
                      onChange={(e) => {
                        handleCheck(e, value.id);
                      }}
                    />
                  </td>
                  <td>{value.policyNo}</td>
                  <td>{value.transNo}</td>
                  <td>{value.uinNumber}</td>
                  <td>{moment(value.dateOfDeath).format("DD-MM-YYYY")}</td>
                  <td>{moment(value.dateOfLogin).format("DD-MM-YYYY")}</td>
                  <td>{value.causeOfDeath}</td>
                  <td>{value.basicSumAssured}</td>
                  <td>{value.policyStatus}</td>

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
      <DeathClaimTransactionAdd
        open={open}
        handleClose={handleClickClose}
        data={deathClaimTransData}
        companyData={companyData}
        billFrequencyData={billFrequencyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        statusCodeData={statusCodeData}
        yesNoFlagData={yesNoFlagData}
        InterimStatusData={InterimStatusData}
        causeOfDeathData={causeOfDeathData}
        onChange={onChange}
        onChangeDoc={onChangeDoc}
        onChangeRiskComDate={onChangeRiskComDate}
        onChangeFup={onChangeFup}
        onChangeDateOfRevival={onChangeDateOfRevival}
        onChangeDateOfDeath={onChangeDateOfDeath}
        onChangeDateOfIntimation={onChangeDateOfIntimation}
        onChangeDateOfLogin={onChangeDateOfLogin}
        onChangeAnnuityStartDate={onChangeAnnuityStartDate}
        onChangeEffectiveDate={onChangeEffectiveDate}
        onChangeApprovalDate={onChangeApprovalDate}
        onChangeDateOfAssignment={onChangeDateOfAssignment}
        onChangeDeathClaimPayoutDate={onChangeDeathClaimPayoutDate}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <DeathClaimTransactionEdit
        open={editOpen}
        handleClose={editClose}
        data={record}
        companyData={companyData}
        billFrequencyData={billFrequencyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        statusCodeData={statusCodeData}
        yesNoFlagData={yesNoFlagData}
        InterimStatusData={InterimStatusData}
        onChange={editChange}
        onChangeDoc={editChangeDoc}
        onChangeRiskComDate={editChangeRiskComDate}
        onChangeFup={editChangeFup}
        onChangeDateOfRevival={editChangeDateOfRevival}
        onChangeDateOfDeath={editChangeDateOfDeath}
        onChangeDateOfIntimation={editChangeDateOfIntimation}
        onChangeDateOfLogin={editChangeDateOfLogin}
        onChangeAnnuityStartDate={editChangeAnnuityStartDate}
        onChangeEffectiveDate={editChangeEffectiveDate}
        onChangeApprovalDate={editChangeApprovalDate}
        onChangeDateOfAssignment={editChangeDateOfAssignment}
        onChangeDeathClaimPayoutDate={editChangeDeathClaimPayoutDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <DeathClaimTransactionInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        companyData={companyData}
        billFrequencyData={billFrequencyData}
        coverNameData={coverNameData}
        coverCodeData={coverCodeData}
        statusCodeData={statusCodeData}
        yesNoFlagData={yesNoFlagData}
        InterimStatusData={InterimStatusData}
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

export default DeathClaimTransaction;
