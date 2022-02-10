import { useEffect, useRef, useState } from "react";
import formatClassName from "../utils/formatClassName";
import "./Select.css";

export default function Select({ id, list, cb }: ISelectProps) {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<ISelectItem>(
    list.find((x) => x.selected) || list[0]
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    const { current } = containerRef;
    const { target } = event;

    if (!current || !(target instanceof Node)) {
      return;
    }

    if (!current.contains(target)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      onBlur={() => setOpened(false)}
      className={formatClassName("select", opened && "select--open")}
      ref={containerRef}
    >
      <input type="hidden" id={id} name={id} value={selected.key} />
      <button
        type="button"
        className="select__title"
        onClick={() => setOpened(!opened)}
      >
        {selected.name}
      </button>
      <ul className="select__list">
        {list.map(({ key, name }) => (
          <li key={key}>
            <button
              type="button"
              value={key}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setOpened(false);
                setSelected({ key, name });
                cb?.({ key, name });
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
