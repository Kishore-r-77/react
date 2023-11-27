import { MenuItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Css/ContentAdd.css";
import DraggableComponent from "../Service/DraggableComponent";

function DeathClaimLeapParameterEdit({
  open,
  handleClose,
  data,
  companyData,
  yesNoData,
  onChange,
  handleFormSubmit,
}) {
  let {
    companyId,
    basicSa,
    increaseSaYears,
    percentageSaIncrease,
    reversionaryBonus,
    loyaltyBonus,
    guaranteedBonus,
    terminalBonus,
    suicideClause,
    waitingPeriod,
    refundOfAdminFee,
    refundOfMc,
    refundOfGuaranteedCharges,
    returnOfPremiums,
    fundvalueSaPayable,
    claimConcession,
    tdsType,
    tdsRate,
  } = data;

  return (
    <div>
      <Modal
        show={open}
        dialogAs={DraggableComponent}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Death Claim Leap Parameter Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
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
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Basic Sa"
                    className="formtext"
                    id="basicSa"
                    value={basicSa}
                    placeholder="Basic Sa"
                    name="basicSa"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Increase Sa Years"
                    className="formtext"
                    id="increaseSaYears"
                    value={increaseSaYears}
                    placeholder="Increase Sa Years"
                    name="increaseSaYears"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Percentage Sa Years"
                    className="formtext"
                    id="percentageSaIncrease"
                    value={percentageSaIncrease}
                    placeholder="Percentage Sa Years"
                    name="percentageSaIncrease"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
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
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Loyalty Bonus"
                    className="formtext"
                    id="loyaltyBonus"
                    value={loyaltyBonus}
                    name="loyaltyBonus"
                    placeholder="Loyalty Bonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Guaranteed Bonus"
                    className="formtext"
                    id="guaranteedBonus"
                    value={guaranteedBonus}
                    placeholder="Guaranteed Bonus"
                    name="guaranteedBonus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
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
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Suicide Clause"
                    className="formtext"
                    id="suicideClause"
                    value={suicideClause}
                    placeholder="Suicide Clause"
                    name="suicideClause"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Waiting Period"
                    className="formtext"
                    id="waitingPeriod"
                    value={waitingPeriod}
                    placeholder="Waiting Period"
                    name="waitingPeriod"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Refund Of Admin Fee"
                    className="formtext"
                    id="refundOfAdminFee"
                    value={refundOfAdminFee}
                    placeholder="Refund Of Admin Fee"
                    name="refundOfAdminFee"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Refund Of MC"
                    className="formtext"
                    id="refundOfMc"
                    value={refundOfMc}
                    placeholder="Refund Of MC"
                    name="refundOfMc"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Refund Of Guaranteed Charges"
                    className="formtext"
                    id="refundOfGuaranteedCharges"
                    value={refundOfGuaranteedCharges}
                    placeholder="Refund Of Guaranteed Charges"
                    name="refundOfGuaranteedCharges"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Return Of Premium"
                    className="formtext"
                    id="returnOfPremiums"
                    value={returnOfPremiums}
                    placeholder="Return Of Premium"
                    name="returnOfPremiums"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Fund Value + Sa Payable"
                    className="formtext"
                    id="fundvalueSaPayable"
                    value={fundvalueSaPayable}
                    placeholder="Fund Value + Sa Payable"
                    name="fundvalueSaPayable"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Claim Concession"
                    className="formtext"
                    id="claimConcession"
                    value={claimConcession}
                    placeholder="Claim Concession"
                    name="claimConcession"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {yesNoData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Tds Type"
                    className="formtext"
                    id="tdsType"
                    value={tdsType}
                    placeholder="Tds Type"
                    name="tdsType"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Tds Rate"
                    className="formtext"
                    id="tdsRate"
                    value={tdsRate}
                    placeholder="Tds Rate"
                    name="tdsRate"
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
  );
}

export default DeathClaimLeapParameterEdit;
