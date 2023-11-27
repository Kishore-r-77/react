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

function DeathClaimTransactionEdit({
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
  onChangeAnnuityStartDate,
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

    yearlyAnnuityAmunt,
    annuityStartDate,
    annuityGuranteedYears,

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
          <Modal.Title>Death Claim Transaction PAS Edit</Modal.Title>
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChangeDoc(e)}
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
                        onChange={(e) => onChangeRiskComDate(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChangeFup(e)}
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
                        onChange={(e) => onChangeDateOfRevival(e)}
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
                        onChange={(e) => onChangeDateOfDeath(e)}
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
                        onChange={(e) => onChangeDateOfIntimation(e)}
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
                        onChange={(e) => onChangeDateOfLogin(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChangeEffectiveDate(e)}
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
                        onChange={(e) => onChangeApprovalDate(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                        label="Annuity Start Date"
                        id="annuityStartDate"
                        value={moment(annuityStartDate).format("YYYY-MM-DD")}
                        placeholder="Annuity Start Date"
                        name="annuityStartDate"
                        onChange={(e) => onChangeAnnuityStartDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Yearly Annuity Amount"
                    className="formtext"
                    id="yearlyAnnuityAmunt"
                    value={yearlyAnnuityAmunt}
                    placeholder="Yearly Annuity Amount"
                    name="yearlyAnnuityAmunt"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={3}>
                  <TextField
                    type="number"
                    label="Annuity Guaranteed Years"
                    className="formtext"
                    id="annuityGuranteedYears"
                    value={annuityGuranteedYears}
                    placeholder="Annuity Guaranteed Years"
                    name="annuityGuranteedYears"
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChangeDateOfAssignment(e)}
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
                    onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChangeDeathClaimPayoutDate(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeathClaimTransactionEdit;
