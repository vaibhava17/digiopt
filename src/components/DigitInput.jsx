import React, { forwardRef } from "react";

const DigitInput = forwardRef((props, ref) => {
  const { value, onChange, name, id, onKeyDown, ...rest } = props;
  return (
    <input
      ref={ref}
      className="inputClass"
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
});

export default DigitInput;
