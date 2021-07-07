import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react";
import { useRange } from "./useRange";

const INCREMENT_ON_ARROW_KEY = 5;

export const FrameSplitter = memo<{
  name: string;
  postion: "n" | "e" | "w" | "s";
  defaultValue: number;
  onChange: (v: number) => void;
  className?: string;
}>(({ name, postion, defaultValue, onChange, className }) => {
  const { orientation, direction, css } = computePositionStyle(postion);

  const [value, setValue] = useRange(defaultValue, 0, 100);

  const $hr = useRef<HTMLHRElement>(null);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLHRElement>) => {
      if (orientation === "horizontal") {
        if (e.code === "ArrowUp") {
          setValue(value + INCREMENT_ON_ARROW_KEY);
        }
        if (e.code === "ArrowDown") {
          setValue(value - INCREMENT_ON_ARROW_KEY);
        }
        return;
      }
      if (e.code === "ArrowRight") {
        setValue(value + INCREMENT_ON_ARROW_KEY);
      }
      if (e.code === "ArrowLeft") {
        setValue(value - INCREMENT_ON_ARROW_KEY);
      }
    },
    [setValue, value, orientation]
  );

  const [clearFlag, clear] = useState(0);
  useEffect(
    () => {
      if (!$hr.current) {
        return;
      }
      const hr = $hr.current;
      let dragStartPos = NaN;
      let range = NaN;
      function dragStart(e: MouseEvent) {
        const rect = hr.getBoundingClientRect();
        // hr -> div -> ParentComponent
        const containerRect =
          hr.parentElement?.parentElement?.getBoundingClientRect();
        if (!(rect && containerRect)) {
          return;
        }
        const valueToPixel =
          orientation === "horizontal"
            ? containerRect.height
            : containerRect.width;
        range = Math.round((valueToPixel * 100) / value);
        dragStartPos = orientation === "horizontal" ? e.pageY : e.pageX;
      }
      function dragMove(e: MouseEvent) {
        if (isNaN(dragStartPos) || isNaN(range)) {
          return;
        }
        const pos = orientation === "horizontal" ? e.pageY : e.pageX;
        const diff = pos - dragStartPos;
        const moveRatio =
          (diff / range) * 100 * (direction === "negative" ? -1 : 1);
        setValue(value + moveRatio);
      }
      function dragEnd() {
        dragStartPos = NaN;
        range = NaN;
        clear(clearFlag + 1);
      }
      hr.addEventListener("mousedown", dragStart);
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);
      document.addEventListener("mouseleave", dragEnd);
      window.addEventListener("blur", dragEnd);
      return function cleanup() {
        hr.removeEventListener("mousedown", dragStart);
        document.removeEventListener("mousemove", dragMove);
        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener("mouseleave", dragEnd);
        window.removeEventListener("blur", dragEnd);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clearFlag]
  );

  return (
    <div
      className={className}
      style={{
        ...css,
        position: "absolute",
        zIndex: 10,
      }}
    >
      {/* @see https://github.com/A11yance/aria-query/pull/198 */}
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <hr
        ref={$hr}
        aria-label={`Partition of ${name} Pane`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation={orientation}
        tabIndex={0}
        className={`w-full h-full border-0 outline-none bg-gray-400 focus:bg-blue-500 cursor-${orientation}`}
        onKeyUp={onKeyUp}
      />
    </div>
  );
});

function computePositionStyle(postion: "n" | "e" | "w" | "s", width = 3) {
  let orientation: "vertical" | "horizontal";
  let direction: "positive" | "negative";
  let css: CSSProperties;
  switch (postion) {
    case "n": {
      orientation = "horizontal";
      direction = "negative";
      css = {
        top: -(width / 2),
        left: 0,
        width: "100%",
        height: width,
      };
      break;
    }
    case "e": {
      orientation = "vertical";
      direction = "positive";
      css = {
        top: 0,
        right: -(width / 2),
        width: width,
        height: "100%",
      };
      break;
    }
    case "s": {
      orientation = "horizontal";
      direction = "positive";
      css = {
        bottom: -(width / 2),
        left: 0,
        width: "100%",
        height: width,
      };
      break;
    }
    case "w": {
      orientation = "vertical";
      direction = "negative";
      css = {
        top: 0,
        left: -(width / 2),
        width: width,
        height: "100%",
      };
      break;
    }
  }
  return {
    orientation,
    direction,
    css,
  };
}
