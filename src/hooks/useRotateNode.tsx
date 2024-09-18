export const useRotateNode = () => {
  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);

      let degs = [0, 90, 180, 270, 360];
      const rotation = 180 - deg;
      const newRotation = degs?.find((deg) => {
        if (Math.abs(deg - rotation) <= 45 || Math.abs(deg + rotation) <= 4)
          return true;
      });
      if (newRotation) setRotation(newRotation);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals, selected]);
};
