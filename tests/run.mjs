import { build } from "esbuild";
import { writeFile, unlink } from "node:fs/promises";
const output = new URL("./.request-test.mjs", import.meta.url);
try {
  const result = await build({
    entryPoints: ["tests/request-flow.jsx"],
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
    packages: "external",
    external: ["react"],
    jsx: "automatic",
    plugins: [
      {
        name: "motion-test",
        setup(b) {
          // Test real form behavior without requiring a DOM for animation lifecycles.
          b.onResolve({ filter: /^framer-motion$/ }, () => ({
            path: "motion",
            namespace: "test",
          }));
          b.onLoad({ filter: /.*/, namespace: "test" }, () => ({
            contents:
              "import React from 'react'; export const useReducedMotion=()=>true; export const useMotionValue=v=>v; export const useSpring=v=>v; export const useTransform=()=>undefined; export const AnimatePresence=({children})=>children; const cache={}; export const motion=new Proxy({}, {get(_,tag){return cache[tag] ||= React.forwardRef(({initial,animate,exit,transition,whileHover,whileTap,whileInView,viewport,onViewportEnter,...props},ref)=>React.createElement(tag,{...props,ref}));}});",
            loader: "js",
          }));
        },
      },
    ],
  });
  await writeFile(output, result.outputFiles[0].text);
  await import(output.href);
} finally {
  await unlink(output).catch(() => {});
}
