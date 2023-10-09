import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerInput(props) {
  const [startDate, setStartDate] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatYearList(){
    let years = [1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
    let lastYearFromYearsList = years.slice(-1);
    let currentYear = (new Date()).getFullYear();
    if(lastYearFromYearsList[0] < currentYear){
      for(let i=lastYearFromYearsList[0]+1; i <= currentYear; i++){
        years.push(i);
      }
    }
    return years;
  }

  useEffect(()=>{
    if(startDate != null){
      let monthFormat = parseInt(startDate.getMonth())+1;
      monthFormat = monthFormat.toString().length === 1 ? '0'+monthFormat: monthFormat;
      let shortDate = startDate.getYear().toString();
      let dayFormat =  parseInt(startDate.getDate());
      dayFormat = dayFormat.toString().length === 1 ? '0'+dayFormat: dayFormat;
      let actualDate =dayFormat+"/"+monthFormat+"/"+shortDate.slice(-2);
      props.onChangeHandler(props.inputFormProperties.name,actualDate);
    }
    
  },[startDate]);
  
  return (
      <DatePicker renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {formatYearList().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )} placeholderText="dd/mm/yy" selected={startDate} dateFormat="dd/MM/yy"  onChange={(date) => setStartDate(date)}  />
  );
}
