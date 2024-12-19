import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export default function Viewer({ link }) {
	const docs = [
		{ uri: "https://isis-eg.com:8511/uploads/document/1734263909885-0.pdf" }, // Remote file
	];

	return (
		<DocViewer
			documents={docs}
			pluginRenderers={DocViewerRenderers}
		/>
	);
}
