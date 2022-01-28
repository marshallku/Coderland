import React, { useEffect, useRef } from "react";
import "./Input.css";

export function Input(props: InputProps) {
  const { id, label, type, required, value, setValue } = props;

  const handleChange = (event: React.FormEvent) => {
    const { target } = event;

    if (!(target instanceof HTMLTextAreaElement) || !setValue) return;

    setValue(target.value);
  };

  return (
    <div className="input">
      <input
        id={id}
        className={`input__input ${props.className || ""}`}
        type={type || "text"}
        placeholder=" "
        accept={props.accept}
        alt={props.alt}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        capture={props.capture}
        checked={props.checked}
        disabled={props.disabled}
        form={props.form}
        list={props.list}
        max={props.max}
        maxLength={props.maxLength}
        min={props.min}
        minLength={props.minLength}
        multiple={props.multiple}
        name={props.name}
        pattern={props.pattern}
        readOnly={props.readOnly}
        required={props.required}
        aria-label={props.label}
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

export function Textarea(props: TextareaProps) {
  const { id, label, required, value, setValue } = props;
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

    console.log(target.value);

    setValue(target.value);
  };

  useEffect(resize, []);

  return (
    <div className="input">
      <textarea
        id={id}
        className={`input__input ${props.className || ""}`}
        placeholder=" "
        autoFocus={props.autoFocus}
        cols={props.cols}
        maxLength={props.maxLength}
        minLength={props.minLength}
        required={props.required}
        wrap={props.wrap}
        aria-label={props.label}
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
