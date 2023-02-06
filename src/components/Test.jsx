import React from "react";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import HomeTemplateMobile from "../templates/HomeTemplate/HomeTemplateMobile";
import ReponsiveItem from "./ReponsiveItem";

const Test = () => {
  return (
    <ReponsiveItem
      component={HomeTemplate}
      componentMobile={HomeTemplateMobile}
    />
  );
};

export default Test;
