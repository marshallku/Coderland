import { useState } from "react";
import "./Select.css";

export default function Select({ id, list }: ISelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ISelectItem>(
    list.find((x) => x.selected) || list[0]
  );

  return (
    <div className={`select${open ? " select--open" : ""}`}>
      <input type="hidden" id={id} value={selected.key} />
      <button
        type="button"
        className="select__title"
        onClick={() => setOpen(!open)}
      >
        {selected.name}
      </button>
      <ul className="select__list">
        {list.map(({ key, name }) => (
          <li>
            <button
              type="button"
              key={key}
              value={key}
              onClick={() => {
                setOpen(false);
                setSelected({ key, name });
              }}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
