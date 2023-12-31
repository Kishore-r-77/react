import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Grid, MenuItem, Paper, TextField, Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../Css/Content.css";
import Notification from "../Dialogs/Notification";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BsCardChecklist } from "react-icons/bs";
import FundCheck from "./FundCheck";

function QualityChecking({ data, open, close, getData }) {
  const userId = sessionStorage.getItem("userId");

  const [policyData, setpolicyData] = useState({});
  const [coverData, setcoverData] = useState([]);
  const [purpleData, setpurpleData] = useState({});
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
    setpurpleData({ ...purpleData, [name]: value });
  };

  const getPolicyData = () => {
    axios
      .get(
        `http://localhost:8080/policyDetailsPas/getByPolicyNo/${data.policyNo}`,
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
        `http://localhost:8080/coverdetailspas/getByPolicyNo/${data.policyNo}`,
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
        `http://localhost:8080/transaction/getProcessedByPolicyNo/${data.policyNo}`,
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

  const getPurpleData = () => {
    axios
      .get(
        `http://localhost:8080/purpledetails/getByPolicyNo/${data.policyNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setpurpleData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        `http://localhost:8080/purpledetails/qcUpdate/${purpleData.policyNo}/${userId}`,
        {
          approvFlag: purpleData.approvFlag,
          approvRemarks: purpleData.approvRemarks,
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

  function downloadPdf() {
    axios({
      url: `http://localhost:8080/purpledetails/generatePdf/${purpleData.policyNo}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "purple.pdf");
      link.click();
    });
  }

  const [UinData, setUinData] = useState([]);
  const getUINData = () => {
    axios
      .get(
        `http://localhost:8080/uinMaster/getByFlcPolicyNo/${data.policyNo}`,
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

  console.log("uin data", UinData);

  useEffect(() => {
    getpf();
    getPolicyData();
    getCoverData();
    getTransData();
    getPurpleData();
    getUINData();
    return () => {};
  }, []);

  console.log("policy No", policyData?.policyNo);
  return (
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
            Quality Checking
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
                  onClick={() => downloadPdf()}
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
              <h4 style={{ color: "rgb(33, 70, 199)" }}>ULIP </h4>
            ) : null}

            {UinData?.productType?.includes("N") ? (
              <h4 style={{ color: "rgb(33, 70, 199)" }}>Non-ULIP </h4>
            ) : null}
          </div>

          <div>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Policy Number"
                    className="formtext"
                    id="chdrNum"
                    value={policyData?.chdrNum}
                    placeholder="Policy Number"
                    name="chdrNum"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Bill Frequency"
                    className="formtext"
                    id="billFreq"
                    value={policyData?.billFreq}
                    placeholder="Bill Frequency"
                    name="billFreq"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Installment Premium"
                    className="formtext"
                    id="installmentPremium"
                    value={policyData?.installmentPremium}
                    placeholder="Installment Premium"
                    name="installmentPremium"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Prem to Date"
                    className="formtext"
                    id="premToDate"
                    value={moment(policyData?.premToDate).format("DD/MM/YYYY")}
                    placeholder="Prem to Date"
                    name="premToDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Life Assured Age"
                    className="formtext"
                    id="anbAtCcd"
                    value={policyData?.anbAtCcd}
                    placeholder="Life Assured Age"
                    name="anbAtCcd"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Policy Status"
                    className="formtext"
                    id="statCode"
                    value={policyData?.statCode}
                    placeholder="Policy Status"
                    name="statCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Medical Flag"
                    className="formtext"
                    id="medicalFlag"
                    value={policyData?.medicalFlag}
                    placeholder="Medical Flag"
                    name="medicalFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Smoker Flag"
                    className="formtext"
                    id="smokerFlag"
                    value={policyData?.smokerFlag}
                    placeholder="Smoker Flag"
                    name="smokerFlag"
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
            <>
              <h2 style={{ color: "rgb(33, 70, 199)" }}>Coverages/Riders</h2>
              {coverData.map((val, index) => (
                <form>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                    <TreeItem
                      nodeId={val.id}
                      label={`${val.crTable} ( ${val.cntType} )`}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Plan Name"
                            className="formtext"
                            id="cntType"
                            value={val.cntType}
                            placeholder="Plan Name"
                            name="cntType"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Cover Code"
                            className="formtext"
                            id="crTable"
                            value={val.crTable}
                            placeholder="Cover Code"
                            name="crTable"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="UIN Number"
                            className="formtext"
                            id="uinNumber"
                            value={val.uinNumber}
                            placeholder="UIN Number"
                            name="uinNumber"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Risk Com Date:"
                            id="riskComDate"
                            value={moment(val.riskComDate).format("DD/MM/YYYY")}
                            placeholder="Risk Com Date:"
                            name="riskComDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            style={{ marginLeft: "0.5rem" }}
                            label="Date Of Commencement Date:"
                            id="docDate"
                            value={moment(val.docDate).format("DD/MM/YYYY")}
                            placeholder="Date Of Commencement Date:"
                            name="docDate"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Sun Assured"
                            className="formtext"
                            id="sumAssured"
                            value={val.sumAssured}
                            placeholder="Sun Assured"
                            name="sumAssured"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Risk Cess Term"
                            className="formtext"
                            id="riskCessTerm"
                            value={val.riskCessTerm}
                            placeholder="Risk Cess Term"
                            name="riskCessTerm"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Prem Cess Term"
                            className="formtext"
                            id="premCessTerm"
                            value={val.premCessTerm}
                            placeholder="Prem Cess Term"
                            name="premCessTerm"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          ></TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Cover Premium"
                            className="formtext"
                            id="coverPremium"
                            value={val.coverPremium}
                            placeholder="Cover Premium"
                            name="coverPremium"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>

                        <Grid item xs={8} md={6} lg={3}>
                          <TextField
                            label="Cover Status"
                            className="formtext"
                            id="coverStatus"
                            value={val.coverStatus}
                            placeholder="Cover Status"
                            name="coverStatus"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                          />
                        </Grid>
                      </Grid>
                    </TreeItem>
                  </TreeView>
                </form>
              ))}
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
                color: "black",
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
                        style={{ marginLeft: "0.5rem" }}
                        label="Req Date"
                        id="flcReqDate"
                        value={moment(transData?.flcReqDate).format(
                          "DD/MM/YYYY"
                        )}
                        placeholder="Req Date"
                        name="flcReqDate"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Log Date"
                        id="flcLogDate"
                        value={moment(transData?.flcLogDate).format(
                          "DD/MM/YYYY"
                        )}
                        placeholder="Log Date"
                        name="flcLogDate"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Approval Date"
                        id="flcApprovalDate"
                        value={moment(transData?.flcApprovalDate).format(
                          "DD/MM/YYYY"
                        )}
                        placeholder="Approval Date"
                        name="flcApprovalDate"
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
                  <Grid container spacing={1}>
                    {UinData?.productType?.includes("L") ? (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          label="Total Premium"
                          className="formtext"
                          id="flcTotalPrem"
                          value={transData?.flcTotalPrem}
                          placeholder="Total Premium"
                          name="flcTotalPrem"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          label="Prem Refund"
                          className="formtext"
                          id="flcPremRefund"
                          value={transData?.flcPremRefund}
                          placeholder="Prem Refund"
                          name="flcPremRefund"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    )}
                    {UinData?.productType?.includes("L") ? (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          label="Fund Value"
                          className="formtext"
                          id="fundValue"
                          value={transData?.fundValue}
                          placeholder="Fund Value"
                          name="fundValue"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Policy Dep"
                        className="formtext"
                        id="flcPolicyDop"
                        value={transData?.flcPolicyDop}
                        placeholder="Policy Dep"
                        name="flcPolicyDop"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    {UinData?.productType?.includes("L") ? (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          label="Mort Charge Refund"
                          className="formtext"
                          id="mortChargeRefund"
                          value={transData?.mortChargeRefund}
                          placeholder="Mort Charge Refund"
                          name="mortChargeRefund"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Penal Interest"
                        className="formtext"
                        id="penalIntrest"
                        value={transData?.penalIntrest}
                        placeholder="Penal Interest"
                        name="penalIntrest"
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
                  <Grid container spacing={1}>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Gross Pay"
                        className="formtext"
                        id="grossFlcPay"
                        value={transData?.grossFlcPay}
                        placeholder="Gross Pay"
                        name="grossFlcPay"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    {UinData?.productType?.includes("L") ? (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          label="Stamp Duty+GST"
                          className="formtext"
                          id="stamDuty"
                          value={transData?.stamDuty}
                          placeholder="Stamp Duty+GST"
                          name="stamDuty"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Medical Fee"
                        className="formtext"
                        id="medicalFee"
                        value={transData?.medicalFee}
                        placeholder="Medical Fee"
                        name="medicalFee"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    {UinData?.productType?.includes("N") ? (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          label="Stamp Duty+GST"
                          className="formtext"
                          id="stamDuty"
                          value={transData?.stamDuty}
                          placeholder="Stamp Duty+GST"
                          name="stamDuty"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    ) : null}

                    {UinData?.productType?.includes("N") ? (
                      <Grid item xs={8} md={6} lg={4}>
                        <TextField
                          type="number"
                          label="Mortality Charge"
                          className="formtext"
                          id="riskPremRecov"
                          value={transData?.riskPremRecov}
                          placeholder="Mortality Charge"
                          name="riskPremRecov"
                          inputProps={{ readOnly: true }}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Total Recovery"
                        className="formtext"
                        id="totalRecov"
                        value={transData?.totalRecov}
                        placeholder="Total Recovery"
                        name="totalRecov"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Net Pay"
                        className="formtext"
                        id="netFlcPay"
                        value={transData?.netFlcPay}
                        placeholder="Net Pay"
                        name="netFlcPay"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                  {policyData?.medicalFlag === "Yes" ? (
                    <>
                      <hr
                        style={{
                          color: "black",
                          width: "100%",
                          borderBottom: "5px solid rgb(33, 70, 199)",
                        }}
                      />
                      <Grid container spacing={1}>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Medical Category"
                            className="formtext"
                            id="medicalCategory"
                            value={transData?.medicalCategory}
                            placeholder="Medical Category"
                            name="medicalCategory"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Medical Center"
                            className="formtext"
                            id="medicalCenter"
                            value={transData?.medicalCenter}
                            placeholder="Medical Center"
                            name="medicalCenter"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                          <TextField
                            label="Medical Tpa Code"
                            className="formtext"
                            id="medicatTpaCode"
                            value={transData?.medicatTpaCode}
                            placeholder="Medical Tpa Code"
                            name="medicatTpaCode"
                            inputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </form>
            </>
          </Paper>

          <Paper elevation={12} className="paperPurple">
            <h2 style={{ color: "rgb(33, 70, 199)" }}>LEAPS Details</h2>
            <hr
              style={{
                color: "black",
                width: "100%",
                borderBottom: "5px solid rgb(33, 70, 199)",
              }}
            />
            <form>
              <Grid container spacing={1} style={{ marginTop: "0.5rem" }}>
                <Grid container spacing={1}>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Transaction Date"
                      style={{ marginLeft: "0.5rem" }}
                      className="formtext"
                      id="trandate"
                      value={moment(purpleData.trandate).format("DD/MM/yyyy")}
                      placeholder="Transaction Date"
                      name="trandate"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Contract No."
                      className="formtext"
                      id="chdr"
                      value={purpleData.policyNo}
                      placeholder="Contract No."
                      name="chdr"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Transaction No."
                      className="formtext"
                      id="tranNo"
                      value={purpleData.tranNo}
                      placeholder="Transaction No."
                      name="tranNo"
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
                <Grid container spacing={1}>
                  {UinData?.productType?.includes("L") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Total Premium"
                        className="formtext"
                        id="flcPremRefund"
                        value={purpleData?.totlPremium}
                        placeholder="Total Premium"
                        name="flcPremRefund"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Prem Refund"
                        className="formtext"
                        id="flcPremRefund"
                        value={purpleData?.totlPremium}
                        placeholder="Prem Refund"
                        name="flcPremRefund"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  )}

                  {UinData?.productType?.includes("L") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Fund Value"
                        className="formtext"
                        id="fundValue"
                        value={purpleData?.fundValue}
                        placeholder="Fund Value"
                        name="fundValue"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Policy Deposit Amount"
                      className="formtext"
                      id="avalSuspense"
                      value={purpleData.avalSuspense}
                      placeholder="Policy Deposit Amount"
                      name="avalSuspense"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  {UinData?.productType?.includes("L") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Mortality Charge"
                        className="formtext"
                        id="mortCharge"
                        value={purpleData?.mortCharge}
                        placeholder="Mortality Charge"
                        name="mortCharge"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        key="Mortality Charge"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Penal Interest"
                      className="formtext"
                      id="penalInterest"
                      value={purpleData.penalInterest}
                      placeholder="Penal Interest"
                      name="penalInterest"
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
                <Grid container spacing={1}>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Gross Payable"
                      className="formtext"
                      id="grossPayable"
                      value={purpleData.grossPayable}
                      placeholder="Gross Payable"
                      name="grossPayable"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  {UinData?.productType?.includes("L") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Stamp Duty+GST"
                        className="formtext"
                        id="stampDuty"
                        value={purpleData.stampDuty}
                        placeholder="Stamp Duty+GST"
                        name="stampDuty"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Medical Fee"
                      className="formtext"
                      id="medicalFee"
                      value={purpleData.medicalFee}
                      placeholder="Medical Fee"
                      name="medicalFee"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {UinData?.productType?.includes("N") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Stamp Duty+GST"
                        className="formtext"
                        id="stampDuty"
                        value={purpleData.stampDuty}
                        placeholder="Stamp Duty+GST"
                        name="stampDuty"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  ) : null}
                </Grid>

                {/* {UinData?.productType?.includes("L") ? (
                  <hr
                    style={{
                      color: "black",
                      width: "100%",
                      borderBottom: "5px solid rgb(33, 70, 199)",
                    }}
                  />
                ) : null} */}

                <Grid container spacing={1}>
                  {UinData?.productType?.includes("N") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Mortality Charge"
                        className="formtext"
                        id="mortCharge"
                        value={purpleData?.mortCharge}
                        placeholder="Mortality Charge"
                        name="mortCharge"
                        inputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        key="Mortality Charge"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  ) : null}

                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Recoverable"
                      className="formtext"
                      id="recoveries"
                      value={purpleData.recoveries}
                      placeholder="Recoverable"
                      name="recoveries"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <TextField
                      label="Net Payable"
                      className="formtext"
                      id="netPayable"
                      value={purpleData.netPayable}
                      placeholder="Net Payable"
                      name="netPayable"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {UinData?.productType?.includes("L") ? (
                    <Grid item xs={8} md={6} lg={4}>
                      <BsCardChecklist
                        style={{
                          cursor: "pointer",
                          backgroundColor: "blue",
                          color: "white",
                          marginLeft: "5rem",
                          zIndex: "2",
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
                </Grid>

                {UinData?.productType?.includes("N") ? (
                  <hr
                    style={{
                      color: "black",
                      width: "100%",
                      borderBottom: "5px solid rgb(33, 70, 199)",
                    }}
                  />
                ) : null}
              </Grid>
            </form>
          </Paper>
          <Paper
            elevation={12}
            className="paperFlag"
            // style={{
            //   backgroundColor:
            //     purpleData.pfFlag === "Pass" ? "#b5ffa6" : "#f593a3",
            // }}
          >
            <h2 style={{ color: "rgb(33, 70, 199)" }}>LEAPS Flag</h2>
            <hr
              style={{
                color: "black",
                width: "100%",
                borderBottom: "5px solid rgb(33, 70, 199)",
              }}
            />

            <>
              <form>
                <Grid container spacing={1} style={{ marginTop: "0.5rem" }}>
                  <Grid item xs={8} md={6} lg={6}>
                    <TextField
                      label="Purple Pass or Fail"
                      className="formtext"
                      id="pfFlag"
                      value={purpleData.pfFlag}
                      placeholder="Purple Pass or Fail"
                      name="pfFlag"
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
                      id="pfRemarks"
                      value={purpleData.pfRemarks}
                      placeholder="Purple Remarks"
                      name="pfRemarks"
                      inputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </form>
              <hr
                style={{
                  color: "black",
                  width: "100%",
                  borderBottom: "5px solid rgb(33, 70, 199)",
                }}
              />
              <h3 style={{ color: "rgb(33, 70, 199)" }}>QC Approval</h3>
              <Grid item xs={8} md={6} lg={6}>
                <TextField
                  select
                  required
                  label="QC Approval Flag"
                  className="formtext"
                  id="approvFlag"
                  value={purpleData.approvFlag}
                  placeholder="QC Approval Flag"
                  name="approvFlag"
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
                  id="approvRemarks"
                  value={purpleData.approvRemarks}
                  placeholder="Approve Remarks"
                  name="approvRemarks"
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Button
                style={{ margin: "1rem 0 0 35%" }}
                onClick={() => qcSubmit()}
                disabled={!(purpleData.approvFlag && purpleData.approvRemarks)}
              >
                Submit
              </Button>
            </>
          </Paper>
        </div>
      </Paper>

      <FundCheck
        open={fundCheck}
        close={fundCheckingClose}
        policyNo={policyData?.chdrNum}
      />

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default QualityChecking;
