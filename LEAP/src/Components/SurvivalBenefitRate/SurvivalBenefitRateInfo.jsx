import { MenuItem } from "@material-ui/core";
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

function SurvivialBenefitInfo({
  open,
  handleClose,
  data,
  companyData,
  onChange,
  onChangeFrom,
  onChangeTo,
  handleFormSubmit,
}) {
  let { companyId, productCode, policyYears, benefitRate } = data;

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
          <Modal.Title>Survival Benefit Rate Info</Modal.Title>
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
                    inputProps={{ readOnly: true }}
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
                    label="Product Code"
                    className="formtext"
                    id="productCode"
                    value={productCode}
                    placeholder="Product Code"
                    name="productCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Policy Years"
                    className="formtext"
                    id="policyYears"
                    value={policyYears}
                    placeholder="Policy Years"
                    name="policyYears"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Benefit Rate"
                    className="formtext"
                    id="benefitRate"
                    value={benefitRate}
                    placeholder="Benefit Rate"
                    name="benefitRate"
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SurvivialBenefitInfo;
