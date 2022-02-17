import React, {
  useEffect,
  useRef,
  DragEvent,
  ClipboardEvent,
  FormEvent,
} from "react";
import uploadImage from "../api/image";
import useApi from "../hooks/api";
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
  imageUploadable,
}: ITextareaProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const { current: element } = textarea;

    if (!element) {
      return;
    }

    const { scrollY } = window;

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    window.scrollTo(0, scrollY);
  };

  const handleChange = (event: FormEvent) => {
    const { target } = event;

    if (!(target instanceof HTMLTextAreaElement) || !setValue) return;

    setValue(target.value);
  };

  const handleUpload = async ({
    originalName,
    apiRequest,
  }: {
    originalName: string;
    apiRequest: ReturnType<typeof uploadImage>;
  }) => {
    const { current: element } = textarea;

    if (!element) {
      return;
    }

    const response = await useApi(apiRequest);

    if (!response) {
      return;
    }

    const { selectionStart } = element;
    const currentValue = value || element.value;
    const beforeCarrot = currentValue.substring(0, selectionStart);
    const afterCarrot = currentValue.substring(selectionStart);
    const valueToUpdate = `${beforeCarrot}${
      beforeCarrot.length === 0 ? "" : "\n"
    }![${originalName}](${response.fileName})\n${afterCarrot}`;

    if (setValue) {
      setValue(valueToUpdate);
    } else {
      element.value = valueToUpdate;
    }
  };

  const uploadFiles = (files: Array<File>) => {
    files
      .map((file) => ({
        originalName: file.name,
        apiRequest: uploadImage(file),
      }))
      .forEach(handleUpload);
  };

  const handleDrop = (event: DragEvent) => {
    if (!imageUploadable) {
      return;
    }

    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (!files) {
      return;
    }

    uploadFiles([...files]);
  };

  const handlePaste = (event: ClipboardEvent) => {
    if (!imageUploadable) {
      return;
    }

    const files = event.clipboardData?.files;

    if (!files) return;

    uploadFiles([...files]);
  };

  const preventDefault = (event: DragEvent) => {
    event.preventDefault();
  };

  useEffect(resize, [value, textarea.current?.value]);

  return (
    <div
      className={formatClassName(
        "input",
        imageUploadable && "input--image-uploadable"
      )}
    >
      <textarea
        id={id}
        name={id}
        className={formatClassName(
          "input__input",
          imageUploadable && "input__input--image-uploadable",
          className
        )}
        placeholder=" "
        cols={cols || 4}
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
        onDrop={handleDrop}
        onPaste={handlePaste}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
        onDragOver={preventDefault}
      />
      {imageUploadable && (
        <label htmlFor="image" className="input__upload">
          <input
            id="image"
            type="file"
            hidden
            multiple
            onChange={(event) => {
              const { files } = event.target;

              if (!files) return;

              uploadFiles([...files]);
            }}
          />
          <i
            className="icon-file_upload"
            role="img"
            aria-label="이미지 업로드"
            title="이미지 업로드"
          />
        </label>
      )}
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
