import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const LoadingData = () => {
  return (
    <LoadingDataStyled>
      <h1>Loading Data</h1>
      <Icon icon={faSpinner} spin />
    </LoadingDataStyled>
  );
};

const LoadingDataStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  height: 10rem;
`;

export default LoadingData;
