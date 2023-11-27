import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import {
  Grid,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  FormControl,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../Css/Content.css";
import Notification from "../Dialogs/Notification";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BsCardChecklist } from "react-icons/bs";
import FundCheck from "./FundCheck";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeathClaimFundCheck from "./DeathClaimFundCheck";

function DeathClaimQc({ data, open, close, getData }) {
  const userId = sessionStorage.getItem("userId");

  const [policyData, setpolicyData] = useState({});
  const [coverData, setcoverData] = useState([]);
  const [leapData, setleapData] = useState({});
  const [transData, settransData] = useState([]);

  const [fundCheck, setfundCheck] = useState(false);

  const fundCheckingOpen = () => {
    setfundCheck(true);
  };

  const fundCheckingClose = () => {
    setfundCheck(false);
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [submitCheck, setsubmitCheck] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setleapData({ ...leapData, [name]: value });
  };

  const getPolicyData = () => {
    axios
      .get(
        `http://localhost:8080/deathClaimPolicyDetails/getByPolicyNo/${data.policyNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setpolicyData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCoverData = () => {
    axios
      .get(
        `http://localhost:8080/deathClaimCoverPas/getByUinNo/${data.uinNumber}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setcoverData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTransData = () => {
    axios
      .get(
        `http://localhost:8080/deathClaimTransactionPas/getProcessedByUinNo/${data.uinNumber}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        settransData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLeapDeathClaim = () => {
    axios
      .get(
        `http://localhost:8080/deathClaimLeap/getByUinNo/${data.uinNumber}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setleapData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("Leap Data", leapData);

  const [pf, setpf] = useState([]);
  const rule1 = "passFailFlag";
  const getpf = () => {
    axios
      .get(`http://localhost:8080/param/${rule1}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setpf(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const qcSubmit = () => {
    axios
      .patch(
        `http://localhost:8080/deathClaimLeap/qcUpdate/${leapData.uinNumber}/${userId}`,
        {
          qcApprovalFlag: leapData.qcApprovalFlag,
          qcApprovalRemark: leapData.qcApprovalRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        close();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      });
  };

  const [UinData, setUinData] = useState([]);
  const getUINData = () => {
    axios
      .get(
        `http://localhost:8080/uinMaster/getActiveByUinNo/${data.uinNumber}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setUinData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getpf();
    getPolicyData();
    getCoverData();
    getTransData();
    getLeapDeathClaim();
    getUINData();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <Paper elevation={12} className="paperContainer">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={close}
              variant="danger"
              style={{ marginLeft: "2rem", marginTop: "1.3rem" }}
            >
              <ArrowBackIcon />
            </Button>
            <h1
              style={{
                backgroundColor: "#0a3161",
                color: "white",
                padding: ".5rem",
                borderRadius: "3%",
              }}
            >
              Surrender Quality Checking
            </h1>

            <div>
              {transData.interimStatus === "Processed" ? (
                <Tooltip title="Generate PDF">
                  <DownloadIcon
                    color="primary"
                    style={{
                      cursor: "pointer",
                      marginRight: "2rem",
                      marginTop: "1.3rem",
                    }}
                    // onClick={() => downloadPdf()}
                  />
                </Tooltip>
              ) : null}
            </div>
          </div>

          <Paper className="paperScreen" elevation={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "rgb(33, 70, 199)" }}>
                Policy and Cover Details{" "}
              </h2>
              {UinData?.productType?.includes("L") ? (
                <h2 style={{ color: "rgb(33, 70, 199)" }}>ULIP </h2>
              ) : null}
              {UinData?.productType?.includes("N") ? (
                <h2 style={{ color: "rgb(33, 70, 199)" }}>Non-ULIP </h2>
              ) : null}
            </div>

            <div>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Client Number"
                      className="formtext"
                      id="clntNum"
                      value={policyData?.clntNum}
                      placeholder="Client Num"
                      inputProps={{ readOnly: true }}
                      name="clntNum"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Policy Number"
                      className="formtext"
                      id="chdrNum"
                      value={policyData?.chdrNum}
                      placeholder="Policy Num"
                      inputProps={{ readOnly: true }}
                      name="chdrNum"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Bill Frequency"
                      className="formtext"
                      id="billFreq"
                      value={policyData?.billFreq}
                      placeholder="Bill Frequency"
                      inputProps={{ readOnly: true }}
                      name="billFreq"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Installment premium"
                      className="formtext"
                      id="installmentPremium"
                      value={policyData?.installmentPremium}
                      placeholder="Installment premium"
                      inputProps={{ readOnly: true }}
                      name="installmentPremium"
                      onChange={(e) => onChange(e)}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Extra premium"
                      className="formtext"
                      id="extraPremium"
                      value={policyData?.extraPremium}
                      placeholder="Extra premium"
                      inputProps={{ readOnly: true }}
                      name="extraPremium"
                      onChange={(e) => onChange(e)}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="UIN No."
                      className="formtext"
                      id="uinNumber"
                      value={policyData?.uinNumber}
                      placeholder="UIN No."
                      inputProps={{ readOnly: true }}
                      name="uinNumber"
                      onChange={(e) => onChange(e)}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="DOC Date:"
                      className="formtext"
                      id="docDate"
                      value={moment(policyData?.docDate).format("DD/MM/YYYY")}
                      placeholder="DOC Date:"
                      inputProps={{ readOnly: true }}
                      name="docDate"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="FUP:"
                      className="formtext"
                      id="fup"
                      value={moment(policyData?.fup).format("DD/MM/YYYY")}
                      placeholder="FUP:"
                      inputProps={{ readOnly: true }}
                      name="fup"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Life Assured Age"
                      className="formtext"
                      id="laAge"
                      value={policyData?.laAge}
                      placeholder="Life Assured Age"
                      inputProps={{ readOnly: true }}
                      name="laAge"
                      onChange={(e) => onChange(e)}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Policy Holder Age"
                      className="formtext"
                      id="phAge"
                      value={policyData?.phAge}
                      placeholder="Policy Holder Age"
                      inputProps={{ readOnly: true }}
                      name="phAge"
                      onChange={(e) => onChange(e)}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Status Code"
                      className="formtext"
                      id="statusCode"
                      value={policyData?.statusCode}
                      placeholder="Status Code"
                      inputProps={{ readOnly: true }}
                      name="statusCode"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={8} md={6} lg={3}>
                    <TextField
                      label="Smoker Flag"
                      className="formtext"
                      id="smokerFlag"
                      value={policyData?.smokerFlag}
                      placeholder="Smoker Flag"
                      inputProps={{ readOnly: true }}
                      name="smokerFlag"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                </Grid>
              </form>
              <hr />
              <>
                <h2 style={{ color: "rgb(33, 70, 199)" }}>Coverages/Riders</h2>

                <form>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                    <TreeItem
                      nodeId={coverData?.id}
                      label={`${coverData?.planCode} ( ${coverData?.planName} )`}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Client Number"
                            className="formtext"
                            id="clntNum"
                            value={coverData?.clntNum}
                            placeholder="Client Number"
                            name="clntNum"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Policy No"
                            className="formtext"
                            id="policyNo"
                            value={coverData?.policyNo}
                            placeholder="Policy No"
                            name="policyNo"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Plan Name"
                            className="formtext"
                            id="planName"
                            value={coverData?.planName}
                            placeholder="Plan Name"
                            name="planName"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Plan Code"
                            className="formtext"
                            id="planCode"
                            value={coverData?.planCode}
                            placeholder="Plan Code"
                            name="planCode"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="UIN Number"
                            className="formtext"
                            id="uinNumber"
                            value={coverData?.uinNumber}
                            placeholder="UIN Number"
                            name="uinNumber"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Date Of Commencement Date:"
                            id="docDate"
                            value={moment(coverData?.docDate).format(
                              "DD/MM/YYYY"
                            )}
                            placeholder="Date Of Commencement Date:"
                            name="docDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Risk Com Date:"
                            id="riskComDate"
                            value={moment(coverData?.riskComDate).format(
                              "DD/MM/YYYY"
                            )}
                            placeholder="Risk Com Date:"
                            name="riskComDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Term Rider Sum Assured"
                            className="formtext"
                            id="termRiderSumAssured"
                            value={coverData?.termRiderSumAssured}
                            placeholder="Term Rider Sum Assured"
                            name="termRiderSumAssured"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Sum Assured"
                            className="formtext"
                            id="sumAssured"
                            value={coverData?.sumAssured}
                            placeholder="Sum Assured"
                            name="sumAssured"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Policy Term"
                            className="formtext"
                            id="policyTerm"
                            value={coverData?.policyTerm}
                            placeholder="Policy Term"
                            name="policyTerm"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Premium Term"
                            className="formtext"
                            id="premiumTerm"
                            value={coverData?.premiumTerm}
                            placeholder="Premium Term"
                            name="premiumTerm"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Cover Premium"
                            className="formtext"
                            id="coverPremium"
                            value={coverData?.coverPremium}
                            placeholder="Cover Premium"
                            name="coverPremium"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Cover Status"
                            className="formtext"
                            id="coverStatus"
                            value={coverData?.coverStatus}
                            placeholder="Cover Status"
                            name="coverStatus"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </TreeItem>
                  </TreeView>
                </form>
              </>
              <>
                <h2 style={{ color: "rgb(33, 70, 199)" }}>
                  Transaction Details
                </h2>

                <form>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                    <TreeItem
                      nodeId={transData?.id}
                      label={`${transData?.uinNumber}`}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Transaction Number"
                            className="formtext"
                            id="transNo"
                            value={transData.transNo}
                            placeholder="Transaction Number"
                            name="transNo"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Product Type"
                            className="formtext"
                            id="productType"
                            value={transData.productType}
                            placeholder="Product Type"
                            name="productType"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Cause of Death"
                            className="formtext"
                            id="causeOfDeath"
                            value={transData.causeOfDeath}
                            placeholder="Cause of Death"
                            name="causeOfDeath"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Date of Death"
                            className="formtext"
                            id="dateOfDeath"
                            value={moment(transData.dateOfDeath).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Date of Death"
                            name="dateOfDeath"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Date Of Revival:"
                            id="dateOfRevival"
                            value={moment(transData.dateOfRevival).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Date Of Revival:"
                            name="dateOfRevival"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Date Of Intimation:"
                            id="dateOfIntimation"
                            value={moment(transData.dateOfIntimation).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Date Of Intimation:"
                            name="dateOfIntimation"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Death Reason Code"
                            className="formtext"
                            id="deathReasonCode"
                            value={transData.deathReasonCode}
                            placeholder="Death Reason Code"
                            name="deathReasonCode"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Yearly Annuity Amount"
                            className="formtext"
                            id="yearlyAnnuityAmunt"
                            value={transData.yearlyAnnuityAmunt}
                            placeholder="Yearly Annuity Amount"
                            name="yearlyAnnuityAmunt"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Annuity Start Date:"
                            id="annuityStartDate"
                            value={moment(transData.annuityStartDate).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Annuity Start Date:"
                            name="annuityStartDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Annuity Guaranteed Years"
                            className="formtext"
                            id="annuityGuranteedYears"
                            value={transData.annuityGuranteedYears}
                            placeholder="Annuity Guaranteed Years"
                            name="annuityGuranteedYears"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        {UinData?.productType?.includes("L") && (
                          <>
                            <Grid item xs={8} md={6} lg={4}>
                              <TextField
                                label="Effective Date"
                                className="formtext"
                                id="effectiveDate"
                                value={transData.effectiveDate}
                                placeholder="Effective Date"
                                name="effectiveDate"
                                inputProps={{ readOnly: true }}
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </>
                        )}

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Approval Date:"
                            id="approvalDate"
                            value={moment(transData.approvalDate).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Approval Date:"
                            name="approvalDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Maker Flag"
                            className="formtext"
                            id="makerFlag"
                            value={transData.makerFlag}
                            placeholder="Maker Flag"
                            name="makerFlag"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Checker Flag"
                            className="formtext"
                            id="checkerFlag"
                            value={transData.checkerFlag}
                            placeholder="Checker Flag"
                            name="checkerFlag"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Interim Status"
                            className="formtext"
                            id="interimStatus"
                            value={transData.interimStatus}
                            placeholder="Interim Status"
                            name="interimStatus"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </TreeItem>
                  </TreeView>
                </form>
              </>
            </div>
          </Paper>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Paper elevation={12} className="paperTrans">
              <h2 style={{ color: "rgb(33, 70, 199)" }}>Data From PAS</h2>
              <hr
                style={{
                  color: "blue",
                  width: "100%",
                  borderBottom: "5px solid rgb(33, 70, 199)",
                }}
              />
              <>
                <form>
                  <Grid container spacing={1} style={{ marginTop: "0.5rem" }}>
                    <Grid container spacing={1}>
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Basic Sum Assured"
                          className="formtext"
                          id="basicSumAssured"
                          value={transData.basicSumAssured}
                          placeholder="Basic Sum Assured"
                          name="basicSumAssured"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      {UinData?.productType?.includes("N") && (
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Additional Sum Assured"
                            className="formtext"
                            id="additionalSumAssured"
                            value={transData.additionalSumAssured}
                            placeholder="Additional Sum Assured"
                            name="additionalSumAssured"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <hr
                      style={{
                        color: "rgb(33, 70, 199)",
                        width: "100%",
                        borderBottom: "5px solid rgb(33, 70, 199)",
                      }}
                    />
                    <Grid container spacing={1}>
                      {UinData?.productType?.includes("N") && (
                        <>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Reversionary Bonus"
                              className="formtext"
                              id="reversionaryBonus"
                              value={transData.reversionaryBonus}
                              placeholder="Reversionary Bonus"
                              name="reversionaryBonus"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Interim Bonus"
                              className="formtext"
                              id="interimBonus"
                              value={transData.interimBonus}
                              placeholder="Interim Bonus"
                              name="interimBonus"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Guaranteed Bonus"
                              className="formtext"
                              id="guranteedBonus"
                              value={transData.guranteedBonus}
                              placeholder="Guaranteed Bonus"
                              name="guranteedBonus"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>

                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Loyalty Addition"
                              className="formtext"
                              id="loyaltyAddition"
                              value={transData.loyaltyAddition}
                              placeholder="Loyalty Addition"
                              name="loyaltyAddition"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Terminal Bonus"
                              className="formtext"
                              id="terminalBonus"
                              value={transData.terminalBonus}
                              placeholder="Terminal Bonus"
                              name="terminalBonus"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Total Bonus"
                              className="formtext"
                              id="totalBonus"
                              value={transData.totalBonus}
                              placeholder="Total Bonus"
                              name="totalBonus"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </>
                      )}

                      {UinData?.productType?.includes("L") && (
                        <>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Mortality Charges Refund"
                              className="formtext"
                              id="mortalityChargeRefund"
                              value={transData.mortalityChargeRefund}
                              placeholder="Mortality Charges Refund"
                              name="mortalityChargeRefund"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Fund Value"
                              className="formtext"
                              id="fundValue"
                              value={transData.fundValue}
                              placeholder="Fund Value"
                              name="fundValue"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Total Death Claim"
                          className="formtext"
                          id="totalDeathClaim"
                          value={transData.totalDeathClaim}
                          placeholder="Total Death Claim"
                          name="totalDeathClaim"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      {UinData?.productType?.includes("N") && (
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Penal Interest"
                            className="formtext"
                            id="penalInterest"
                            value={transData.penalInterest}
                            placeholder="Penal Interest"
                            name="penalInterest"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <hr
                      style={{
                        color: "black",
                        width: "100%",
                        borderBottom: "5px solid rgb(33, 70, 199)",
                      }}
                    />
                    <Grid container spacing={1} style={{}}>
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Gross Pay"
                          className="formtext"
                          id="grossPay"
                          value={transData.grossPay}
                          placeholder="Gross Pay"
                          name="grossPay"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      {UinData?.productType?.includes("N") && (
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Interest on Prem"
                            className="formtext"
                            id="interestOnPrem"
                            value={transData.interestOnPrem}
                            placeholder="Interest on Prem"
                            name="interestOnPrem"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      )}
                    </Grid>

                    <hr
                      style={{
                        color: "black",
                        width: "100%",
                        borderBottom: "5px solid rgb(33, 70, 199)",
                      }}
                    />
                    <Grid container spacing={1} style={{}}>
                      {UinData?.productType?.includes("N") && (
                        <>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Gst on Prem"
                              className="formtext"
                              id="gstOnPrem"
                              value={transData.gstOnPrem}
                              placeholder="Gst on Prem"
                              name="gstOnPrem"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>

                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Money Back Paid Recov"
                              className="formtext"
                              id="moneybackPaidRecov"
                              value={transData.moneybackPaidRecov}
                              placeholder="Money Back Paid Recov"
                              name="moneybackPaidRecov"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>

                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Annuity Paid Recov"
                              className="formtext"
                              id="annuityPaidRecov"
                              value={transData.annuityPaidRecov}
                              placeholder="Annuity Paid Recov"
                              name="annuityPaidRecov"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Total Recovery"
                          className="formtext"
                          id="totalRecovery"
                          value={transData.totalRecovery}
                          placeholder="Total Recovery"
                          name="totalRecovery"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    <hr
                      style={{
                        color: "black",
                        width: "100%",
                        borderBottom: "5px solid rgb(33, 70, 199)",
                      }}
                    />
                    <Grid container spacing={1} style={{}}>
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Net Payable"
                          className="formtext"
                          id="netPayable"
                          value={transData.netPayable}
                          placeholder="Net Payable"
                          name="netPayable"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </>
            </Paper>
            <Paper elevation={12} className="paperPurple">
              <h2 style={{ color: "rgb(33, 70, 199)" }}>LEAPS Details</h2>
              <hr
                style={{
                  color: "blue",
                  width: "100%",
                  borderBottom: "5px solid rgb(33, 70, 199)",
                }}
              />
              <form>
                <Grid container spacing={1} style={{ marginTop: "0.5rem" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Basic Sa"
                        className="formtext"
                        id="basicSa"
                        value={leapData.basicSa}
                        placeholder="Basic Sa"
                        name="basicSa"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      ></TextField>
                    </Grid>
                    {UinData?.productType?.includes("N") && (
                      <>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Reversionary Bonus"
                            className="formtext"
                            id="reversionaryBonus"
                            value={leapData.reversionaryBonus}
                            placeholder="Reversionary Bonus"
                            name="reversionaryBonus"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Interim Bonus"
                            className="formtext"
                            id="interimBonus"
                            value={leapData.interimBonus}
                            placeholder="Interim Bonus"
                            name="interimBonus"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Guaranteed Addition"
                            className="formtext"
                            id="guranteedAddition"
                            value={leapData.guranteedAddition}
                            placeholder="Guaranteed Addition"
                            name="guranteedAddition"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Grid container spacing={1}>
                    {UinData?.productType?.includes("N") && (
                      <>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Loyalty Addition"
                            className="formtext"
                            id="loyaltyAddtion"
                            value={leapData.loyaltyAddtion}
                            placeholder="Loyalty Addition"
                            name="loyaltyAddtion"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Terminal Bonus"
                            className="formtext"
                            id="terminalBonus"
                            value={leapData.terminalBonus}
                            placeholder="Terminal Bonus"
                            name="terminalBonus"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </>
                    )}
                    {UinData?.productType?.includes("L") && (
                      <>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Mortality Charges Refund"
                            className="formtext"
                            id="mortChargesRefund"
                            value={leapData.mortChargesRefund}
                            placeholder="Mortality Charges Refund"
                            name="mortChargesRefund"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Fund Value"
                            className="formtext"
                            id="fundValue"
                            value={leapData.fundValue}
                            placeholder="Fund Value"
                            name="fundValue"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Total Death Claim"
                        className="formtext"
                        id="totalDeathClaim"
                        value={leapData.totalDeathClaim}
                        placeholder="Total Death Claim"
                        name="totalDeathClaim"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    {UinData?.productType?.includes("N") && (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Penal Interest"
                          className="formtext"
                          id="penalInterest"
                          value={leapData.penalInterest}
                          placeholder="Penal Interest"
                          name="penalInterest"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Gross Payable"
                        className="formtext"
                        id="grossPayable"
                        value={leapData.grossPayable}
                        placeholder="Gross Payable"
                        name="grossPayable"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    {UinData?.productType?.includes("N") && (
                      <>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Interest on Premium"
                            className="formtext"
                            id="interestOnPremium"
                            value={leapData.interestOnPremium}
                            placeholder="Interest on Premium"
                            name="interestOnPremium"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Gst on Premium"
                            className="formtext"
                            id="gstOnPremium"
                            value={leapData.gstOnPremium}
                            placeholder="Gst on Premium"
                            name="gstOnPremium"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Gross GSV"
                            className="formtext"
                            id="gsvGross"
                            value={leapData.gsvGross}
                            placeholder="Gross GSV"
                            name="gsvGross"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Cda Charges"
                            className="formtext"
                            id="cdaCharges"
                            value={leapData.cdaCharges}
                            placeholder="Cda Charges"
                            name="cdaCharges"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Gst on Premium"
                            className="formtext"
                            id="gstOnPremium"
                            value={leapData.gstOnPremium}
                            placeholder="Gst on Premium"
                            name="gstOnPremium"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </>
                    )}
                    <hr
                      style={{
                        color: "blue",
                        width: "100%",
                        borderBottom: "5px solid rgb(33, 70, 199)",
                      }}
                    />
                    <Grid container spacing={1}>
                      {UinData?.productType?.includes("N") && (
                        <>
                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Money Back Paid"
                              className="formtext"
                              id="moneybackPaid"
                              value={leapData.moneybackPaid}
                              placeholder="Money Back Paid"
                              name="moneybackPaid"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>

                          <Grid item xs={8} md={6} lg={4}>
                            <TextField
                              label="Annuity Refund"
                              className="formtext"
                              id="annuityRefund"
                              value={leapData.annuityRefund}
                              placeholder="Annuity Refund"
                              name="annuityRefund"
                              inputProps={{ readOnly: true }}
                              fullWidth
                              variant="outlined"
                              margin="dense"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Total Recovery"
                          className="formtext"
                          id="totalRecovery"
                          value={leapData.totalRecovery}
                          placeholder="Total Recovery"
                          name="totalRecovery"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Net Payble"
                          className="formtext"
                          id="netPayable"
                          value={leapData.netPayable}
                          placeholder="Net Payble"
                          name="netPayable"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            <Paper
              elevation={12}
              className="paperFlag"
              // style={{
              //   backgroundColor:
              //     leapData.pfFlag === "Pass" ? "#b5ffa6" : "#f593a3",
              // }}
            >
              <h2 style={{ color: "rgb(33, 70, 199)" }}>LEAPS Flag</h2>
              <hr
                style={{
                  color: "blue",
                  width: "100%",
                  borderBottom: "5px solid rgb(33, 70, 199)",
                }}
              />
              <>
                <form>
                  <Grid container spacing={1}>
                    <Grid item xs={8} md={6} lg={6}>
                      <TextField
                        label="Purple Pass or Fail"
                        className="formtext"
                        id="leapFlag"
                        value={leapData.leapFlag}
                        placeholder="Purple Pass or Fail"
                        name="leapFlag"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={6}>
                      <TextField
                        label="Purple Remarks"
                        className="formtext"
                        id="leapRemarks"
                        value={leapData.leapRemarks}
                        placeholder="Purple Remarks"
                        name="leapRemarks"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </form>
                <hr />
                <h2 style={{ color: "rgb(33, 70, 199)" }}>QC Approval</h2>
                <hr
                  style={{
                    color: "blue",
                    width: "100%",
                    borderBottom: "5px solid rgb(33, 70, 199)",
                  }}
                />
                <Grid item xs={8} md={6} lg={6}>
                  <TextField
                    select
                    required
                    label="QC Approval Flag"
                    className="formtext"
                    id="qcApprovalFlag"
                    value={leapData.qcApprovalFlag}
                    placeholder="QC Approval Flag"
                    name="qcApprovalFlag"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {pf.map((val, index) => (
                      <MenuItem value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={6}>
                  <TextField
                    required
                    label="Approve Remarks"
                    className="formtext"
                    id="qcApprovalRemark"
                    value={leapData.qcApprovalRemark}
                    placeholder="Approve Remarks"
                    name="qcApprovalRemark"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <hr
                  style={{
                    color: "blue",
                    width: "100%",
                    borderBottom: "5px solid rgb(33, 70, 199)",
                  }}
                />

                {UinData?.productType?.includes("L") ? (
                  <Grid item xs={8} md={6} lg={4}>
                    <BsCardChecklist
                      style={{
                        cursor: "pointer",
                        backgroundColor: "blue",
                        color: "white",
                        marginLeft: "15rem",
                        marginTop: "1rem",
                      }}
                      size="30px"
                      className="deleteClass"
                      color="primary"
                      onClick={() => {
                        fundCheckingOpen();
                      }}
                    />
                  </Grid>
                ) : null}
                <Button
                  style={{ margin: "1rem 0 0 35%" }}
                  onClick={() => qcSubmit()}
                  disabled={
                    !(leapData.qcApprovalFlag && leapData.qcApprovalRemark)
                  }
                >
                  Submit
                </Button>
              </>
            </Paper>
          </div>
        </Paper>

        <DeathClaimFundCheck
          open={fundCheck}
          close={fundCheckingClose}
          uinNumber={coverData?.uinNumber}
        />

        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
}

export default DeathClaimQc;
