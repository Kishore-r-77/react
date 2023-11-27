import { MenuItem } from "@material-ui/core";
import { useState } from "react";
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

function DeathClaimClientEdit({
  open,
  handleClose,
  data,
  companyData,
  onChangeLaDob,
  genderData,
  nationalityData,
  residentStatusData,
  onChange,
  handleFormSubmit,
}) {
  let {
    companyId,
    clntNum,
    laName,
    laDob,
    nationality,
    residentStatus,
    gender,
    contactNumber,
    emailId,
    createdBy,
    modifiedBy,
  } = data;
  const [isError, setisError] = useState(false);
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
          <Modal.Title>Death Claim Client Edit</Modal.Title>
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

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Client No"
                    className="formtext"
                    id="clntNum"
                    value={clntNum}
                    placeholder="Client No"
                    name="clntNum"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="La Name"
                    className="formtext"
                    id="laName"
                    value={laName}
                    placeholder="La Name"
                    name="laName"
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
                        label="La Dob:"
                        id="laDob"
                        value={moment(laDob).format("YYYY-MM-DD")}
                        placeholder="La Dob:"
                        name="laDob"
                        onChange={(e) => onChangeLaDob(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        maxDate={moment().toDate()}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Nationality"
                    className="formtext"
                    id="nationality"
                    value={nationality}
                    placeholder="Nationality"
                    name="nationality"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {nationalityData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Residential Status"
                    className="formtext"
                    id="residentStatus"
                    value={residentStatus}
                    placeholder="Residential Status"
                    name="residentStatus"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {residentStatusData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Gender"
                    className="formtext"
                    id="gender"
                    value={gender}
                    placeholder="Gender"
                    name="gender"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {genderData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Contact Number"
                    className="formtext"
                    id="contactNumber"
                    value={contactNumber}
                    placeholder="Contact Number"
                    name="contactNumber"
                    onChange={(e) => {
                      if (e.target.value.length > 10) {
                        setisError(true);
                        <p>Enter a Valid Mobile No</p>;
                      } else {
                        onChange(e);
                        setisError(false);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Email Id"
                    className="formtext"
                    id="emailId"
                    value={emailId}
                    placeholder="Email Id"
                    name="emailId"
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

export default DeathClaimClientEdit;
