import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";

function UinMasterEdit({
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
          <Modal.Title>UIN Master Edit</Modal.Title>
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
                  ></TextField>
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
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Prodect Type"
                    className="formtext"
                    id="productType"
                    value={productType}
                    placeholder="Prodect Type"
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
                  <TextField
                    inputFormat="dd/MM/yyyy"
                    label="Start Date"
                    className="formtext"
                    id="startDate"
                    value={moment(startDate).format("DD-MM-YYYY")}
                    placeholder="Start Date"
                    name="startDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    inputFormat="dd/MM/yyyy"
                    label="End Date"
                    className="formtext"
                    id="endDate"
                    value={moment(endDate).format("DD-MM-YYYY")}
                    placeholder="End Date"
                    name="endDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
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

export default UinMasterEdit;
