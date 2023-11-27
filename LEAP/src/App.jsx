import { useState } from "react";
import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import UserLoginDetails from "./Components/LoginAndSignup/UserLoginDetails";
import Login from "./Components/LoginAndSignup/Login";
import Signup from "./Components/LoginAndSignup/Signup";
import Company from "./Components/Company/Company";
import Address from "./Components/Address/Address";
import UserGroup from "./Components/UserGroup/UserGroup";
import ContextProvider from "./Components/Contexts/StoreContext";
import Verification from "./Components/LoginAndSignup/Verification";
import ProfileEdit from "./Components/LoginAndSignup/ProfileEdit";
import ForgotPassword from "./Components/LoginAndSignup/ForgotPassword";
import NavBarBs from "./Components/NavBarBs/NavBarBs";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import HomePage from "./Components/HomePage/HomePage";
import Transaction from "./Components/Transaction/Transaction";
import ClientDetailPas from "./Components/ClientDetailsPas/ClientDetailsPas";
import PolicyDetailPas from "./Components/PolicyDetailsPas/PolicyDetailsPas";
import MortalityRates from "./Components/MortalityRates/MortalityRates";
import PurpleDetails from "./Components/PurpleDetails/PurpleDetails";
import MedicalDetails from "./Components/MedicalDetails/MedicalDetails";
import CoverDetailPas from "./Components/CoverDetailPas/CoverDetailPas";
import Screen from "./Components/Screen/Screen";
import MIS from "./Components/Screen/MIS";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import QualityChecking from "./Components/Screen/QualityChecking";
import StampDutyMaster from "./Components/StamDutyMaster/StampDutyMaster";
import MortFlagMaster from "./Components/MortalityFlagMaster/MortFlagMaster";
import PurpleNav from "./Components/PurpleNav/PurpleNav";
import PurpleFundDetails from "./Components/PurpleFundDetails/PurpleFundDetails";
import FundDetailsPas from "./Components/FundDetailsPas/FundDetailsPas";
import SurrenderCoverDetails from "./Components/SurrenderCoverDetails/SurrenderCoverDetails";
import SurrenderPolicyDetails from "./Components/SurrenderPolicyDetails/SurrenderPolicyDetails";
import SurrenderTransactionPas from "./Components/SurrenderTransactionPas/SurrenderTransactionPas";
import SurrenderClientDetails from "./Components/SurrenderClientDetails/SurrenderClientDetails";
import IPCASurrender from "./Components/IPCASurrender/IPCASurrender";
import UinMaster from "./Components/UinMaster/UinMaster";
import Gsv from "./Components/Gsv/Gsv";
import SurrenderBC from "./Components/Service/SurrenderBC";
import FlcMasterBC from "./Components/Service/FlcMasterBC";
import FlcBC from "./Components/Service/FlcBC";
import DeathClaimBC from "./Components/Service/DeathClaimBC";
import SurrenderMasterBC from "./Components/Service/SurrenderMasterBC";
import DeathClaimMasterBC from "./Components/Service/DeathClaimMasterBC";
import SsvFactor from "./Components/SsvFactor/SsvFactor";
import GsvCashValue from "./Components/GsvCashValue/GsvCashValue";
import BonusRate from "./Components/BonusRate/BonusRate";
import SurrenderFundDetailsPas from "./Components/SurrenderFundDetailsPas/SurrenderFundDetailsPas";
import IpcaSurrenderFundDetails from "./Components/IpcaSurrenderFundDetails/IpcaSurrenderFundDetails";
import SurrenderMIS from "./Components/Screen/SurrenderMIS";
import DeathClaimClient from "./Components/DeathClaimClient/DeathClaimClient";
import DeathClaimPolicy from "./Components/DeathClaimPolicy/DeathClaimPolicy";
import DeathClaimCover from "./Components/DeathClaimCover/DeathClaimCover";
import DeathClaimTransaction from "./Components/DeathClaimTransaction/DeathClaimTransaction";
import DeathClaimLeapDetails from "./Components/DeathClaimLeapDetails/DeathClaimLeapDetails";
import DeathClaimLeapParameter from "./Components/DeathClaimLeapParameter/DeathClaimLeapParameter";
import DeathClaimCoverTablePas from "./Components/DeathClaimCoverTablePas/DeathClaimCoverTablePas";
import DeathClaimLeapCoverTable from "./Components/DeathClaimLeapCoverTable/DeathClaimLeapCoverTable";
import DeathClaimParam from "./Components/DeathClaimParam/DeathClaimParam";
import GuaranteedBonusRate from "./Components/GuaranteedBonusRate/GuaranteedBonusRate";
import InterimBonusRate from "./Components/InterimBonusRate/InterimBonusRate";
import GstRates from "./Components/GstRates/GstRates";
import SurvivalBenefitRate from "./Components/SurvivalBenefitRate/SurvivalBenefitRate";
import InterestPremiumRate from "./Components/InterestPremiumRate/InterestPremiumRate";
import DeathClaimFundDetailsPas from "./Components/DeathClaimFundDetailsPas/DeathClaimFundDetailsPas";
import DeathClaimLeapFundDetails from "./Components/DeathClaimLeapFundDetails/DeathClaimLeapFundDetails";
import AnnuityRates from "./Components/AnnuityRates/AnnuityRates";
import TerminalBonus from "./Components/TerminalBonus/TerminalBonus";
import LoyaltyAdditionBonus from "./Components/LoyaltyAdditionBonus/LoyaltyAdditionBonus";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <CssBaseline />
      <ContextProvider>
        {/* <ResponsiveAppBar /> */}
        {pathname !== "/" &&
          pathname !== "/signup" &&
          pathname !== "/verify" &&
          pathname != "/forgotPassword" && <NavBarBs />}

        {/* Flc Bread Crumb */}

        {pathname === "/clientDetailPas" && <FlcBC />}
        {pathname === "/policyDetailPas" && <FlcBC />}
        {pathname === "/coverDetailPas" && <FlcBC />}
        {pathname === "/transaction" && <FlcBC />}
        {pathname === "/purpleDetails" && <FlcBC />}
        {pathname === "/mis" && <FlcBC />}

        {pathname === "/fundDetailsPas" && <FlcMasterBC />}
        {pathname === "/purpleFundDetails" && <FlcMasterBC />}
        {pathname === "/mortalityRates" && <FlcMasterBC />}
        {pathname === "/medicalDetails" && <FlcMasterBC />}
        {pathname === "/stamDutyMaster" && <FlcMasterBC />}
        {pathname === "/mortFlagMaster" && <FlcMasterBC />}

        {pathname === "/surrenderClient" && <SurrenderBC />}
        {pathname === "/surrenderPolicy" && <SurrenderBC />}
        {pathname === "/surrenderCover" && <SurrenderBC />}
        {pathname === "/surrenderTransaction" && <SurrenderBC />}
        {pathname === "/IPCASurrender" && <SurrenderBC />}
        {pathname === "/surrenderMis" && <SurrenderBC />}

        {pathname === "/uinMaster" && <SurrenderMasterBC />}
        {pathname === "/gsvFactor" && <SurrenderMasterBC />}
        {pathname === "/ssvFactor" && <SurrenderMasterBC />}
        {pathname === "/gsvCashValue" && <SurrenderMasterBC />}
        {pathname === "/bonusRate" && <SurrenderMasterBC />}
        {pathname === "/surrenderFundDetailsPas" && <SurrenderMasterBC />}
        {pathname === "/ipcaSurrenderFundDetails" && <SurrenderMasterBC />}

        {pathname === "/deathClaimClient" && <DeathClaimBC />}
        {pathname === "/deathClaimPolicy" && <DeathClaimBC />}
        {pathname === "/deathClaimCover" && <DeathClaimBC />}
        {pathname === "/DeathClaimTransaction" && <DeathClaimBC />}
        {pathname === "/deathClaimLeapDetails" && <DeathClaimBC />}
        {pathname === "/deathClaimLeapParameter" && <DeathClaimBC />}

        {pathname === "/guaranteedBonusRate" && <DeathClaimMasterBC />}
        {pathname === "/interimBonusRate" && <DeathClaimMasterBC />}
        {pathname === "/loyaltyAdditionBonus" && <DeathClaimMasterBC />}
        {pathname === "/terminalBonus" && <DeathClaimMasterBC />}
        {pathname === "/survivalBenefitRate" && <DeathClaimMasterBC />}
        {pathname === "/interestPremiumRate" && <DeathClaimMasterBC />}
        {pathname === "/gstRates" && <DeathClaimMasterBC />}
        {pathname === "/annuityRates" && <DeathClaimMasterBC />}
        <br></br>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logindetails" element={<UserLoginDetails />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/userGroup" element={<UserGroup />} />
          <Route exact path="/verify" element={<Verification />} />
          <Route exact path="/edituser" element={<ProfileEdit />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/transaction" element={<Transaction />} />
          <Route exact path="/clientDetailPas" element={<ClientDetailPas />} />
          <Route exact path="/policyDetailPas" element={<PolicyDetailPas />} />
          <Route exact path="/coverDetailPas" element={<CoverDetailPas />} />
          <Route exact path="/purpleDetails" element={<PurpleDetails />} />
          <Route exact path="/medicalDetails" element={<MedicalDetails />} />
          <Route exact path="/mortalityRates" element={<MortalityRates />} />
          <Route exact path="/screen" element={<Screen />} />
          <Route exact path="/mis" element={<MIS />} />
          <Route exact path="/qualityChecking" element={<QualityChecking />} />
          <Route exact path="/stamDutyMaster" element={<StampDutyMaster />} />
          <Route exact path="/mortFlagMaster" element={<MortFlagMaster />} />
          <Route exact path="/fundDetailsPas" element={<FundDetailsPas />} />
          <Route
            exact
            path="/surrenderFundDetailsPas"
            element={<SurrenderFundDetailsPas />}
          />
          <Route
            exact
            path="/ipcaSurrenderFundDetails"
            element={<IpcaSurrenderFundDetails />}
          />
          <Route exact path="/purpleNav" element={<PurpleNav />} />
          <Route
            exact
            path="/purpleFundDetails"
            element={<PurpleFundDetails />}
          />
          <Route
            exact
            path="/surrenderClient"
            element={<SurrenderClientDetails />}
          />
          <Route
            exact
            path="/surrenderPolicy"
            element={<SurrenderPolicyDetails />}
          />
          <Route
            exact
            path="/surrenderCover"
            element={<SurrenderCoverDetails />}
          />
          <Route
            exact
            path="/surrenderTransaction"
            element={<SurrenderTransactionPas />}
          />
          <Route exact path="/IPCASurrender" element={<IPCASurrender />} />
          <Route exact path="/uinMaster" element={<UinMaster />} />
          <Route exact path="/gsvFactor" element={<Gsv />} />
          <Route exact path="/ssvFactor" element={<SsvFactor />} />
          <Route exact path="/gsvCashValue" element={<GsvCashValue />} />
          <Route exact path="/bonusRate" element={<BonusRate />} />
          <Route exact path="/surrenderMis" element={<SurrenderMIS />} />

          <Route
            exact
            path="/deathClaimClient"
            element={<DeathClaimClient />}
          />
          <Route
            exact
            path="/deathClaimPolicy"
            element={<DeathClaimPolicy />}
          />
          <Route exact path="/deathClaimCover" element={<DeathClaimCover />} />
          <Route
            exact
            path="/deathClaimTransaction"
            element={<DeathClaimTransaction />}
          />
          <Route
            exact
            path="/deathClaimLeapDetails"
            element={<DeathClaimLeapDetails />}
          />
          <Route
            exact
            path="/deathClaimLeapParameter"
            element={<DeathClaimLeapParameter />}
          />
          <Route exact path="/deathClaimParam" element={<DeathClaimParam />} />
          <Route
            exact
            path="/deathClaimCoverTablePas"
            element={<DeathClaimCoverTablePas />}
          />
          <Route
            exact
            path="/deathClaimLeapCoverTable"
            element={<DeathClaimLeapCoverTable />}
          />
          <Route
            exact
            path="/guaranteedBonusRate"
            element={<GuaranteedBonusRate />}
          />
          <Route
            exact
            path="/interimBonusRate"
            element={<InterimBonusRate />}
          />
          <Route exact path="/gstRates" element={<GstRates />} />
          <Route
            exact
            path="/survivalBenefitRate"
            element={<SurvivalBenefitRate />}
          />
          <Route
            exact
            path="/interestPremiumRate"
            element={<InterestPremiumRate />}
          />
          <Route exact path="/terminalBonus" element={<TerminalBonus />} />
          <Route
            exact
            path="/deathClaimFundDetailsPas"
            element={<DeathClaimFundDetailsPas />}
          />
          <Route
            exact
            path="/deathClaimLeapFundDetails"
            element={<DeathClaimLeapFundDetails />}
          />
          <Route exact path="/annuityRates" element={<AnnuityRates />} />
          <Route
            exact
            path="/loyaltyAdditionBonus"
            element={<LoyaltyAdditionBonus />}
          />

          {/* <Route exact path="/edituser" element={<UserDetailsEdit />} />  */}
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
