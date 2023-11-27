import { MenuItem } from "@material-ui/core";
import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Css/ContentInfo.css";
import DraggableComponent from "../Service/DraggableComponent";

function AnnuityRatesInfo({
  open,
  handleClose,
  data,
  companyData,
  onChange,
  handleFormSubmit,
}) {
  let {
    companyId,
    productCode,
    pendingAnnuityYears,
    annuityDiscountRate,
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
          <Modal.Title>Annuity Rates Info</Modal.Title>
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
                    label="Product Code"
                    className="formtext"
                    id="productCode"
                    value={productCode}
                    placeholder="Product Code"
                    name="productCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Pending Annuity Year"
                    className="formtext"
                    id="pendingAnnuityYears"
                    value={pendingAnnuityYears}
                    placeholder="Pending Annuity Year"
                    name="pendingAnnuityYears"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Annuity Discount Rate"
                    className="formtext"
                    id="annuityDiscountRate"
                    value={annuityDiscountRate}
                    placeholder="Annuity Discount Rate"
                    name="annuityDiscountRate"
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

export default AnnuityRatesInfo;
