import { memo } from "react";
import { Frame, useRange } from "@yusukehirao/react-splitted-frame";

export const AppFrame = memo<{
  header: JSX.Element;
  sideFrame: JSX.Element;
  mainFrame: JSX.Element;
  subFrame: JSX.Element;
  footer: JSX.Element;
}>(({ header, sideFrame, mainFrame, subFrame, footer }) => {
  const [sideFrameWidth, setSideFrameWidth] = useRange(30, 5, 95);
  const [subFrameHeight, setSubFrameHeight] = useRange(20, 5, 95);

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateAreas:
          '"header header" "sideFrame mainFrame" "sideFrame subFrame" "footer footer"',
        gridTemplateColumns: `${sideFrameWidth}% 1fr`,
        gridTemplateRows: `auto 1fr ${subFrameHeight}% auto`,
      }}
    >
      <header>
        {/* The `name` prop is the name of `grid-template-areas` */}
        <Frame name="header" z={100}>
          {header}
        </Frame>
      </header>
      <main>
        <Frame
          name="sideFrame"
          z={0}
          scrollable
          splitter={{
            position: "e",
            defaultValue: sideFrameWidth,
            onChange: (v) => {
              setSideFrameWidth(v);
            },
            className: "ANY_CLASS_NAME",
          }}
        >
          {sideFrame}
        </Frame>
        <Frame name="mainFrame" z={10} scrollable>
          {mainFrame}
        </Frame>
        <Frame
          name="subFrame"
          z={0}
          scrollable
          splitter={{
            position: "n",
            defaultValue: subFrameHeight,
            onChange: (v) => {
              setSubFrameHeight(v);
            },
            className: "ANY_CLASS_NAME",
          }}
        >
          {subFrame}
        </Frame>
      </main>
      <footer>
        <Frame name="footer" z={100}>
          {footer}
        </Frame>
      </footer>
    </div>
  );
});
