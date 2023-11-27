import React from "react";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function FlcBC() {
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
          <Link href="clientDetailPas">Client</Link>
          <Link href="policyDetailPas">Policy</Link>
          <Link href="coverDetailPas">Cover</Link>
          <Link href="transaction">Transaction</Link>
          <Link href="purpleDetails">Payout Result</Link>
          <Link href="mis">Flc MIS</Link>
        </Breadcrumbs>
      </Stack>
    </div>
  );
}

export default FlcBC;
