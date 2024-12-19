/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { buildTree } from "./Grid/utilities";
import wordIcon from "/icons/word.svg";
import excelIcon from "/icons/excel.svg";
import pdfIcon from "/icons/pdf.svg";
import zipIcon from "/icons/zip.svg";
import rarIcon from "/icons/rar.svg";
import archieveIcon from "/assets/Archive.svg";
import { SideMenuContext } from "../store/SideMenuContext";
export default function NestedTree({
	data,
	rowKey,
	parentKeyName,
	renderElement = () => {},
	setSelectedFile = () => {},
	onParentClick = () => {},
	elementStyle = "",
}) {
	const [expandedRows, setExpandedRows] = useState([]);
	const [treeData, setTreeData] = useState([]);

	useEffect(() => {
		setTreeData(buildTree(data, null, parentKeyName, rowKey));
	}, [data]);

	const [activeRow, setActiveRow] = useState(null);

	const toggleRow = (id) => {
		setExpandedRows((prev) =>
			prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
		);
	};

	const { languageValue } = useContext(SideMenuContext);

	const renderRows = (nodes, depth = 0) => {
		return nodes.map((node) => {
			return (
				<div
					onClick={(e) => {
						e.stopPropagation();
						onParentClick(node);
						setActiveRow((prev) => {
							if (prev === node[rowKey]) {
								setSelectedFile(null);
							} else {
								setSelectedFile(node);
							}
							return prev === node[rowKey] ? null : node[rowKey];
						});
						toggleRow(node[rowKey]);
					}}
					key={node[rowKey]}
					className={`w-fit mt-2 `}>
					<div
						className={`px-4 py-2 font-tajawal  cursor-pointer hover:scale-105 duration-300 font-medium flex items-center gap-4 rounded-lg ${
							expandedRows.includes(node[rowKey]) ? "bg-[#fafafa]" : ""
						}  ${
							node[rowKey] === activeRow ? "bg-[#DfDfDf]" : ""
						} ${elementStyle}`}>
						{renderElement(node)}
					</div>
					{expandedRows.includes(node[rowKey]) && (
						<div
							style={{
								paddingLeft: languageValue == 2 ? (depth + 1) * 20 : "",
								paddingRight: languageValue == 1 ? (depth + 1) * 20 : "",
							}}
							className={`p-[${depth * 2}px]`}>
							{renderRows(node.children, depth + 1)}
						</div>
					)}
				</div>
			);
		});
	};

	return <div>{renderRows(treeData)}</div>;
}
