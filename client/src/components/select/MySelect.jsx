import React from "react";

const MySelect = ({options, defaultValue, value, onChange, defaultValue2}) => {
  console.log(options)
  return ( <>
    <select style={{backgroundColor: '#ffc107', borderColor: '#ffc107', cursor: 'pointer', height: '40px', borderRadius: '0.25rem'}}
       value={value} onChange={event => onChange(event.target.value)}>
         <option disabled value="">{defaultValue}</option> 
          {options.map(option => {
            return  <option key={option.id} value={option.name}>{option.name}</option> 
          })}
          <option value="newLoc">{defaultValue2}</option>
      </select>
    </>
  )
}

export default MySelect;
