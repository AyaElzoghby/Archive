export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateWithHours = (dateString) => {
  const date = new Date(dateString);

  // Format day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Format hours and minutes with AM/PM
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format, with 12 being the hour for midnight/noon

  return `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`;
};

export const handleDropdownFormat = (data, key, label) => {
  return data.map((item) => {
    return {
      value: item[key],
      label: item[label],
    };
  });
};

export const handleFormChange = (e, setForm) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleSelectChange = (option, optionValue, setForm, name) => {
  setForm((prev) => ({
    ...prev,
    [name]: option[optionValue],
  }));
};

export const handleDateFormat = (date) => {
  // console.log("handleDateFormat", date);
  return date ? date?.split("T")[0] : "";
};

export const buildTree = (data, parentId = null, parentKeyName, keyName) => {
  return data
    .filter((item) => item[parentKeyName] === parentId)

    .map((item) => ({
      ...item,
      children: buildTree(data, item[keyName], parentKeyName, keyName),
    }));
};

export const validationFunction = (row, tableConfig, toast) => {
  let flag = true;
  // console.log(row);
  for (let i = 0; i < tableConfig.length; i++) {
    if (tableConfig[i].isRequired && !tableConfig[i] !== false) {
      if (!row[tableConfig[i].keyName]) {
        toast.error(`${tableConfig[i].arCaption} يجب ملئ الحقل`);
        flag = false;
        return;
      }
    }
  }
  return flag;
};

export const getInitialValue = (key, isSys) => {
  const storedValue = localStorage.getItem(key);
  return storedValue
    ? JSON.parse(storedValue)
    : isSys
    ? { value: 21, label: "(21) اداره الاصول" }
    : {};
};

// export const handleCruds = (row, flag) => {
//   return;
//   {
//     ins;
//   }
// };
