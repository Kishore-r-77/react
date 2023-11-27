import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import DraggableComponent from "../Service/DraggableComponent";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import "../Css/ContentAdd.css";

function UinMasterAdd({
  open,
  handleClose,
  data,
  companyData,
  onChange,
  onChangestartDate,
  onChangeendDate,
  yesNoFlagData,
  productTypeData,
  coverCodeData,
  cntTypeData,
  handleFormSubmit,
}) {
  let {
    companyId,
    uinNumber,
    planName,
    planCode,
    productType,
    startDate,
    endDate,
    gsvFactor,
    gsvCashValue,
    ssvFactor,
    revesionaryBonus,
    interimBonus,
    terminalBonus,
    guaranteedBonus,
    loyaltyBonus,
    surrenderChargeRate,
    flcEligibility,
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
          <Modal.Title>Uin Master Add</Modal.Title>
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
                    label="UIN Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="UIN Number"
                    name="uinNumber"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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
                    {cntTypeData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
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
                  >
                    {productTypeData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Revesionary Bonus"
                    className="formtext"
                    id="revesionaryBonus"
                    value={revesionaryBonus}
                    placeholder="Revesionary Bonus"
                    name="revesionaryBonus"
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Iinterim Bonus"
                    className="formtext"
                    id="interimBonus"
                    value={interimBonus}
                    placeholder="Iinterim Bonus"
                    name="interimBonus"
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
                    {yesNoFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="terminal Bonus"
                    className="formtext"
                    id="terminalBonus"
                    value={terminalBonus}
                    placeholder="terminal Bonus"
                    name="terminalBonus"
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Loyalty Bonus"
                    className="formtext"
                    id="loyaltyBonus"
                    value={loyaltyBonus}
                    placeholder="Loyalty Bonus"
                    name="loyaltyBonus"
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="GSV Eligibility"
                    className="formtext"
                    id="gsvFactor"
                    value={gsvFactor}
                    placeholder="GSV Eligibility"
                    name="gsvFactor"
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
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="GSV Cash Value"
                    className="formtext"
                    id="gsvCashValue"
                    value={gsvCashValue}
                    placeholder="GSV Cash Value"
                    name="gsvCashValue"
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
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="SSV Eligibility"
                    className="formtext"
                    id="ssvFactor"
                    value={ssvFactor}
                    placeholder="SSV Eligibility"
                    name="ssvFactor"
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="FLC Eligibility"
                    className="formtext"
                    id="flcEligibility"
                    value={flcEligibility}
                    placeholder="FLC Eligibility"
                    name="flcEligibility"
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Surrender Charge Rate"
                    className="formtext"
                    id="surrenderChargeRate"
                    value={surrenderChargeRate}
                    placeholder="Surrender Charge Rate"
                    name="surrenderChargeRate"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Start Date:"
                        id="startDate"
                        value={moment(startDate).format("YYYY-MM-DD")}
                        placeholder="Start Date:"
                        name="startDate"
                        onChange={(e) => onChangestartDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        maxDate={moment().toDate()}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="yyyy/MM/dd"
                        label="End Date:"
                        id="endDate"
                        value={endDate}
                        placeholder="End Date:"
                        name="endDate"
                        onChange={(e) => onChangeendDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
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

export default UinMasterAdd;
