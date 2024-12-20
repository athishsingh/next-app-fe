import React, { useRef, useEffect } from "react";
import styles from "./textarea.module.scss";

const Textarea = ({
  value,
  label,
  placeholder,
  disabled = false,
  onChange,
}: {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={`${styles["text__area-con"]}`}>
      {label && <div className={`${styles["input-label"]}`}>{label}</div>}
      <textarea
        ref={textareaRef}
        className={`${styles["text__area"]}`}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
