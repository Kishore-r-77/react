import { MenuItem } from "@material-ui/core";
import { Box, Grid, TextField } from "@mui/material";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Css/ContentInfo.css";
import DraggableComponent from "../Service/DraggableComponent";

function DeathClaimFundDetailsPasInfo({
  open,
  data,
  handleClose,
  companyData,
  policyData,
  onChange,
  fundCodeData,
  fundNameData,
  onChangeNavDate,
  handleFormSubmit,
}) {
  let {
    companyId,
    policyNum,
    fundCode,
    fundName,
    navDate,
    units,
    rateApp,
    value,
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
          <Modal.Title>DeathClaim Fund Details PAS Info</Modal.Title>
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
                    label="Policy No."
                    className="formtext"
                    id="policyNum"
                    value={policyNum}
                    placeholder="Policy No."
                    name="policyNum"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {/* {policyData?.map((val) => (
                      <MenuItem key={val.id} value={val.policyNum}>
                        {val.policyNum}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Code"
                    className="formtext"
                    id="fundCode"
                    value={fundCode}
                    placeholder="Fund Code"
                    name="fundCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Fund Name"
                    className="formtext"
                    id="fundName"
                    value={fundName}
                    placeholder="Fund Name"
                    name="fundName"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Effective Date"
                    id="navDate"
                    value={moment(navDate).format("DD-MM-YYYY")}
                    placeholder="Effective Date"
                    name="navDate"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="No. of Units"
                    className="formtext"
                    id="units"
                    value={units}
                    placeholder="No. of Units"
                    name="units"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Rate Applied"
                    className="formtext"
                    id="rateApp"
                    value={rateApp}
                    placeholder="Rate Applied"
                    name="rateApp"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Fund Value"
                    className="formtext"
                    id="value"
                    value={value}
                    placeholder="Fund Value"
                    name="value"
                    inputProps={{ readOnly: true }}
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
          {/* <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeathClaimFundDetailsPasInfo;
