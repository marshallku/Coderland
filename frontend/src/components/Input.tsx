import React, { useEffect, useRef } from "react";
import "./Input.css";

export function Input(props: IInputProps) {
  const {
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
    value,
    setValue,
  } = props;

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
        className={`input__input ${className || ""}`}
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
        onChange={handleChange}
      />
      <label htmlFor={id} className="input__label">
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}

export function Textarea(props: ITextareaProps) {
  const {
    id,
    label,
    required,
    className,
    cols,
    maxLength,
    minLength,
    wrap,
    value,
    setValue,
  } = props;
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
        className={`input__input ${className || ""}`}
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
      <label htmlFor={id} className="input__label">
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}
