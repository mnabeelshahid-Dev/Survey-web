import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DobPickerProps {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

const DobPicker: React.FC<DobPickerProps> = React.memo(
  ({ selectedDate, handleDateChange }) => {
    console.log('selectedDateselectedDate s', selectedDate)
    return (
      <div>
        <label className="block mb-2 text-lg font-medium">Date of Birth</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          placeholderText="Select Date"
          maxDate={new Date(2006, 11, 31)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    );
  }
);

export default DobPicker;
