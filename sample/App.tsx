import { AppFrame } from "./AppFrame";

function App() {
  return (
    <AppFrame
      header={
        <div className="frame-content">
          <h1>react-splitted-frame</h1>
          <p>Draggable and keyboard accessible movable splitter of frames</p>
        </div>
      }
      sideFrame={
        <section className="frame-content">
          <h2>Side pane</h2>
          <p>
            <strong>The frame becomes scrollable if the text overflows.</strong>
          </p>
          <p>Below is dummy text:</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            magnam porro architecto expedita perspiciatis deleniti praesentium
            asperiores dolor? Perferendis cum fugiat maxime dolor aperiam fuga
            aut aspernatur minima officiis! Facilis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae accusamus maxime, eum non odit magni cumque hic facilis
            natus! Repellat dolores, nobis aliquam adipisci consectetur
            molestias. Aspernatur rerum tempore laudantium!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
            deserunt ipsam totam ad iste consectetur inventore alias ratione,
            impedit eum, rem ut minus necessitatibus! Iste excepturi est vel
            fugit vero?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            placeat earum qui consequatur accusantium neque omnis mollitia,
            possimus consectetur nam totam dolores est harum unde itaque id.
            Quos, omnis tempore.
          </p>
        </section>
      }
      mainFrame={
        <section className="frame-content">
          <h2>main pane</h2>
          <h3>Install</h3>
          <pre>
            <code>$ npm install @yusukehirao/react-splitted-frame</code>
          </pre>
        </section>
      }
      subFrame={
        <section className="frame-content">
          <p>It is a sub pane</p>
        </section>
      }
      footer={
        <div className="frame-content">
          <small>©YusukeHirao</small>
        </div>
      }
    />
  );
}

export default App;
