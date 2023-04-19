import React from "react";
import path from "path";
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "../components/App.jsx";

const PORT = 3000;

const app = express();

app.get("/favicon.ico", (req, res) => res.end());
app.use("client.js", (req, res) => res.redirect("/public/client.js"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use("/build", express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  const { pipe } = renderToPipeableStream(
    <div id="root">
      <App />
    </div>,
    {
      bootstrapScripts: ["/client.js"],
      onShellReady() {
        res.setHeader("content-type", "text/html");
        res.write("<html><body><h1>Blissmo streaming</h1>");
        pipe(res);
      },
    }
  );
});

app.listen(PORT);
console.log(`Running on: http://localhost:${PORT}`);
