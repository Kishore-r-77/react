import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function MortalityRatesEdit({
  open,
  handleClose,
  data,
  companyData,
  editChangestartDate,
  editChangeendDate,
  genderData,
  smokerFlagData,
  coverNameData,
  coverCodeData,
  onChange,
  handleFormSubmit,
}) {
  let {
    companyId,
    plan,
    planName,
    uinNumber,
    premTerm,
    age,
    rates,
    startDate,
    endDate,
    smoker,
    gender,
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
          <Modal.Title>Mortality Rates Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    disabled
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
                </Grid> */}

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Plan"
                    className="formtext"
                    id="plan"
                    value={plan}
                    placeholder="Plan"
                    name="plan"
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
                    {coverNameData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Uin Number"
                    className="formtext"
                    id="uinNumber"
                    value={uinNumber}
                    placeholder="Uin Number"
                    name="uinNumber"
                    disabled
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Prem Term"
                    className="formtext"
                    id="premTerm"
                    value={premTerm}
                    placeholder="Prem Term"
                    name="premTerm"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Age"
                    className="formtext"
                    id="age"
                    value={age}
                    placeholder="Age"
                    name="age"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Rates"
                    className="formtext"
                    id="rates"
                    value={rates}
                    placeholder="Rates"
                    name="rates"
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
                        inputFormat="dd/MM/yyyy"
                        label="End Date:"
                        id="endDate"
                        value={moment(endDate).format("YYYY-MM-DD")}
                        placeholder="End Date:"
                        name="endDate"
                        onChange={(e) => onChangeendDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                      />
                    </LocalizationProvider>
                  </FormControl>
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
                    select
                    label="Smoker"
                    className="formtext"
                    id="smoker"
                    value={smoker}
                    placeholder="Smoker"
                    name="smoker"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {smokerFlagData?.map((val) => (
                      <MenuItem key={val} value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
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

export default MortalityRatesEdit;
