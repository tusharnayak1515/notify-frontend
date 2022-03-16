import React, { useState } from "react";
import DatePicker from 'react-modern-calendar-datepicker';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styles from "./calender.module.css";

const Calender = () => {
    const currentDate = new Date();
    const defaultValue = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()+1,
        day: currentDate.getDate(),
      };
    const [startDate, setStartDate] = useState(defaultValue);
  return (
    <div className={styles.calender}>
      <DatePicker
        value={startDate}
        onChange={setStartDate}
        inputPlaceholder="Select a day"
        shouldHighlightWeekends
      />
    </div>
  );
};

export default Calender;
