import React from "react";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function FlcMasterBC() {
  return (
    <div style={{ float: "left", marginLeft: "5rem" }}>
      <Stack spacing={2}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          fontSize="medium"
          fontWeight="bold"
          style={{ color: "#d32f2f" }}
          // className="breadcrumb"
        >
          <Link href="mortalityRates">Mortality</Link>
          <Link href="medicalDetails">Medical </Link>
          <Link href="mortFlagMaster">Mortality Master </Link>
          <Link href="stamDutyMaster">Stam duty Master</Link>
          <Link href="fundDetailsPas">PAS Fund</Link>
          <Link href="purpleFundDetails">LEAPS Fund</Link>
          <Link href="purpleNav">LEAPS Nav</Link>
        </Breadcrumbs>
      </Stack>
    </div>
  );
}

export default FlcMasterBC;
