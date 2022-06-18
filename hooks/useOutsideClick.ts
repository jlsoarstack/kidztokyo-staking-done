import { useEffect } from "react";

const useOutsideClick = (ref: any, onClickOutside: any) => {
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keypress", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keypress", handleClickOutside);
    };
  });
};

export default useOutsideClick;
