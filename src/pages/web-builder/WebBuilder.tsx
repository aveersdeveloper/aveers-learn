import "grapesjs/dist/css/grapes.min.css";
import GjsEditor from "@grapesjs/react";
import grapesjs from "grapesjs";

const WebBuilder = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GjsEditor
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.

        // GrapesJS init options
        options={{
          height: "100vh",
          storageManager: true,
        }}
        plugins={[
          {
            id: "gjs-blocks-basic",
            src: "https://unpkg.com/grapesjs-blocks-basic",
          },
          {
            id: "grapesjs-navbar",
            src: "https://unpkg.com/grapesjs-navbar",
          },
          {
            id: "grapesjs-tabs",
            src: "https://unpkg.com/grapesjs-tabs",
          },
          {
            id: "grapesjs-preset-webpage",
            src: "https://unpkg.com/grapesjs-preset-webpage",
          },
          {
            id: "grapesjs-tooltip",
            src: "https://unpkg.com/grapesjs-tooltip",
          },
          {
            id: "grapesjs-plugin-export",
            src: "https://unpkg.com/grapesjs-plugin-export",
          },
          {
            id: "grapesjs-plugin-forms",
            src: "https://unpkg.com/grapesjs-plugin-forms",
          },
          {
            id: "grapesjs-plugin-social",
            src: "https://unpkg.com/grapesjs-plugin-social",
          },
          {
            id: "grapesjs-plugin-modal",
            src: "https://unpkg.com/grapesjs-plugin-modal",
          },
        ]}
      />
      {/* <GrapesjsReact
        id="grapesjs-react"
        plugins={[gjspresetwebpage, gjsblockbasic]}
        style=""
      /> */}
    </div>
  );
};

export default WebBuilder;
