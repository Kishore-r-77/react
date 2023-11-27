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

function DeathClaimLeapCoverTableAdd({
  open,
  data,
  handleClose,
  companyData,
  onChange,
  onChangeRiskComDate,
  onChangeDoc,
  handleFormSubmit,
}) {
  let {
    companyId,
    uinNumber,
    doc,
    riskComDate,
    originalSumAssured,
    pasSumAssured,
    leapSumAssured,
    leapFlag,
    leapRemark,
    qcRemark,
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
          <Modal.Title>Death Claim Leap Cover Table Add</Modal.Title>
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
                        {val.companyCode}-{val.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
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

                <Grid item xs={8} md={6} lg={4}>
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
                <Grid item xs={8} md={6} lg={4}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Doc"
                        id="doc"
                        value={moment(doc).format("YYYY-MM-DD")}
                        placeholder="Doc"
                        name="doc"
                        onChange={(e) => onChangeDoc(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Original Sum Assured"
                    className="formtext"
                    id="originalSumAssured"
                    value={originalSumAssured}
                    placeholder="Original Sum Assured"
                    name="originalSumAssured"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Original Sum Assured"
                    className="formtext"
                    id="planName"
                    value={planName}
                    placeholder="Original Sum Assured"
                    name="planName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid> */}
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Pas Sum Assured"
                    className="formtext"
                    id="pasSumAssured"
                    value={pasSumAssured}
                    placeholder="Pas Sum Assured"
                    name="pasSumAssured"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Leap Sum Assured"
                    className="formtext"
                    id="leapSumAssured"
                    value={leapSumAssured}
                    placeholder="Leap Sum Assured"
                    name="leapSumAssured"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Leap Flag"
                    className="formtext"
                    id="leapFlag"
                    value={leapFlag}
                    placeholder="Leap Flag"
                    name="leapFlag"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Leap Remark"
                    className="formtext"
                    id="leapRemark"
                    value={leapRemark}
                    placeholder="Leap Remark"
                    name="leapRemark"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Qc Remark"
                    className="formtext"
                    id="qcRemark"
                    value={qcRemark}
                    placeholder="Qc Remark"
                    name="qcRemark"
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

export default DeathClaimLeapCoverTableAdd;
