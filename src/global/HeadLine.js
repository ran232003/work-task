import React from "react";
import "./global.css";
const HeadLine = (props) => {
  const { title, subTitle, cssClass, subTitleClass, titleClass } = props;
  return (
    <div className={cssClass}>
      <h1 className={titleClass}>{title}</h1>
      <p className={subTitleClass}>{subTitle}</p>
    </div>
  );
};

export default HeadLine;
