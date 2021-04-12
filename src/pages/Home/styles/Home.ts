import styled, { keyframes } from 'styled-components';
import { Button } from 'antd';

export const Background = styled.section`
  background-image: url('bg_home.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 460px) {
    background-image: url('bg_home_mobile.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1240px) {
    padding: 0 50px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  width: 1140px;

  @media screen and (max-width: 1240px) {
    width: 100%;
  }

  @media screen and (max-width: 460px) {
    justify-content: center;
  }
`;

export const Logo = styled.a`
  font-size: 27px;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  width: 1140px;
  align-items: flex-start;
  justify-content: center;

  @media screen and (max-width: 1240px) {
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: white;
  width: 440px;
  line-height: 40px;
  margin-bottom: 30px;

  @media screen and (max-width: 700px) {
    width: 370px;
  }

  @media screen and (max-width: 460px) {
    font-size: 30px;
    width: 270px;
    line-height: 30px;
  }
`;

export const Text = styled.h2`
  font-size: 21px;
  color: white;
  width: 580px;
  line-height: 25px;
  margin-bottom: 30px;

  @media screen and (max-width: 700px) {
    width: 370px;
  }

  @media screen and (max-width: 460px) {
    font-size: 20px;
    width: 270px;
    line-height: 20px;
  }
`;

export const ButtonStyled = styled(Button)`
  width: 370px;
  height: 60px;
  background: #fff;
  color: #446800;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;

  @media screen and (max-width: 460px) {
    width: 270px;
  }
`;

export const FlowSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 0 0 90px 0;
`;

export const FlowSectionTitle = styled.h3`
  font-size: 34px;
  font-weight: bold;
  color: #446800;
  line-height: 40px;
  margin: 90px 0;

  @media screen and (max-width: 460px) {
    font-size: 30px;
    line-height: 30px;
    text-align: center;
    margin: 90px 30px;
  }
`;

export const Flow = styled.div`
  width: 1140px;
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  margin: 0 0 90px 0;

  @media screen and (max-width: 1140px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

export const FlowItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  height: 170px;
  background: #446800;
  align-items: center;
  justify-content: center;
`;

export const FlowItemImage = styled.img`
  margin: 15px;
`;

export const FlowItemTitle = styled.p`
  font-weight: normal;
  font-size: 21px;
  line-height: 25px;
  color: #ffffff;
  text-align: center;
  margin: 0 0 2px 0;
`;

export const FlowItemText = styled.p`
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: center;
`;

export const Next = styled.img`
  margin: 0 30px 0 30px;
  widht: 70px;
  height: 70px;
  align-self: center;

  @media screen and (max-width: 1140px) {
    transform: rotate(90deg);
    margin: 10px 0 10px 0;
  }
`;

export const AdvantageSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 0 0 90px 0;
  background: #446800;
`;

export const AdvantageSectionTitle = styled.h3`
  font-size: 34px;
  font-weight: bold;
  color: #fff;
  line-height: 40px;
  margin: 90px 0;

  @media screen and (max-width: 500px) {
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    margin: 90px 30px;
  }
`;

export const AdvantageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 1140px;
  justify-content: space-between;
  margin: 0 0 60px;

  &:last-child {
    margin: 0 0 90px;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    margin: 0;
    width: 100%;

    &:last-child {
      margin: 0;
    }
  }
`;

export const AdvantageItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 470px;

  @media screen and (max-width: 1200px) {
    margin: 0 0 60px;
  }

  @media screen and (max-width: 600px) {
    width: 300px;
  }

  @media screen and (max-width: 420px) {
    width: 280px;
  }
`;

export const AdvantageNumber = styled.p`
  font-size: 34px;
  line-height: 34px;
  margin: 0 15px 0 0;
  margin-block-start: 0em;
  color: #fff;
`;

export const AdvantageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AdvantageTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin: 0 0 15px;
  color: #fff;
`;

export const AdvantageText = styled.p`
  font-size: 21px;
  line-height: 25px;
  color: #fff;
`;

export const FooterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 90px 0;
`;

export const FooterTitle = styled.p`
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #446800;
  margin: 0 0 30px;

  @media screen and (max-width: 420px) {
    font-size: 35px;
    line-height: 40px;
  }

  @media screen and (max-width: 340px) {
    font-size: 30px;
    line-height: 35px;
  }
`;

export const FooterCopy = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #446800;
  text-transform: uppercase;
  margin: 0 0 30px;
  border-top: 1px solid #446800;
  padding: 5px;

  @media screen and (max-width: 420px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media screen and (max-width: 340px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

export const FooterText = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #446800;
  margin-bottom: 90px;

  @media screen and (max-width: 420px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media screen and (max-width: 340px) {
    font-size: 16px;
    line-height: 20px;
  }
`;
