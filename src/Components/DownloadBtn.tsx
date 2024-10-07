import { IconButton } from "@chakra-ui/react";
import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import React from "react";
import { Download } from "react-bootstrap-icons";
import { useDarkMode } from "../store";

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 768;

const downloadImage = (dataUrl: string) => {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);

  a.click();
};

export default function DownloadBtn() {
  const { getNodes } = useReactFlow();

  const { isDark } = useDarkMode();

  let color = "white";
  if (isDark) color = "black";

  const onDownload = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const { x, y, zoom } = getViewportForBounds(
      nodesBounds,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      0.5,
      2,
      1
    );

    const reactFlow = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;
    if (!reactFlow) return;

    toPng(reactFlow, {
      backgroundColor: color,
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      style: {
        width: `${IMAGE_WIDTH}px`,
        height: `${IMAGE_HEIGHT}px`,
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <IconButton
      icon={<Download />}
      aria-label="Download"
      size="xs"
      onClick={onDownload}
    />
  );
}
