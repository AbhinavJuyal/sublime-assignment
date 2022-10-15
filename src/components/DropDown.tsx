import { CaretCircleDown } from "phosphor-react";
import { useState } from "react";

interface IDropDown {
  options: string[];
  value: string;
  setValue: SetState<string>;
}

const DropDown = ({ options, value, setValue }: IDropDown) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setVisible(true);
  };

  const changeValue: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("change");
    const newVal = (e.target as HTMLDivElement).innerHTML;
    const classes = (e.target as HTMLDivElement).className;
    if (
      newVal === undefined ||
      newVal === "" ||
      !classes.includes("drop-down-option")
    )
      return;
    setValue(newVal);
    setVisible(false);
  };

  return (
    <div className="relative max-w-xs border-2 border-primary rounded-lg">
      <div className="w-full h-full flex justify-between items-center">
        <input
          readOnly
          value={value}
          onFocus={onFocus}
          className="font-bold w-full h-full px-2 py-2 rounded-lg text-ellipsis"
        />
        <div className="pr-2">
          <CaretCircleDown size={24} weight="fill" className="text-primary" />
        </div>
      </div>
      <div
        onClick={changeValue}
        className={`default-shadow absolute top-[calc(100%_+_8px)] w-full bg-white rounded-lg ${
          visible ? "visible" : "invisible"
        }`}
      >
        {options.map((option, idx) => (
          <div
            key={idx}
            className="drop-down-option font-semibold text-base px-5 py-4 hover:bg-gray-200 active:bg-gray-400"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
