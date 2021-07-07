import React, { memo, PropsWithChildren, CSSProperties } from "react";
import { FrameSplitter } from "./FrameSplitter";

const absFrameCSS: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

export const Frame = memo<
  PropsWithChildren<{
    name: string;
    z?: number;
    scrollable?: boolean;
    fit?: boolean;
    splitter?: {
      position: "n" | "e" | "w" | "s";
      defaultValue: number;
      onChange: (v: number) => void;
      className?: string;
    };
  }>
>(({ name, z, splitter, scrollable, fit, children }) => {
  const containerCSS: CSSProperties = scrollable
    ? {
        ...absFrameCSS,
        overflowY: "auto",
      }
    : fit
    ? {
        ...absFrameCSS,
        overflow: "hidden",
      }
    : {
        position: "relative",
      };
  return (
    <div
      style={{
        position: "relative",
        gridArea: name,
      }}
    >
      {splitter && (splitter.position === "n" || splitter.position === "w") && (
        <FrameSplitter
          name={name}
          postion={splitter.position}
          defaultValue={splitter.defaultValue}
          onChange={splitter.onChange}
          className={splitter.className}
        />
      )}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            ...containerCSS,
            zIndex: z,
          }}
          tabIndex={scrollable ? 0 : undefined}
        >
          {children}
        </div>
      </div>
      {splitter && (splitter.position === "s" || splitter.position === "e") && (
        <FrameSplitter
          name={name}
          postion={splitter.position}
          defaultValue={splitter.defaultValue}
          onChange={splitter.onChange}
          className={splitter.className}
        />
      )}
    </div>
  );
});
