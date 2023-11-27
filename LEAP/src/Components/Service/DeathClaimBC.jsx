import React from "react";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function DeathClaimBC() {
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
          <Link href="deathClaimClient">Client</Link>
          <Link href="deathClaimPolicy">Policy</Link>
          <Link href="deathClaimCover">Cover</Link>
          <Link href="DeathClaimTransaction">Transaction</Link>
          <Link href="deathClaimLeapDetails">Payout Result</Link>
          <Link href="surrenderMis"> MIS</Link>
        </Breadcrumbs>
      </Stack>
    </div>
  );
}

export default DeathClaimBC;
