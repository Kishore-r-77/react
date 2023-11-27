import { Box, Grid, TextField } from "@mui/material";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Css/ContentInfo.css";
import DraggableComponent from "../Service/DraggableComponent";

function InterimBonusRateInfo({
  open,
  data,
  handleClose,
  companyData,
  coverNameData,
  coverCodeData,
  onChange,
  onChangeFinancialYear,
  onChangeStartDate,
  onChangeEndDate,
  handleFormSubmit,
}) {
  let {
    companyId,
    uinNumber,
    planName,
    planCode,
    financialYear,
    bonusRate,
    bonusType,
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
          <Modal.Title>Interim Bonus Rate Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
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
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                {/* <Grid item xs={8} md={6} lg={4}>
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
                </Grid> */}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Plan Name"
                    className="formtext"
                    id="planName"
                    value={planName}
                    placeholder="Plan Name"
                    name="planName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                {/* <Grid item xs={8} md={6} lg={4}>
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
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Plan Code"
                    className="formtext"
                    id="planCode"
                    value={planCode}
                    placeholder="Plan Code"
                    name="planCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Bonus Rate"
                    className="formtext"
                    id="bonusRate"
                    value={bonusRate}
                    placeholder="Bonus Rate"
                    name="bonusRate"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Bonus Type"
                    className="formtext"
                    id="bonusType"
                    value={bonusType}
                    placeholder="Bonus Type"
                    name="bonusType"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Financial Year"
                    className="formtext"
                    id="financialYear"
                    value={moment(financialYear).format("DD/MM/YYYY")}
                    placeholder="Financial Year"
                    name="financialYear"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Start Date"
                    className="formtext"
                    id="startDate"
                    value={moment(startDate).format("DD/MM/YYYY")}
                    placeholder="Start Date"
                    name="startDate"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="End tDate"
                    className="formtext"
                    id="endDate"
                    value={moment(endDate).format("DD/MM/YYYY")}
                    placeholder="End Date"
                    name="endDate"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    inputProps={{ readOnly: true }}
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InterimBonusRateInfo;
