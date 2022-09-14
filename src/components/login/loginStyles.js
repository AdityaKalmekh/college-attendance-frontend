/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import backgroundImage from "../../assets/images/Bg.png";

export const loginBackgroundImage = css`
  background-image: url(${backgroundImage});
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const loginSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vh;
  min-height: 100vh;
`;

export const loginSectionContainer = css`
  position: relative;
  width: 800px;
  height: 500px;
  background: #fff;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
`;

export const userContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const userContainerImageBox = css`
  position: relative;
  width: 50%;
  height: 100%;
  background: #fff;
  transition: 0.5s;
  border-right: 5px solid;
`;

export const userContainerImage = css`
  border-radius: 0;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
`;

export const formContainer = css`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
`;
export const fieldsFormContainer = css`
  padding: 20px;
  text-align: center;
`;
export const loginButtonBox = css`
  text-align: center;
`;
export const loginButtonWidth = css`
  width: 200px;
`;
