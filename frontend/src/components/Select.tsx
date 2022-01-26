import { useState } from "react";
import "./Select.css";

export default function Select({ id, list }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectItem>(
    list.find((x) => x.selected) || list[0]
  );

  return (
    <div
      className={`select${open ? " select--open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <input type="hidden" id={id} value={selected.key} />
      <div className="select__title">{selected.name}</div>
      <ul className="select__list">
        {list.map(({ key, name }) => (
          <li key={key} value={key} onClick={() => setSelected({ key, name })}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
