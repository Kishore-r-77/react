import React from "react";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function SurrenderMasterBC() {
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
          <Link href="gsvFactor">Gsv</Link>
          <Link href="ssvFactor">Ssv</Link>
          <Link href="gsvCashValue">Gsv Cash</Link>
          <Link href="bonusRate">Bonus Rate</Link>
          <Link href="surrenderFundDetailsPas">PAS Fund</Link>
          <Link href="ipcaSurrenderFundDetails">LEAPS Fund</Link>
          <Link href="purpleNav">LEAPS Nav</Link>
          <Link href="uinMaster">UIN Master</Link>
        </Breadcrumbs>
      </Stack>
    </div>
  );
}

export default SurrenderMasterBC;
