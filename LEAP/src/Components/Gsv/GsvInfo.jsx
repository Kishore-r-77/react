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
import "../Css/ContentAdd.css";
// import validator from "validator";

function GsvInfo({ open, data, handleClose, companyData }) {
  let {
    companyId,
    uinNumber,
    planName,
    planCode,
    policyTerm,
    premiumTerm,
    premiumType,
    policyDuration,
    rate,
    startDate,
    endDate,
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
          <Modal.Title>GSV Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {companyData?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {val.companyCode}-{val.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Uin Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="Uin Number"
                    name="uinNumber"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
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
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
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
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
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
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Premium Type"
                    className="formtext"
                    id="premiumType"
                    value={premiumType}
                    placeholder="Premium Type"
                    name="premiumType"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Policy Duration"
                    className="formtext"
                    id="policyDuration"
                    value={policyDuration}
                    placeholder="Policy Duration"
                    name="policyDuration"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="CVB Rate"
                    className="formtext"
                    id="rate"
                    value={rate}
                    placeholder="CVB Rate"
                    name="rate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
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
                        label="Start Date"
                        id="startDate"
                        value={moment(startDate).format("YYYY-MM-DD")}
                        placeholder="Start Date"
                        name="startDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        maxDate={moment().toDate()}
                        fullWidth
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
                        inputFormat="dd/MM/yyyy"
                        label="End Date"
                        id="endDate"
                        value={moment(endDate).format("YYYY-MM-DD")}
                        placeholder="End Date"
                        name="endDate"
                        readOnly
                        renderInput={(params) => <TextField {...params} />}
                        maxDate={moment().toDate()}
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GsvInfo;
