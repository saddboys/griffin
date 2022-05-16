import React, {FunctionComponent, useState} from 'react';
import {Box} from "@mui/system";
import PageContainer from "../../components/PageContainer";
import {
  Button,
  Grid,
  Typography
} from "@mui/material";

import ScannerHeader from "./components/ScannerHeader";
import ScanList from "./components/ScanList";
import FooterSpacer from "../../components/FooterSpacer";

interface Props {
  vulnerabilities: Array<Vulnerability>,
}

// todo add summary info for entire ecosystem
// number of existing vulnerabilities
// number of new vulnerabilities

// potentially could also add a table with
// todo add some summary info for each projectDependencies
//  i.e. number of vulnerabilities
//
const Scanner: FunctionComponent<Props> = (props) => {

  return (
    <PageContainer>
      <ScannerHeader/>
      <ScanList
        items={props.vulnerabilities}
      />
      <FooterSpacer/>
    </PageContainer>

  );
};

export default Scanner;