import React from "react";

const MySelect = ({options, defaultValue, onChange}) => {

  return (
    <select style={{backgroundColor: '#ffc107', borderColor: '#ffc107', cursor: 'pointer', height: '40px', borderRadius: '0.25rem'}}
       value='' onChange={event => onChange(event.target.value)}>
          <option disabled value="">{defaultValue}</option> 
          {options.map(option => {
            return  <option key={option.value} value={option.value}>{option.name}</option> 
          })}
      </select>

  )
}

export default MySelect;
