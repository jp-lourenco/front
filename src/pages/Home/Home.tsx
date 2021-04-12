import React from 'react';
import { Link } from 'react-router-dom';
import {
  Background,
  Container,
  Nav,
  Logo,
  Hero,
  Title,
  Text,
  ButtonStyled,
  FlowSection,
  FlowSectionTitle,
  Flow,
  FlowItem,
  FlowItemTitle,
  FlowItemImage,
  FlowItemText,
  Next,
  AdvantageSection,
  AdvantageSectionTitle,
  AdvantageContainer,
  AdvantageItem,
  AdvantageNumber,
  AdvantageTextContainer,
  AdvantageTitle,
  AdvantageText,
  FooterSection,
  FooterTitle,
  FooterCopy,
  FooterText,
} from './styles/Home';

const Home = () => {
  return (
    <>
      <Background>
        <Container>
          <Nav>
            <Logo>BioTRACE</Logo>
          </Nav>
          <Hero>
            <Title>Sistema de Rastreabilidade de Alimentos</Title>
            <Text>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </Text>
            <ButtonStyled>
              <Link to="/rastreabilidade">Rastrei seu alimento</Link>
            </ButtonStyled>
          </Hero>
        </Container>
      </Background>
      <FlowSection>
        <FlowSectionTitle>Da Origem ao Consumidor</FlowSectionTitle>
        <Flow>
          <FlowItem>
            <FlowItemImage src="arvore.png" />
            <FlowItemTitle>PRODUTOR</FlowItemTitle>
            <FlowItemText>(Origem)</FlowItemText>
          </FlowItem>
          <Next src="next.png" />
          <FlowItem>
            <FlowItemImage src="icon_truck.png" />
            <FlowItemTitle>FORNECEDOR</FlowItemTitle>
            <FlowItemText>(Distribuidor)</FlowItemText>
          </FlowItem>
          <Next src="next.png" />
          <FlowItem>
            <FlowItemImage src="mercado.png" />
            <FlowItemTitle>LOJA</FlowItemTitle>
            <FlowItemText>(Destino)</FlowItemText>
          </FlowItem>
          <Next src="next.png" />
          <FlowItem>
            <FlowItemImage src="person.png" />
            <FlowItemTitle>CONSUMIDOR</FlowItemTitle>
          </FlowItem>
        </Flow>
      </FlowSection>
      <AdvantageSection>
        <AdvantageSectionTitle>
          Vantagens da rastreabilidade
        </AdvantageSectionTitle>
        <AdvantageContainer>
          <AdvantageItem>
            <AdvantageNumber>01</AdvantageNumber>
            <AdvantageTextContainer>
              <AdvantageTitle>Segurança do produto</AdvantageTitle>
              <AdvantageText>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </AdvantageText>
            </AdvantageTextContainer>
          </AdvantageItem>
          <AdvantageItem>
            <AdvantageNumber>02</AdvantageNumber>
            <AdvantageTextContainer>
              <AdvantageTitle>Qualidade ao longo da cadeia</AdvantageTitle>
              <AdvantageText>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </AdvantageText>
            </AdvantageTextContainer>
          </AdvantageItem>
        </AdvantageContainer>
        <AdvantageContainer>
          <AdvantageItem>
            <AdvantageNumber>03</AdvantageNumber>
            <AdvantageTextContainer>
              <AdvantageTitle>Redução de perdas</AdvantageTitle>
              <AdvantageText>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </AdvantageText>
            </AdvantageTextContainer>
          </AdvantageItem>
          <AdvantageItem>
            <AdvantageNumber>04</AdvantageNumber>
            <AdvantageTextContainer>
              <AdvantageTitle>Valorização da marca</AdvantageTitle>
              <AdvantageText>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </AdvantageText>
            </AdvantageTextContainer>
          </AdvantageItem>
        </AdvantageContainer>
      </AdvantageSection>
      <FooterSection>
        <FooterTitle>BioTrace</FooterTitle>
        <FooterCopy>COPYRIGHT BIOTRACE © 2021</FooterCopy>
        <FooterText>Instituto Politécnico de Bragança</FooterText>
      </FooterSection>
    </>
  );
};

export default Home;
