import styled from 'styled-components/macro';
import { Avatar, Collapse, Tabs, Image } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const { Panel } = Collapse;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  height: 70px;
  background: #446800;
  align-items: center;
  justify-content: center;
`;

export const TitlePage = styled.h1`
  font-size: 27px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

// export const Image = styled.img`
//   width: 300px;
//   height: 300px;
//   margin-bottom: 40px;
//   margin-top: 40px;
// `;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabsStyled = styled(Tabs)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #363636;

  .ant-tabs-ink-bar {
    border-bottom: 2px solid #446800;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #446800;
  }
`;

export const TabPaneStyled = styled(TabPane)``;

export const AvatarStyled = styled(Avatar)`
  margin-bottom: 2.5vh;
  margin-top: 2.5vh;
  max-width: 300px;
  max-height: 300px;
  height: 30vh;
  width: 30vh;

  @media screen and (max-width: 700px) {
    height: 20vh;
    width: 20vh;
  }
`;

export const TitlePanel = styled.h1`
  font-weight: bold;
  font-size: 28px;
  line-height: 33px;
  color: #222;
  margin-left: 20px;

  @media screen and (max-width: 570px) {
    font-size: 21px;
    line-height: 25px;
  }

  @media screen and (max-width: 470px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media screen and (max-width: 380px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const SubtitlePanel = styled.h1`
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  color: #222;
  margin-left: 20px;

  @media screen and (max-width: 570px) {
    font-size: 19px;
    line-height: 25px;
  }

  @media screen and (max-width: 470px) {
    font-size: 16px;
    line-height: 21px;
  }

  @media screen and (max-width: 380px) {
    font-size: 13px;
    line-height: 16px;
  }
`;

export const ContentPanel = styled.div`
  width: calc(90vw - 300px);
  height: 100%;
  position: relative;
  left: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  @media screen and (max-width: 770px) {
    width: calc(90vw - 200px);
  }

  @media screen and (max-width: 550px) {
    width: calc(90vw - 150px);
  }

  @media screen and (max-width: 400px) {
    width: calc(90vw - 120px);
  }
`;

export const HeaderPanel = styled.div`
  width: 90vw;
  min-width: 300px;
  padding: 0px;
  height: 300px;
  background: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;

  @media screen and (min-width: 1420px) {
    width: 1120px;
  }

  @media screen and (max-width: 1420px) {
    height: 250px;
  }

  @media screen and (max-width: 770px) {
    height: 200px;
  }

  @media screen and (max-width: 550px) {
    height: 150px;
  }

  @media screen and (max-width: 420px) {
    height: 100px;
  }
`;

export const ImagePanel = styled.img`
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    top: 0;
    left: 0;
    padding: 0;
  }
  height: 100%;
  width: 300px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  @media screen and (max-width: 770px) {
    width: 200px;
  }

  @media screen and (max-width: 550px) {
    width: 150px;
  }

  @media screen and (max-width: 400px) {
    width: 120px;
  }
`;

export const PanelStyled = styled(Panel)`
  border-radius: 15px;
  margin-bottom: 20px;
  background: #fff;
  @media screen and (max-width: 420px) {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 770px) {
    margin-bottom: 10px;
  }

  .ant-collapse-header {
    padding: 0px 0 10px 0 !important;
    padding-left: 0 !important;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 5px !important;
    padding-left: 5px !important;
  }
`;

export const CollapseStyled = styled(Collapse)`
  border-bottom: 0;
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding-left: 0;
  }

  .ant-collapse-borderless {
    background-color: #fff;
    border: 0;
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: 0;
  }

  .site-collapse-custom-collapse .site-collapse-custom-panel,
  .site-collapse-custom-collapse .site-collapse-custom-panel {
    padding-left: 0;
  }
`;

export const ExpandIconStyled = styled(CaretRightOutlined)`
  font-size: 20px !important;
  bottom: 20px;

  @media screen and (min-width: 1420px) {
    font-size: 24px !important;
  }

  @media screen and (max-width: 1420px) {
    font-size: 22px !important;
  }

  @media screen and (max-width: 770px) {
    font-size: 20px !important;
  }

  @media screen and (max-width: 550px) {
    font-size: 18px !important;
  }

  @media screen and (max-width: 420px) {
    font-size: 16px !important;
  }
`;

interface BackgroundProps {
  src: string;
}

export const Background = styled.div<BackgroundProps>`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  padding: 8px;
  max-height: 380px;
  height: 35vh;
  width: 100vw;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 700px) {
    height: 25vh;
  }

  display: none;

  &.active {
    display: block !important;
  }
`;

export const ImageStyled = styled(Image)`
  max-width: 300px;
  max-height: 300px;
  height: 30vh;
  width: 30vh;

  @media screen and (max-width: 700px) {
    height: 20vh;
    width: 20vh;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 131px;
  background-color: rgba(0, 0, 0, 0.3);
  max-height: 380px;
  height: 35vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 700px) {
    height: 25vh;
  }
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  line-height: 33px;
  color: #000;
  margin-bottom: 50px;

  @media screen and (max-width: 570px) {
    font-size: 21px;
    line-height: 25px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 470px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media screen and (max-width: 380px) {
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
  }
`;

export const Text = styled.p`
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  color: #000;
  margin: 0;

  @media screen and (max-width: 570px) {
    font-size: 14px;
    line-height: 21px;
  }

  @media screen and (max-width: 470px) {
    font-size: 12px;
    line-height: 16px;
  }

  @media screen and (max-width: 380px) {
    font-size: 10px;
    line-height: 14px;
  }
`;

export const Label = styled.p`
  font-weight: bold;
  font-size: 21px;
  line-height: 25px;
  color: #000;
  margin-right: 10px;

  @media screen and (max-width: 570px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media screen and (max-width: 470px) {
    font-size: 14px;
    line-height: 16px;
    margin-right: 5px;
  }

  @media screen and (max-width: 380px) {
    font-size: 11px;
    line-height: 14px;
    margin-right: 5px;
  }
`;

export const TextInformation = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #000;
  margin-right: 5px;
`;

export const LabelInformation = styled.p`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  margin-right: 5px;
`;

export const Line = styled.div`
  width: 100vw;
  height: 2px;
  background-color: #000;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ContainerInformation = styled.div`
  margin-top: 30px;
`;

export const SlideShow = styled.div`
  max-width: 1000px;
  position: absolute;
  top: 131px;
  margin: auto;
`;

export const MySlides = styled.div`
  display: none;

  &.active {
    display: block !important;
  }
`;

export const ButtonPrev = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  width: auto;
  margin-top: -20px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 380px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media screen and (max-width: 700px) {
    height: 25vh;
  }
`;

export const ButtonNext = styled.div`
  border-radius: 3px 0 0 3px;
  cursor: pointer;
  position: absolute;
  right: 0;
  width: auto;
  margin-top: -20px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  user-select: none;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 380px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  @media screen and (max-width: 700px) {
    height: 25vh;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 66px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  width: 200px;
  margin: 5px;
`;

export const ItemTitle = styled.p`
  margin: 0 10px 0 0;
  padding: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
  padding: 10px 20px;
  border-radius: 2px;
  margin-bottom: 5px;
  margin-top: 15px;
  border-radius: 5px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
