import React, { useState } from "react";

export const useToggle = (initialState) => {
  const [toggle, setToggle] = useState(initialState);

  function change(value) {
    setToggle(value);
  }

  return [toggle, setToggle];
};
