import React from 'react';
import { Container, ButtonStyled } from './styles/SignIn';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Link to="/admin/dashboard">
        <ButtonStyled>Dashboard</ButtonStyled>
      </Link>
    </Container>
  );
};

export default SignIn;
