export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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
      if (
        row[
          tableConfig[i].keyName === "" || row[tableConfig[i].keyName] === null
        ] ||
        row[tableConfig[i].keyName] === undefined
      ) {
        toast.error(`${tableConfig[i].arCaption} يجب ملئ الحقل`);
        flag = false;
        return;
      }
    }
  }
  return flag;
};

export const getInitialValue = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : {};
};

export const handleInlineDropdownFormat = (data, key, label, inlineKey) => {
  return data.map((item) => {
    return {
      value: item[key],
      label: item[label],
      inlineKey: item[inlineKey],
    };
  });
};
