import React from "react";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Grid } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DraggableComponent from "../Service/DraggableComponent";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

function DeathClaimPoliycInfo({ open, handleClose, data }) {
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
          <Modal.Title>Death Claim Policy Details Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client Number"
                    className="formtext"
                    id="clntNum"
                    value={data.clntNum}
                    placeholder="Client Num"
                    inputProps={{ readOnly: true }}
                    name="clntNum"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Number"
                    className="formtext"
                    id="chdrNum"
                    value={data.chdrNum}
                    placeholder="Policy Num"
                    inputProps={{ readOnly: true }}
                    name="chdrNum"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Bill Frequency"
                    className="formtext"
                    id="billFreq"
                    value={data.billFreq}
                    placeholder="Bill Frequency"
                    inputProps={{ readOnly: true }}
                    name="billFreq"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Installment premium"
                    className="formtext"
                    id="installmentPremium"
                    value={data.installmentPremium}
                    placeholder="Installment premium"
                    inputProps={{ readOnly: true }}
                    name="installmentPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Extra premium"
                    className="formtext"
                    id="extraPremium"
                    value={data.extraPremium}
                    placeholder="Extra premium"
                    inputProps={{ readOnly: true }}
                    name="extraPremium"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="UIN No."
                    className="formtext"
                    id="uinNumber"
                    value={data.uinNumber}
                    placeholder="UIN No."
                    inputProps={{ readOnly: true }}
                    name="uinNumber"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="FUP:"
                    className="formtext"
                    id="fup"
                    value={moment(data.fup).format("DD/MM/YYYY")}
                    placeholder="FUP:"
                    inputProps={{ readOnly: true }}
                    name="fup"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="DOC Date:"
                    className="formtext"
                    id="docDate"
                    value={moment(data.docDate).format("DD/MM/YYYY")}
                    placeholder="DOC Date:"
                    inputProps={{ readOnly: true }}
                    name="docDate"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Life Assured Age"
                    className="formtext"
                    id="laAge"
                    value={data.laAge}
                    placeholder="Life Assured Age"
                    inputProps={{ readOnly: true }}
                    name="laAge"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Policy Holder Age"
                    className="formtext"
                    id="phAge"
                    value={data.phAge}
                    placeholder="Policy Holder Age"
                    inputProps={{ readOnly: true }}
                    name="phAge"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Status Code"
                    className="formtext"
                    id="statusCode"
                    value={data.statusCode}
                    placeholder="Status Code"
                    inputProps={{ readOnly: true }}
                    name="statusCode"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Smoker Flag"
                    className="formtext"
                    id="smokerFlag"
                    value={data.smokerFlag}
                    placeholder="Smoker Flag"
                    inputProps={{ readOnly: true }}
                    name="smokerFlag"
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeathClaimPoliycInfo;
