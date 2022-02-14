import React, { useEffect, useRef } from "react";
import formatClassName from "../utils/formatClassName";
import "./Input.css";

export function Input({
  id,
  label,
  className,
  type,
  required,
  accept,
  alt,
  autoComplete,
  capture,
  checked,
  disabled,
  form,
  list,
  max,
  maxLength,
  min,
  minLength,
  multiple,
  name,
  pattern,
  readOnly,
  hideLabelOnFocus,
  value,
  setValue,
  onKeyDown,
  onChange,
}: IInputProps) {
  const handleChange = (event: React.FormEvent) => {
    const { target } = event;

    if (!(target instanceof HTMLInputElement) || !setValue) return;

    setValue(target.value);
  };

  return (
    <div className="input">
      <input
        id={id}
        name={name}
        className={formatClassName("input__input", className)}
        type={type || "text"}
        placeholder=" "
        accept={accept}
        alt={alt}
        autoComplete={autoComplete}
        capture={capture}
        checked={checked}
        disabled={disabled}
        form={form}
        list={list}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        multiple={multiple}
        pattern={pattern}
        readOnly={readOnly}
        required={required}
        aria-label={label}
        value={value}
        onChange={(event) => {
          onChange?.(event);
          handleChange(event);
        }}
        onKeyDown={onKeyDown}
      />
      <label
        htmlFor={id}
        className={formatClassName(
          "input__label",
          hideLabelOnFocus && "input__label--hide"
        )}
      >
        {label}
        {!!required && " *"}
      </label>
    </div>
  );
}

export function Textarea({
  id,
  label,
  required,
  className,
  cols,
  maxLength,
  minLength,
  wrap,
  hideLabelOnFocus,
  value,
  setValue,
}: ITextareaProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const { current: element } = textarea;
    if (!element) return;
    const { scrollY } = window;

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    window.scrollTo(0, scrollY);
  };

  const handleChange = (event: React.FormEvent) => {
    const { target } = event;
    resize();

    if (!(target instanceof HTMLTextAreaElement) || !setValue) return;

    setValue(target.value);
  };

  useEffect(resize, []);

  return (
    <div className="input">
      <textarea
        id={id}
        name={id}
        className={formatClassName("input__input", className)}
        placeholder=" "
        cols={cols}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        wrap={wrap}
        aria-label={label}
        ref={textarea}
        onKeyDown={resize}
        onKeyUp={resize}
        value={value}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={formatClassName(
          "input__label",
          hideLabelOnFocus && "input__label--hide"
        )}
      >
        {label}
        {!!required && " *"}
      </label>
    </div>
  );
}
