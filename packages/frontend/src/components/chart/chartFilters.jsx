import React, { useState } from 'react';
import Select from 'react-select';

import { selectStyles } from './chartFiltersStyles';
import './chartFilters.scss';

const currentMonth = new Date().getMonth() + 1;
const months = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i).toLocaleString('en-US', { month: 'long' });
});

const monthOptions = Array(12)
  .fill(null)
  .map((item, index) => ({ value: index + 1, label: months[index] }));

const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 1940; i--) {
  years.push({ value: i, label: i.toString() });
}

export function ChartFilters() {
  const [date, setDate] = useState({
    month: currentMonth,
    year: currentYear,
  });

  const updateDate = (name, value) => {
    setDate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="selectContainer">
      <Select
        styles={selectStyles}
        options={monthOptions}
        placeholder="Month"
        onChange={(option) => {
          updateDate('month', option.value);
        }}
        isSearchable={false}
        defaultValue={monthOptions.find((month) => month.value === date.month)}
      />
      <Select
        styles={selectStyles}
        options={years}
        placeholder="Year"
        onChange={(option) => {
          updateDate('year', option.value);
        }}
        isSearchable={false}
        defaultValue={years.find((year) => year.value === date.year)}
      />
    </div>
  );
}
