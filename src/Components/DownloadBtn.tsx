import React from "react";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { Button, IconButton } from "@chakra-ui/react";
import { useDarkMode } from "../store";
import { Download } from "react-bootstrap-icons";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { isDark } = useDarkMode();
  let color = "white";
  if (isDark) color = "#141414";

  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      1
    );

    const reactFlow = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;
    reactFlow.querySelectorAll("path")?.forEach((path) => {
      path.style.stroke = "yellow";
    });
    if (!reactFlow) return;
    toPng(reactFlow, {
      backgroundColor: color,
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <IconButton
      icon={<Download />}
      aria-label="Download"
      size="xs"
      onClick={onClick}
    />
  );
}

export default DownloadButton;
