import React from "react";
import moment from "moment-timezone";
import "moment/locale/fr";
import { colors } from "../utils/constants";
moment.locale("fr");

const computeDate = date => {
  if (parseInt(date)) {
    return moment(new Date(parseInt(date))).format("dddd Do  MMMM YYYY");
  }
  return moment(date).format("dddd Do  MMMM YYYY");
};
function DisplayDate({ date }) {
  return (
    <span style={{ textAlign: "center", color: colors.VIOLET }}>
      {computeDate(date)}
    </span>
  );
}

export default DisplayDate;
