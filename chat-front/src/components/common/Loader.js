import React from 'react';
import LoaderImg from '../../assests/images/loading.gif';
import styled from 'styled-components';

const Loader = () => {
  return (
    <FormContainer>
      <img src={LoaderImg} alt="loader" />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  img {
    width: 100%;
    height: 100vh;
  }
`;

export default Loader;
