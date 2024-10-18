import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import React from "react";

const Spinner = () => {
  return (
    <Spin
      style={{
        marginTop: "100px",
        marginLeft: "100px"
      }}
      indicator={
        <LoadingOutlined rev={''} style={{ fontSize: 48 }} spin />
      }
    />
  )
}

export default Spinner;
