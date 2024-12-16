import React, { Children, useEffect } from "react";

function TabContent({ globalParams = null, children }) {
	const childrenArray = Children.toArray(children);

	console.log(globalParams, "globalParams");
	console.log(childrenArray, "childrenArray");
	useEffect(() => {
		console.log(globalParams, "childrenArray");
	}, [globalParams]);
	const tableName = ["NestedTable", "LocalGrid", "MainGrid"];
	return (
		<>
			{childrenArray.map((child, index) => {
				console.log(child.type.name);
				
				return tableName.includes(child.type.name) && globalParams
					? React.cloneElement(child, {
							globalParams,
					  })
					: child;
			})}
		</>
	);
}

export default TabContent;
