/* eslint-disable react/prop-types */
import { MainInput, DropDown } from "../../../components";
import Checkbox from "../../../components/Inputs/CheckBox";
import { formatDate } from "../utilities/functions";

export const RenderCellContent = ({ row, item }) => {
  switch (item.type) {
    case "dropDown":
      return item.options.find((option) => option.value === row[item.keyName])
        ?.label;

    case "checkbox":
      return (
        <Checkbox
          keyName={item.keyName}
          value={row[item.keyName]}
          isEditable={false}
          onChange={() => {}}
        />
      );
    case "password":
      return "********";

    case "sub":
      return (
        <div className="flex flex-1">
          {item.children.map((child, index) => {
            const value = row[child.keyName];
            // console.log(child);

            return (
              <p
                key={index}
                className={`flex-1 text-center ${index === 0 && "border-l-2"}`}
              >
                {child.format ? child.format(value) : value}
              </p>
            );
          })}
        </div>
      );

    default: {
      const value = row[item.keyName];
      return item.format ? item.format(value) : value;
    }
  }
};

export const RenderModalContent = ({
  item,
  handleChange,
  manipulatedRow,
  enCaption,
  type,
}) => {
  if (!item?.Input) return null;

  switch (item.type) {
    case "dropDown":
      return (
        <DropDown
          key={item.keyName}
          isAtModal
          labelName={enCaption ? item.enCaption : item.arCaption}
          onChange={(value) => handleChange(item.keyName, value)}
          options={item.options}
          name={item.name}
          value={manipulatedRow[item.keyName]}
        />
      );

    case "checkbox":
      return (
        <Checkbox
          keyName={item.keyName}
          isEditable={!item.notEditable || true}
          labelName={enCaption ? item.enCaption : item.arCaption}
          title={enCaption ? item.enCaption : item.arCaption}
          onChange={(value) => handleChange(item.keyName, value)}
          value={manipulatedRow[item.keyName]}
          checkboxShape={item.shape}
        />
      );

    case "number":
      return (
        <MainInput
          key={item.keyName}
          readOnly={(item.notEditable && type === "Edit") || false}
          labelName={enCaption ? item.enCaption : item.arCaption}
          onChange={(value) => handleChange(item.keyName, value)}
          type="number"
          value={manipulatedRow[item.keyName] || ""}
        />
      );

    case "sub":
      return (
        <div key={item.keyName} className="flex flex-col w-full gap-3">
          <p className="font-semibold self-center">
            {enCaption ? item.enCaption : item.arCaption}
          </p>
          <div className="flex flex-wrap gap-4">
            {item.children?.map((child) => (
              <RenderModalContent
                key={child.keyName}
                item={child}
                handleChange={handleChange}
                manipulatedRow={manipulatedRow}
                type={type}
              />
            ))}
          </div>
        </div>
      );

    default:
      return (
        <MainInput
          key={item.keyName}
          labelName={enCaption ? item.enCaption : item.arCaption}
          onChange={(value) => handleChange(item.keyName, value)}
          readOnly={(item.notEditable && type === "Edit") || false}
          type={item.type}
          value={
            item.type === "date"
              ? formatDate(manipulatedRow[item.keyName]) || ""
              : manipulatedRow[item.keyName]
          }
        />
      );
  }
};
