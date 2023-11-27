import React from "react";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function DeathClaimMasterBC() {
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
          <Link href="guaranteedBonusRate">Guaranteed Additions Rate</Link>
          <Link href="interimBonusRate">Interim Bonus Rate</Link>
          <Link href="loyaltyAdditionBonus">Loyalty Additions Rate</Link>
          <Link href="terminalBonus">Terminal Bonus Rate</Link>
          <Link href="survivalBenefitRate">Survival Benefit Rate</Link>
          <Link href="interestPremiumRate">Interest Premium Rate</Link>
          <Link href="gstRates">GST Rates</Link>
          <Link href="annuityRates">Annuity Rate</Link>
        </Breadcrumbs>
      </Stack>
    </div>
  );
}

export default DeathClaimMasterBC;
