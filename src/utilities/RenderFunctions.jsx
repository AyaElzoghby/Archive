/* eslint-disable react/prop-types */
import { TableButton, MainInput, DropDown, DateInput } from "../components";
import Checkbox from "../components/Inputs/CheckBox";

export const RenderCellContent = ({ row, item }) => {
  switch (item.type) {
    case "dropDown":
      return (
        <div className="overflow-hidden">
          {
            item.options.find((option) => option.value === row[item.keyName])
              ?.label
          }
        </div>
      );

    case "button":
      return (
        <div className="overflow-hidden">
          {item.buttons.map((button, index) => (
            <TableButton
              style={button?.hidden(row) ? "hidden" : ""}
              key={index}
              theme={button.theme}
              onClick={() => {
                button.onClick(row);
              }}
            >
              {button.children}
            </TableButton>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className=" overflow-hidden">
          <Checkbox
            keyName={item.keyName}
            value={row[item.keyName]}
            isEditable={false}
            onChange={() => {}}
          />
        </div>
      );

    case "password":
      return <div>********</div>;

    case "sub":
      return (
        <div className="flex overflow-hidden">
          {item.children.map((child, index) => {
            const value = row[child.keyName];
            return (
              <p
                key={index}
                className={`flex-1 ${
                  index === item.children.length - 1 && "border-l-2"
                }`}
              >
                {child.format ? child.format(value) : value}
              </p>
            );
          })}
        </div>
      );

    default: {
      const value = row[item.keyName];
      return (
        <div className="overflow-hidden">
          {item.format ? item.format(value) : value}
        </div>
      );
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

  const validateNumber = (value) => {
    if (item.type !== "number" || value === ""); 
    const numValue = parseFloat(value);
    const minValid = item.from !== undefined ? numValue >= item.from : true;
    const maxValid = item.to !== undefined ? numValue <= item.to : true;
    return minValid && maxValid;
  };

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

    // case "number":
    //   return (
    //     <MainInput
    //       key={item.keyName}
    //       readOnly={(item.notEditable && type === "Edit") || false}
    //       labelName={enCaption ? item.enCaption : item.arCaption}
    //       onChange={(value) => handleChange(item.keyName, value)}
    //       type="number"
    //       value={manipulatedRow[item.keyName] || ""}
    //     />
    //   );

    case "number":
      return (
        <div key={item.keyName} className="flex flex-col flex-1">
          <MainInput
            key={item.keyName}
            readOnly={(item.notEditable && type === "Edit") || false}
            labelName={enCaption ? item.enCaption : item.arCaption}
            onChange={(value) => {
              const isValid = validateNumber(value);
              if (isValid) {
                handleChange(item.keyName, value);
              }
            }}
            type="number"
            value={manipulatedRow[item.keyName] || ""}
            placeholder={item.placeholder?`ادخل قيمه بين ${item.from} و ${item.to}`:""}
            from={item.from}
            to={item.to}
          />
        </div>
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

    case "date":
      return (
        <DateInput
          key={item.keyName}
          labelName={enCaption ? item.enCaption : item.arCaption}
          onChange={(value) => handleChange(item.keyName, value)}
          value={manipulatedRow[item.keyName] || ""}
        />
      );

    default:
      return (
        <MainInput
          key={item.keyName}
          labelName={enCaption ? item.enCaption : item.arCaption}
          onChange={(value) => handleChange(item.keyName, value)}
          readOnly={(item.notEditable && type === "Edit") || false}
          type={item.type}
          value={manipulatedRow[item.keyName] || ""}
        />
      );
  }
};
