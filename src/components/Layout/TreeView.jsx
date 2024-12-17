/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Archive from "../../../public/assets/Archive.svg";
import { SideMenuContext } from "../../store/SideMenuContext";

const TreeNode = ({
  node,
  ParentId,
  Id,
  NodeName,
  childNodes,
  depth,
  expandedNodes,
  handleToggleExpand,
}) => {
  const navigate = useNavigate();

  const { pageNameHandler, languageValue } = useContext(SideMenuContext);

  // console.log(node[NodeName], route);

  // console.log(expandedNodes[depth], node[Id]);

  const isExpanded = expandedNodes[depth] === node[Id];
  // console.log(expandedNodes);

  // Define CSS classes directly for hover effects
  const spanClass = `flex items-center gap-3 w-fit text-[#2B2B2B] rounded-lg hover:cursor-pointer duration-500 ease-in-out transform ${
    languageValue === 1
      ? "hover:-translate-x-2 pr-2"
      : "hover:translate-x-2 pl-2"
  } `;
  const activeClass = `flex items-center gap-3 w-fit rounded-lg cursor-pointer transform ${
    languageValue === 1 ? "-translate-x-2" : "translate-x-2"
  }`;

  const hiddenUlClass = `max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out`;
  const displayedUlClass = `max-h-[1000px] opacity-100 overflow-visible transition-all duration-500 ease-in-out`;

  const hasChildren = childNodes.length > 0;

  let content = "";

  //   console.log(path, route, chosenNode);

  if (hasChildren) {
    content = (
      <>
        <div
          className={isExpanded ? activeClass : spanClass}
          onClick={() => handleToggleExpand(node[Id], depth)}
        >
          <img src={Archive} width={20} alt="listIcon" />
          <span className="w-[190px] font-semibold text-sm font-tajawal">
            {node[NodeName]}
          </span>
          {/* <svg
            className={`${isExpanded ? "rotate-180" : "rotate-0"} duration-500`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-current hover:text-white text-[#227099] duration-500"
              d="M16.6925 7.94254L10.4425 14.1925C10.3845 14.2506 10.3156 14.2967 10.2397 14.3282C10.1638 14.3597 10.0825 14.3758 10.0003 14.3758C9.91821 14.3758 9.83688 14.3597 9.76101 14.3282C9.68514 14.2967 9.61621 14.2506 9.55816 14.1925L3.30816 7.94254C3.19088 7.82526 3.125 7.6662 3.125 7.50035C3.125 7.3345 3.19088 7.17544 3.30816 7.05816C3.42544 6.94088 3.5845 6.875 3.75035 6.875C3.9162 6.875 4.07526 6.94088 4.19253 7.05816L10.0003 12.8668L15.8082 7.05816C15.8662 7.00009 15.9352 6.95403 16.011 6.9226C16.0869 6.89117 16.1682 6.875 16.2503 6.875C16.3325 6.875 16.4138 6.89117 16.4897 6.9226C16.5655 6.95403 16.6345 7.00009 16.6925 7.05816C16.7506 7.11623 16.7967 7.18517 16.8281 7.26104C16.8595 7.33691 16.8757 7.41823 16.8757 7.50035C16.8757 7.58247 16.8595 7.66379 16.8281 7.73966C16.7967 7.81553 16.7506 7.88447 16.6925 7.94254Z"
            />
          </svg> */}
        </div>

        <ul className={isExpanded ? displayedUlClass : hiddenUlClass}>
          {childNodes.map((childNode) => (
            <TreeNode
              key={childNode[Id]}
              node={childNode}
              ParentId={ParentId}
              Id={Id}
              NodeName={NodeName}
              childNodes={childNode.childNodes || []}
              depth={depth + 1}
              expandedNodes={expandedNodes}
              handleToggleExpand={handleToggleExpand}
            />
          ))}
        </ul>
      </>
    );
  } else {
    content = (
      <ul
        onClick={() => {
          navigate(`/Document/${node[Id]}`);
          pageNameHandler(node[NodeName]);
        }}
        className={` w-full rounded flex gap-2 text-sm font-medium font-tajawal py-2 ${
          languageValue === 1 ? "pr-2" : "pl-2"
        } text-[#227099] cursor-pointer  duration-500 ease-in-out ${
          languageValue === 1 ? "hover:-translate-x-2" : "hover:translate-x-2"
        } `}
      >
        <img src={Archive} width={14} alt="nestedIcon" />
        <li>{node[NodeName]}</li>
      </ul>
    );
  }

  return <li className="flex flex-col">{content}</li>;
};

const buildTree = (ParentId, Id, data) => {
  const rootNodes = data.filter((node) => node[ParentId] === null);
  const childrenNodes = data.filter((node) => node[ParentId] !== null);

  const ChildrenToMap = (parentNode) => {
    const Children = childrenNodes.filter(
      (childNode) => childNode[ParentId] === parentNode[Id]
    );

    return Children.map((childNode) => ({
      ...childNode,
      childNodes: ChildrenToMap(childNode),
    }));
  };

  return rootNodes.map((rootNode) => ({
    ...rootNode,
    childNodes: ChildrenToMap(rootNode),
  }));
};

function TreeView({ ParentId, Id, NodeName, data }) {
  const [expandedNodes, setExpandedNodes] = useState({});

  const handleToggleExpand = (nodeId, depth) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [depth]: prev[depth] === nodeId ? null : nodeId, // Only allow one expanded node per depth
    }));
  };

  console.log(data);

  const treeData = buildTree(ParentId, Id, data);

  console.log(treeData);

  return (
    <ul className="list-none">
      {treeData.map((node) => (
        <TreeNode
          key={node[Id]}
          ParentId={ParentId}
          Id={Id}
          NodeName={NodeName}
          node={node}
          childNodes={node.childNodes || []}
          depth={0}
          expandedNodes={expandedNodes}
          handleToggleExpand={handleToggleExpand}
        />
      ))}
    </ul>
  );
}

export default TreeView;
