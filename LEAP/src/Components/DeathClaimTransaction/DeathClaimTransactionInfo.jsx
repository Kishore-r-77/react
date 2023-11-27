import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";
import "../Css/ContentEdit.css";

function DeathClaimTransactionInfo({
  open,
  data,
  handleClose,
  companyData,
  onChange,
  billFrequencyData,
  coverNameData,
  coverCodeData,
  statusCodeData,
  yesNoFlagData,
  InterimStatusData,
  onChangeDoc,
  onChangeRiskComDate,
  onChangeFup,
  onChangeDateOfRevival,
  onChangeDateOfDeath,
  onChangeDateOfIntimation,
  onChangeDateOfLogin,
  onChangeEffectiveDate,
  onChangeApprovalDate,
  onChangeDateOfAssignment,
  onChangeDeathClaimPayoutDate,
  handleFormSubmit,
}) {
  let {
    companyId,
    policyNo,
    transNo,
    uinNumber,

    productType,
    contractType,
    planName,
    planCode,
    doc,

    riskComDate,
    policyTerm,
    premiumTerm,
    installmentPremium,
    billFreq,

    policyStatus,
    fup,
    dateOfRevival,
    dateOfDeath,
    dateOfIntimation,

    dateOfLogin,
    causeOfDeath,
    deathReasonCode,
    basicSumAssured,
    additionalSumAssured,

    termRiderSumAssured,
    inbuiltRiderSumAssured,
    reversionaryBonus,
    interimBonus,
    guranteedBonus,

    loyaltyAddition,
    otherRider,
    terminalBonus,
    totalBonus,
    refundOfPurchasePrice,

    fundValue,
    effectiveDate,
    approvalDate,
    totalDeathClaim,
    policyDeposit,
    penalInterest,
    grossPay,

    terminalPremRecov,
    interestOnPrem,
    gstOnPrem,
    cdaCharges,
    otherCharges,

    policyLoan,
    policyLoanInterest,
    moneybackPaidRecov,
    annuityPaidRecov,
    mortalityChargeRefund,

    adminFeeRefund,
    guranteedAdditionCharges,
    tds,
    totalRecovery,
    netPayable,

    nominationFlag,
    nomineeClientId,
    assignementFlag,
    assigneeClientId,
    dateOfAssignment,
    claimId,
    deathClaimPayoutDate,

    makerFlag,
    checkerFlag,
    leapApprovalFlag,
    leapApprovalRemarks,
    leapApprovalDate,
    qcUserId,
    interimStatus,
  } = data;
  return (
    <div>
      <Modal
        show={open}
        dialogAs={DraggableComponent}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Death Claim Transaction PAS Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    inputProps={{readOnly:true}}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {companyData?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {val.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy No"
                    className="formtext"
                    id="policyNo"
                    value={policyNo}
                    placeholder="Policy No"
                    name="policyNo"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Trans No"
                    className="formtext"
                    id="transNo"
                    value={transNo}
                    placeholder="Trans No"
                    name="transNo"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="UIN Num"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Num"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Product type"
                    className="formtext"
                    id="productType"
                    value={productType}
                    placeholder="Product type"
                    name="productType"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Contract type"
                    className="formtext"
                    id="contractType"
                    value={contractType}
                    placeholder="Contract type"
                    name="contractType"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Plan Name"
                    className="formtext"
                    id="planName"
                    value={planName}
                    placeholder="Plan Name"
                    name="planName"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {coverNameData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Plan Code"
                    className="formtext"
                    id="planCode"
                    value={planCode}
                    placeholder="Plan Code"
                    name="planCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {coverCodeData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}-{val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="DOC"
                        id="doc"
                        value={moment(doc).format("YYYY-MM-DD")}
                        placeholder="DOC"
                        name="doc"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Risk Com Date"
                        id="riskComDate"
                        value={moment(riskComDate).format("YYYY-MM-DD")}
                        placeholder="Risk Com Date"
                        name="riskComDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy Term"
                    className="formtext"
                    id="policyTerm"
                    value={policyTerm}
                    placeholder="Policy Term"
                    name="policyTerm"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Premium Term"
                    className="formtext"
                    id="premiumTerm"
                    value={premiumTerm}
                    placeholder="Premium Term"
                    name="premiumTerm"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Installment Premium"
                    className="formtext"
                    id="installmentPremium"
                    value={installmentPremium}
                    placeholder="Installment Premium"
                    name="installmentPremium"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Bill Frequency"
                    className="formtext"
                    id="billFreq"
                    value={billFreq}
                    placeholder="Bill Frequency"
                    name="billFreq"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {billFrequencyData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Policy Status "
                    className="formtext"
                    id="policyStatus"
                    value={policyStatus}
                    placeholder="Policy Status "
                    name="policyStatus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {statusCodeData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Fup :"
                        value={moment(fup).format("YYYY-MM-DD")}
                        id="fup"
                        name="fup"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Date Of Revival :"
                        value={moment(dateOfRevival).format("YYYY-MM-DD")}
                        id="dateOfRevival"
                        name="dateOfRevival"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Date Of Death :"
                        value={moment(dateOfDeath).format("YYYY-MM-DD")}
                        id="dateOfDeath"
                        name="dateOfDeath"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Date Of Intimation :"
                        value={moment(dateOfIntimation).format("YYYY-MM-DD")}
                        id="dateOfIntimation"
                        name="dateOfIntimation"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Date Of Login :"
                        value={moment(dateOfLogin).format("YYYY-MM-DD")}
                        id="dateOfLogin"
                        name="dateOfLogin"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Cause Of Death"
                    className="formtext"
                    id="causeOfDeath"
                    value={causeOfDeath}
                    placeholder="Cause Of Death"
                    name="causeOfDeath"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    label="Death Reason Code"
                    className="formtext"
                    id="deathReasonCode"
                    value={deathReasonCode}
                    placeholder="Death Reason Code"
                    name="deathReasonCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Basic Sum Assured"
                    className="formtext"
                    id="basicSumAssured"
                    value={basicSumAssured}
                    placeholder="Basic Sum Assured"
                    name="basicSumAssured"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Additional Sum Assured"
                    className="formtext"
                    id="additionalSumAssured"
                    value={additionalSumAssured}
                    placeholder="Additional Sum Assured"
                    name="additionalSumAssured"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Term Rider Sum Assured"
                    className="formtext"
                    id="termRiderSumAssured"
                    value={termRiderSumAssured}
                    placeholder="Term Rider Sum Assured"
                    name="termRiderSumAssured"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Inbuilt Rider SA"
                    className="formtext"
                    id="inbuiltRiderSumAssured"
                    value={inbuiltRiderSumAssured}
                    placeholder="Inbuilt Rider SA"
                    name="inbuiltRiderSumAssured"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Reversionary Bonus"
                    className="formtext"
                    id="reversionaryBonus"
                    value={reversionaryBonus}
                    placeholder="Reversionary Bonus"
                    name="reversionaryBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Interim Bonus"
                    className="formtext"
                    id="interimBonus"
                    value={interimBonus}
                    placeholder="Interim Bonus"
                    name="interimBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Guranteed Bonus"
                    className="formtext"
                    id="guranteedBonus"
                    value={guranteedBonus}
                    placeholder="Guranteed Bonus"
                    name="guranteedBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Loyalty Addition"
                    className="formtext"
                    id="loyaltyAddition"
                    value={loyaltyAddition}
                    placeholder="Loyalty Addition"
                    name="loyaltyAddition"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Othet Rider"
                    className="formtext"
                    id="otherRider"
                    value={otherRider}
                    placeholder="Othet Rider"
                    name="otherRider"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Terminal Bonus"
                    className="formtext"
                    id="terminalBonus"
                    value={terminalBonus}
                    placeholder="Terminal Bonus"
                    name="terminalBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Total Bonus"
                    className="formtext"
                    id="totalBonus"
                    value={totalBonus}
                    placeholder="Total Bonus"
                    name="totalBonus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Purchase Price Refund"
                    className="formtext"
                    id="refundOfPurchasePrice"
                    value={refundOfPurchasePrice}
                    placeholder="Purchase Price Refund"
                    name="refundOfPurchasePrice"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Fund Value"
                    className="formtext"
                    id="fundValue"
                    value={fundValue}
                    placeholder="Fund Value"
                    name="fundValue"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Effective Date"
                        id="effectiveDate"
                        value={moment(effectiveDate).format("YYYY-MM-DD")}
                        placeholder="Effective Date"
                        name="effectiveDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Approved Date"
                        id="approvalDate"
                        value={moment(approvalDate).format("YYYY-MM-DD")}
                        placeholder="Approved Date"
                        name="approvalDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Total Death Claim"
                    className="formtext"
                    id="totalDeathClaim"
                    value={totalDeathClaim}
                    placeholder="Total Death Claim"
                    name="totalDeathClaim"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy Deposit"
                    className="formtext"
                    id="policyDeposit"
                    value={policyDeposit}
                    placeholder="Policy Deposit"
                    name="policyDeposit"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Penal Interest"
                    className="formtext"
                    id="penalInterest"
                    value={penalInterest}
                    placeholder="Penal Interest"
                    name="penalInterest"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Gross Pay"
                    className="formtext"
                    id="grossPay"
                    value={grossPay}
                    placeholder="Gross Pay"
                    name="grossPay"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Terminal Premium Recovery"
                    className="formtext"
                    id="terminalPremRecov"
                    value={terminalPremRecov}
                    placeholder="Terminal Premium Recovery"
                    name="terminalPremRecov"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Interest On Premium"
                    className="formtext"
                    id="interestOnPrem"
                    value={interestOnPrem}
                    placeholder="Interest On Premium"
                    name="interestOnPrem"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="GST On Premium"
                    className="formtext"
                    id="gstOnPrem"
                    value={gstOnPrem}
                    placeholder="GST On Premium"
                    name="gstOnPrem"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="CDA Charges"
                    className="formtext"
                    id="cdaCharges"
                    value={cdaCharges}
                    placeholder="CDA Charges"
                    name="cdaCharges"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Other Charges"
                    className="formtext"
                    id="otherCharges"
                    value={otherCharges}
                    placeholder="Other Charges"
                    name="otherCharges"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy Loan"
                    className="formtext"
                    id="policyLoan"
                    value={policyLoan}
                    placeholder="Policy Loan"
                    name="policyLoan"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Policy Loan Interest"
                    className="formtext"
                    id="policyLoanInterest"
                    value={policyLoanInterest}
                    placeholder="Policy Loan Interest"
                    name="policyLoanInterest"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Moneyback paid Recov"
                    className="formtext"
                    id="moneybackPaidRecov"
                    value={moneybackPaidRecov}
                    placeholder="Moneyback paid Recov"
                    name="moneybackPaidRecov"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Annuity paid Recov"
                    className="formtext"
                    id="annuityPaidRecov"
                    value={annuityPaidRecov}
                    placeholder="Annuity paid Recov"
                    name="annuityPaidRecov"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Mortality Charge Refund"
                    className="formtext"
                    id="mortalityChargeRefund"
                    value={mortalityChargeRefund}
                    placeholder="Mortality Charge Refund"
                    name="mortalityChargeRefund"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Admin Fee Refund"
                    className="formtext"
                    id="adminFeeRefund"
                    value={adminFeeRefund}
                    placeholder="Admin Fee Refund"
                    name="adminFeeRefund"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Guranteed Additional Charge"
                    className="formtext"
                    id="guranteedAdditionCharges"
                    value={guranteedAdditionCharges}
                    placeholder="Guranteed Additional Charge"
                    name="guranteedAdditionCharges"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="TDS"
                    className="formtext"
                    id="tds"
                    value={tds}
                    placeholder="TDS"
                    name="tds"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Total Recovery"
                    className="formtext"
                    id="totalRecovery"
                    value={totalRecovery}
                    placeholder="Total Recovery"
                    name="totalRecovery"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Net Payable"
                    className="formtext"
                    id="netPayable"
                    value={netPayable}
                    placeholder="Net Payable"
                    name="netPayable"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Nomination Flag"
                    className="formtext"
                    id="nominationFlag"
                    value={nominationFlag}
                    placeholder="Nomination Flag"
                    name="nominationFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Nominee Client Id"
                    className="formtext"
                    id="nomineeClientId"
                    value={nomineeClientId}
                    placeholder="Nominee Client Id"
                    name="nomineeClientId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Assignment Flag"
                    className="formtext"
                    id="assignementFlag"
                    value={assignementFlag}
                    placeholder="Assignment Flag"
                    name="assignementFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Assignee Client Id"
                    className="formtext"
                    id="assigneeClientId"
                    value={assigneeClientId}
                    placeholder="Assignee Client Id"
                    name="assigneeClientId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Date Of Assignment"
                        id="dateOfAssignment"
                        value={moment(dateOfAssignment).format("YYYY-MM-DD")}
                        placeholder="Date Of Assignment"
                        name="dateOfAssignment"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Claim Id"
                    className="formtext"
                    id="claimId"
                    value={claimId}
                    placeholder="Claim Id"
                    name="claimId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Death Claim Payout date"
                        id="deathClaimPayoutDate"
                        value={moment(deathClaimPayoutDate).format(
                          "YYYY-MM-DD"
                        )}
                        placeholder="Death Claim Payout date"
                        name="deathClaimPayoutDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Maker Flag"
                    className="formtext"
                    id="makerFlag"
                    value={makerFlag}
                    placeholder="Maker Flag"
                    name="makerFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Checker Flag"
                    className="formtext"
                    id="checkerFlag"
                    value={checkerFlag}
                    placeholder="Checker Flag"
                    name="checkerFlag"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    select
                    label="Interim Status"
                    className="formtext"
                    id="interimStatus"
                    value={interimStatus}
                    placeholder="Interim Status"
                    name="interimStatus"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {InterimStatusData.map((val, index) => (
                      <MenuItem value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeathClaimTransactionInfo;
