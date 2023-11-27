import React from "react";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function SurrenderBC() {
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
          <Link href="surrenderClient">Client</Link>
          <Link href="surrenderPolicy">Policy</Link>
          <Link href="surrenderCover">Cover</Link>
          <Link href="surrenderTransaction">Transaction</Link>
          <Link href="IPCASurrender">Payout Result</Link>
          <Link href="surrenderMis">Surrender MIS</Link>
        </Breadcrumbs>
      </Stack>
    </div>
  );
}

export default SurrenderBC;
