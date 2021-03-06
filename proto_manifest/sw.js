"use strict";
importScripts("sw-toolbox.js");
toolbox.precache(["index.html", "assets/css/main.css"]);
toolbox.router.get("/images/*", toolbox.cacheFirst);
toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 5 });

if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log("This is running as standalone.");
  }