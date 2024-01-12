import styles from "styled-components";
import { FloatButton, Input, List } from "antd";

export const StyledTitle = styles.div`
  display: flex;
  justify-content: center;
`;

export const StyledFooter = styles.div`
`;

export const StyledCreateTaskInputWrapper = styles.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const StyledCreateTaskInput = styles(Input)`
  font-size: 48px;
  padding-left: 0px;
  padding-right: 0px;
`;

export const StyledListWrapper = styles.div`

`;

export const StyledScrollableDiv = styles.div`
  height: 100%;
  overflow-y: scroll;
`;

export const StyledListItem = styles(List.Item)`
  display: flex;
  flex-wrap: nowrap;
  font-size: 32px;
  width: 100%;

  .ant-typography-edit-content {
    flex-grow: 1;
    inset-inline-start: unset;
    margin-top: unset;
    margin-bottom: unset
  }
`;

export const StyledNavButton = styles.div`
  a.active {
    button {
      color: #fff;
    }

    button.active {
      background: #c0392b;
    }

    button.completed {
      background: #2ecc71;
    }

    button.all {
      background: #1677ff;
    }
  }

  a {
    button {
      background: #dfe6e9;
      color: #000;

    }
    
    &:hover {
        button.active {
          background: #c0392b !important;
        }
    
        button.completed {
          background: #2ecc71 !important;
        }
    
        button.all {
          background: #1677ff !important;
        }
    }
  
  }
`;

export const StyledList = styles(List)`
  background: #fff;
  width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 425px) {
    width: 350px;
    border: none;
  }

  .ant-spin-container {
    overflow: auto;
    max-height: calc(100vh - 340px);
  }
`;

export const StyledFloatButton = styles(FloatButton)`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 70px;
  height: 70px;
`;
