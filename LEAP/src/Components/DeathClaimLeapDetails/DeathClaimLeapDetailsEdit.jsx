import { Box, FormControl, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";

function DeathClaimLeapDetailsEdit({
    open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  policyData,
  passFail,
  onChangeAppDate,
  onChangeReqDate,
  onChangeLogDate,
  onChangeEffDate,
}) {

    let {
        companyId,
        policyNo,
        transNo,
        uinNumber,
        reqDate,
        logDate,
        clientId,
        contractType,
          productType,
          policyStatus,
          fup,
          totalPremium,
          basicSa,
          additionalSa,
          inbuiltRiderSa,
          reversionaryBonus,
          interimBonus,
          guranteedAddition,
          loyaltyAddtion,
          otherRiderBenefit,
          terminalBonus,
          totalBonus,
          annuityRefund,
          fundValue,
          totalDeathClaim,
          policyDeposit,
          penalInterest,
          grossPayable,
          termPremRecov,
          interestOnPremium,
          gstOnPremium,
          cdaCharges,
          otherCharges,
          policyLoan,
          policyLoanInterest,
          moneybackPaid,
          annuityPaid,
          mortChargesRefund,
          adminFeeRefund,
          guranteedAddCharges,
          tds,
          totalRecovery,
          netPayable,
          leappfFlag,
          leappfRemarks,
          qcApprovalFlag,
          qcApprovalRemark,
          qcApprovalDate,
          approvalQcUserId,
          pasUpdateFlag,
      }= data;

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
          <Modal.Title>LEAPS Death Claim Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    disabled
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Policy No."
                    className="formtext"
                    id="policyNo"
                    value={policyNo}
                    placeholder="Company"
                    name="policyNo"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Transaction No."
                    className="formtext"
                    id="transNo"
                    value={transNo}
                    placeholder="Transaction No."
                    name="transNo"
                    disabled
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="UIN Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    disabled
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Req Date:"
                        id="reqDate"
                        value={moment(reqDate).format("YYYY-MM-DD")}
                        placeholder="Req Date:"
                        name="reqDate"
                        onChange={(e) => onChangeReqDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Log Date:"
                        id="logDate"
                        value={moment(logDate).format("YYYY-MM-DD")}
                        placeholder="Log Date:"
                        name="logDate"
                        onChange={(e) => onChangeLogDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Client Id"
                    className="formtext"
                    id="clientId"
                    value={clientId}
                    placeholder="Client Id"
                    name="clientId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Contract Type"
                    className="formtext"
                    id="contractType"
                    value={contractType}
                    placeholder="Contract Type"
                    name="contractType"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Product Type"
                    className="formtext"
                    id="productType"
                    value={productType}
                    placeholder="Product Type"
                    name="productType"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Policy Status"
                    className="formtext"
                    id="policyStatus"
                    value={policyStatus}
                    placeholder="Policy Status"
                    name="policyStatus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="FUP"
                    className="formtext"
                    id="fup"
                    value={fup}
                    placeholder="FUP"
                    name="fup"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Total Premium"
                    className="formtext"
                    id="totalPremium"
                    value={totalPremium}
                    placeholder="Total Premium"
                    name="totalPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Basic Sum Assured"
                    className="formtext"
                    id="basicSa"
                    value={basicSa}
                    placeholder="Basic Sum Assured"
                    name="basicSa"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Additional Sum Assured"
                    className="formtext"
                    id="additionalSa"
                    value={additionalSa}
                    placeholder="Additional Sum Assured"
                    name="additionalSa"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Inbuilt Rider Sum Assured"
                    className="formtext"
                    id="inbuiltRiderSa"
                    value={inbuiltRiderSa}
                    placeholder="Inbuilt Rider Sum Assured"
                    name="inbuiltRiderSa"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Guranteed Addition"
                    className="formtext"
                    id="guranteedAddition"
                    value={guranteedAddition}
                    placeholder="Guranteed Addition"
                    name="guranteedAddition"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Loyalty Addtion"
                    className="formtext"
                    id="loyaltyAddtion"
                    value={loyaltyAddtion}
                    placeholder="Loyalty Addtion"
                    name="loyaltyAddtion"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Other Rider Benefit"
                    className="formtext"
                    id="otherRiderBenefit"
                    value={otherRiderBenefit}
                    placeholder="OtherRiderBenefit"
                    name="otherRiderBenefit"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Total Bonus"
                    className="formtext"
                    id="totalBonus"
                    value={totalBonus}
                    placeholder="TotalBonus"
                    name="totalBonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Annuity Refund"
                    className="formtext"
                    id="annuityRefund"
                    value={annuityRefund}
                    placeholder="Annuity Refund"
                    name="annuityRefund"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Gross Payable"
                    className="formtext"
                    id="grossPayable"
                    value={grossPayable}
                    placeholder="Gross Payable"
                    name="grossPayable"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Terminal Premium Recovery"
                    className="formtext"
                    id="termPremRecov"
                    value={termPremRecov}
                    placeholder="Terminal Premium Recovery"
                    name="termPremRecov"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Interest On Premium"
                    className="formtext"
                    id="interestOnPremium"
                    value={interestOnPremium}
                    placeholder="Interest On Premium"
                    name="interestOnPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                {/* <Grid item xs={8} md={6} lg={2}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Effective Date:"
                        id="effDate"
                        value={moment(effDate).format("YYYY-MM-DD")}
                        placeholder="Effective Date:"
                        name="effDate"
                        onChange={(e) => onChangeEffDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Approval Date:"
                        id="approvDate"
                        value={moment(approvDate).format("YYYY-MM-DD")}
                        placeholder="Approval Date:"
                        name="approvDate"
                        onChange={(e) => onChangeAppDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid> */}
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="GST On Premium"
                    className="formtext"
                    id="gstOnPremium"
                    value={gstOnPremium}
                    placeholder="GST On Premium"
                    name="gstOnPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Moneyback Paid"
                    className="formtext"
                    id="moneybackPaid"
                    value={moneybackPaid}
                    placeholder="Moneyback Paid"
                    name="moneybackPaid"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Annuity Paid"
                    className="formtext"
                    id="annuityPaid"
                    value={annuityPaid}
                    placeholder="Annuity Paid"
                    name="annuityPaid"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Mort Charges Refund"
                    className="formtext"
                    id="mortChargesRefund"
                    value={mortChargesRefund}
                    placeholder="Mort Charges Refund"
                    name="mortChargesRefund"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="Guranteed Additional Charges"
                    className="formtext"
                    id="guranteedAddCharges"
                    value={guranteedAddCharges}
                    placeholder="Guranteed Additional Charges"
                    name="guranteedAddCharges"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={2}>
                  <TextField
                    label="LEAPS Remarks"
                    className="formtext"
                    id="leappfRemarks"
                    value={leappfRemarks}
                    placeholder="LEAPS Remarks"
                    name="leappfRemarks"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
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
  )
}

export default DeathClaimLeapDetailsEdit