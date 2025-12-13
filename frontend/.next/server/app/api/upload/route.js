"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_BMSIT_Desktop_Polydropbox_frontend_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\BMSIT\\\\Desktop\\\\Polydropbox\\\\frontend\\\\app\\\\api\\\\upload\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_BMSIT_Desktop_Polydropbox_frontend_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/upload/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNCTVNJVCU1Q0Rlc2t0b3AlNUNQb2x5ZHJvcGJveCU1Q2Zyb250ZW5kJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNCTVNJVCU1Q0Rlc2t0b3AlNUNQb2x5ZHJvcGJveCU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3BvbHlkcm9wYm94LWZyb250ZW5kLz85YzVjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEJNU0lUXFxcXERlc2t0b3BcXFxcUG9seWRyb3Bib3hcXFxcZnJvbnRlbmRcXFxcYXBwXFxcXGFwaVxcXFx1cGxvYWRcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VwbG9hZC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VwbG9hZFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXBsb2FkL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQk1TSVRcXFxcRGVza3RvcFxcXFxQb2x5ZHJvcGJveFxcXFxmcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXHVwbG9hZFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdXBsb2FkL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js */ \"(rsc)/./node_modules/crypto-js/index.js\");\n/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ethers */ \"(rsc)/./node_modules/ethers/lib.esm/utils/units.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ethers */ \"(rsc)/./node_modules/ethers/lib.esm/providers/provider-jsonrpc.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ethers */ \"(rsc)/./node_modules/ethers/lib.esm/wallet/wallet.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ethers */ \"(rsc)/./node_modules/ethers/lib.esm/contract/contract.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\n// MongoDB connection\nconst MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || \"mongodb://localhost:27017/polydropbox\";\nif (!(mongoose__WEBPACK_IMPORTED_MODULE_3___default().connections)[0].readyState) {\n    mongoose__WEBPACK_IMPORTED_MODULE_3___default().connect(MONGODB_URI);\n}\nconst FileSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_3___default().Schema)({\n    fileId: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    fileName: String,\n    fileSize: Number,\n    ipfsHash: String,\n    encryptedKey: String,\n    creator: String,\n    price: Number,\n    expiryTime: Number,\n    maxDownloads: Number,\n    downloadCount: {\n        type: Number,\n        default: 0\n    },\n    burnAfterDownload: Boolean,\n    enableCrossChain: Boolean,\n    createdAt: {\n        type: Date,\n        default: Date.now\n    },\n    downloads: [\n        {\n            user: String,\n            timestamp: Date\n        }\n    ]\n});\nconst File = (mongoose__WEBPACK_IMPORTED_MODULE_3___default().models).File || mongoose__WEBPACK_IMPORTED_MODULE_3___default().model(\"File\", FileSchema);\n// Pinata SDK\nconst PINATA_API_KEY = process.env.PINATA_API_KEY || process.env.NEXT_PUBLIC_PINATA_API_KEY;\nconst PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;\n// Generate encryption key\nfunction generateEncryptionKey() {\n    return crypto__WEBPACK_IMPORTED_MODULE_1___default().randomBytes(32).toString(\"hex\");\n}\n// Encrypt file\nfunction encryptFile(buffer, key) {\n    return crypto_js__WEBPACK_IMPORTED_MODULE_2___default().AES.encrypt(buffer.toString(\"base64\"), key).toString();\n}\n// Upload to IPFS via Pinata\nasync function uploadToIPFS(buffer, fileName) {\n    try {\n        const formData = new FormData();\n        const blob = new Blob([\n            new Uint8Array(buffer)\n        ]);\n        formData.append(\"file\", blob, fileName);\n        const metadata = JSON.stringify({\n            name: fileName\n        });\n        formData.append(\"pinataMetadata\", metadata);\n        const options = JSON.stringify({\n            cidVersion: 0\n        });\n        formData.append(\"pinataOptions\", options);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].post(\"https://api.pinata.cloud/pinning/pinFileToIPFS\", formData, {\n            headers: {\n                \"pinata_api_key\": PINATA_API_KEY,\n                \"pinata_secret_api_key\": PINATA_SECRET_KEY\n            },\n            maxBodyLength: Infinity\n        });\n        return response.data.IpfsHash;\n    } catch (error) {\n        console.error(\"IPFS upload error:\", error);\n        throw new Error(`IPFS upload failed: ${error.message}`);\n    }\n}\nasync function POST(request) {\n    try {\n        const formData = await request.formData();\n        const file = formData.get(\"file\");\n        if (!file) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"No file uploaded\"\n            }, {\n                status: 400\n            });\n        }\n        const price = formData.get(\"price\") || \"0\";\n        const expiryHours = formData.get(\"expiryHours\") || \"24\";\n        const maxDownloads = formData.get(\"maxDownloads\") || \"1\";\n        const burnAfterDownload = formData.get(\"burnAfterDownload\") === \"true\";\n        const enableCrossChain = formData.get(\"enableCrossChain\") === \"true\";\n        const creator = formData.get(\"creator\");\n        if (!creator) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Creator address required\"\n            }, {\n                status: 400\n            });\n        }\n        // Generate file ID\n        const fileId = crypto__WEBPACK_IMPORTED_MODULE_1___default().randomBytes(16).toString(\"hex\");\n        // Read file buffer\n        const arrayBuffer = await file.arrayBuffer();\n        const buffer = Buffer.from(arrayBuffer);\n        // Generate encryption key\n        const encryptionKey = generateEncryptionKey();\n        // Encrypt file\n        const encryptedString = encryptFile(buffer, encryptionKey);\n        const encryptedBuffer = Buffer.from(encryptedString, \"utf8\");\n        // Upload to IPFS\n        const ipfsHash = await uploadToIPFS(encryptedBuffer, file.name);\n        // Calculate expiry time\n        const expiryTime = Math.floor(Date.now() / 1000) + parseInt(expiryHours) * 3600;\n        // Price in USDC (6 decimals)\n        const priceInWei = ethers__WEBPACK_IMPORTED_MODULE_5__.parseUnits(price || \"0\", 6);\n        // Create file record in MongoDB\n        const fileRecord = new File({\n            fileId,\n            fileName: file.name,\n            fileSize: file.size,\n            ipfsHash,\n            encryptedKey: encryptionKey,\n            creator,\n            price: parseFloat(price || \"0\"),\n            expiryTime,\n            maxDownloads: parseInt(maxDownloads || \"1\"),\n            burnAfterDownload,\n            enableCrossChain\n        });\n        await fileRecord.save();\n        // Create file on blockchain\n        const contractAddress = \"0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938\";\n        const privateKey = process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY;\n        if (contractAddress && privateKey) {\n            try {\n                const provider = new ethers__WEBPACK_IMPORTED_MODULE_6__.JsonRpcProvider(\"https://rpc-amoy.polygon.technology\" || 0);\n                const wallet = new ethers__WEBPACK_IMPORTED_MODULE_7__.Wallet(privateKey, provider);\n                const contractABI = [\n                    \"function createFile(string memory fileId, string memory ipfsHash, uint256 price, uint256 expiryTime, uint256 maxDownloads, bool burnAfterDownload)\"\n                ];\n                const contract = new ethers__WEBPACK_IMPORTED_MODULE_8__.Contract(contractAddress, contractABI, wallet);\n                const tx = await contract.createFile(fileId, ipfsHash, priceInWei, expiryTime, parseInt(maxDownloads || \"1\"), burnAfterDownload);\n                await tx.wait();\n            } catch (error) {\n                console.error(\"Blockchain error:\", error);\n            // Continue even if blockchain fails\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            fileId,\n            shareLink: `${\"http://localhost:3000\" || 0}/file/${fileId}`\n        });\n    } catch (error) {\n        console.error(\"Upload error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Upload failed\",\n            message: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ0YsRUFBRSxPQUFPNEQsT0FBWTtRQUNuQkMsUUFBUUQsS0FBSyxDQUFDLGlCQUFpQkE7UUFDL0IsT0FBTzNFLHFEQUFZQSxDQUFDbUYsSUFBSSxDQUN0QjtZQUFFUixPQUFPO1lBQWlCRyxTQUFTSCxNQUFNRyxPQUFPO1FBQUMsR0FDakQ7WUFBRU0sUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2x5ZHJvcGJveC1mcm9udGVuZC8uL2FwcC9hcGkvdXBsb2FkL3JvdXRlLnRzP2E4OGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgd3JpdGVGaWxlLCBta2RpciB9IGZyb20gJ2ZzL3Byb21pc2VzJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCBDcnlwdG9KUyBmcm9tICdjcnlwdG8tanMnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5cbi8vIE1vbmdvREIgY29ubmVjdGlvblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSB8fCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19NT05HT0RCX1VSSSB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9wb2x5ZHJvcGJveCdcbmlmICghbW9uZ29vc2UuY29ubmVjdGlvbnNbMF0ucmVhZHlTdGF0ZSkge1xuICBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJKVxufVxuXG5jb25zdCBGaWxlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIGZpbGVJZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcbiAgZmlsZU5hbWU6IFN0cmluZyxcbiAgZmlsZVNpemU6IE51bWJlcixcbiAgaXBmc0hhc2g6IFN0cmluZyxcbiAgZW5jcnlwdGVkS2V5OiBTdHJpbmcsXG4gIGNyZWF0b3I6IFN0cmluZyxcbiAgcHJpY2U6IE51bWJlcixcbiAgZXhwaXJ5VGltZTogTnVtYmVyLFxuICBtYXhEb3dubG9hZHM6IE51bWJlcixcbiAgZG93bmxvYWRDb3VudDogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAgfSxcbiAgYnVybkFmdGVyRG93bmxvYWQ6IEJvb2xlYW4sXG4gIGVuYWJsZUNyb3NzQ2hhaW46IEJvb2xlYW4sXG4gIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRlLCBkZWZhdWx0OiBEYXRlLm5vdyB9LFxuICBkb3dubG9hZHM6IFt7XG4gICAgdXNlcjogU3RyaW5nLFxuICAgIHRpbWVzdGFtcDogRGF0ZSxcbiAgfV0sXG59KVxuXG5jb25zdCBGaWxlID0gbW9uZ29vc2UubW9kZWxzLkZpbGUgfHwgbW9uZ29vc2UubW9kZWwoJ0ZpbGUnLCBGaWxlU2NoZW1hKVxuXG4vLyBQaW5hdGEgU0RLXG5jb25zdCBQSU5BVEFfQVBJX0tFWSA9IHByb2Nlc3MuZW52LlBJTkFUQV9BUElfS0VZIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BJTkFUQV9BUElfS0VZXG5jb25zdCBQSU5BVEFfU0VDUkVUX0tFWSA9IHByb2Nlc3MuZW52LlBJTkFUQV9TRUNSRVRfS0VZIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BJTkFUQV9TRUNSRVRfS0VZXG5cbi8vIEdlbmVyYXRlIGVuY3J5cHRpb24ga2V5XG5mdW5jdGlvbiBnZW5lcmF0ZUVuY3J5cHRpb25LZXkoKSB7XG4gIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpLnRvU3RyaW5nKCdoZXgnKVxufVxuXG4vLyBFbmNyeXB0IGZpbGVcbmZ1bmN0aW9uIGVuY3J5cHRGaWxlKGJ1ZmZlcjogQnVmZmVyLCBrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBDcnlwdG9KUy5BRVMuZW5jcnlwdChcbiAgICBidWZmZXIudG9TdHJpbmcoJ2Jhc2U2NCcpLFxuICAgIGtleVxuICApLnRvU3RyaW5nKClcbn1cblxuLy8gVXBsb2FkIHRvIElQRlMgdmlhIFBpbmF0YVxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkVG9JUEZTKGJ1ZmZlcjogQnVmZmVyLCBmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShidWZmZXIpXSlcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBibG9iLCBmaWxlTmFtZSlcblxuICAgIGNvbnN0IG1ldGFkYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogZmlsZU5hbWUsXG4gICAgfSlcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3BpbmF0YU1ldGFkYXRhJywgbWV0YWRhdGEpXG5cbiAgICBjb25zdCBvcHRpb25zID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY2lkVmVyc2lvbjogMCxcbiAgICB9KVxuICAgIGZvcm1EYXRhLmFwcGVuZCgncGluYXRhT3B0aW9ucycsIG9wdGlvbnMpXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoXG4gICAgICAnaHR0cHM6Ly9hcGkucGluYXRhLmNsb3VkL3Bpbm5pbmcvcGluRmlsZVRvSVBGUycsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdwaW5hdGFfYXBpX2tleSc6IFBJTkFUQV9BUElfS0VZLFxuICAgICAgICAgICdwaW5hdGFfc2VjcmV0X2FwaV9rZXknOiBQSU5BVEFfU0VDUkVUX0tFWSxcbiAgICAgICAgfSxcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogSW5maW5pdHksXG4gICAgICB9XG4gICAgKVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuSXBmc0hhc2hcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0lQRlMgdXBsb2FkIGVycm9yOicsIGVycm9yKVxuICAgIHRocm93IG5ldyBFcnJvcihgSVBGUyB1cGxvYWQgZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YClcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxdWVzdC5mb3JtRGF0YSgpXG4gICAgY29uc3QgZmlsZSA9IGZvcm1EYXRhLmdldCgnZmlsZScpIGFzIEZpbGVcbiAgICBcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gZmlsZSB1cGxvYWRlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IHByaWNlID0gZm9ybURhdGEuZ2V0KCdwcmljZScpIGFzIHN0cmluZyB8fCAnMCdcbiAgICBjb25zdCBleHBpcnlIb3VycyA9IGZvcm1EYXRhLmdldCgnZXhwaXJ5SG91cnMnKSBhcyBzdHJpbmcgfHwgJzI0J1xuICAgIGNvbnN0IG1heERvd25sb2FkcyA9IGZvcm1EYXRhLmdldCgnbWF4RG93bmxvYWRzJykgYXMgc3RyaW5nIHx8ICcxJ1xuICAgIGNvbnN0IGJ1cm5BZnRlckRvd25sb2FkID0gZm9ybURhdGEuZ2V0KCdidXJuQWZ0ZXJEb3dubG9hZCcpID09PSAndHJ1ZSdcbiAgICBjb25zdCBlbmFibGVDcm9zc0NoYWluID0gZm9ybURhdGEuZ2V0KCdlbmFibGVDcm9zc0NoYWluJykgPT09ICd0cnVlJ1xuICAgIGNvbnN0IGNyZWF0b3IgPSBmb3JtRGF0YS5nZXQoJ2NyZWF0b3InKSBhcyBzdHJpbmdcblxuICAgIGlmICghY3JlYXRvcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdDcmVhdG9yIGFkZHJlc3MgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBmaWxlIElEXG4gICAgY29uc3QgZmlsZUlkID0gY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KS50b1N0cmluZygnaGV4JylcblxuICAgIC8vIFJlYWQgZmlsZSBidWZmZXJcbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKVxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyKVxuXG4gICAgLy8gR2VuZXJhdGUgZW5jcnlwdGlvbiBrZXlcbiAgICBjb25zdCBlbmNyeXB0aW9uS2V5ID0gZ2VuZXJhdGVFbmNyeXB0aW9uS2V5KClcblxuICAgIC8vIEVuY3J5cHQgZmlsZVxuICAgIGNvbnN0IGVuY3J5cHRlZFN0cmluZyA9IGVuY3J5cHRGaWxlKGJ1ZmZlciwgZW5jcnlwdGlvbktleSlcbiAgICBjb25zdCBlbmNyeXB0ZWRCdWZmZXIgPSBCdWZmZXIuZnJvbShlbmNyeXB0ZWRTdHJpbmcsICd1dGY4JylcblxuICAgIC8vIFVwbG9hZCB0byBJUEZTXG4gICAgY29uc3QgaXBmc0hhc2ggPSBhd2FpdCB1cGxvYWRUb0lQRlMoZW5jcnlwdGVkQnVmZmVyLCBmaWxlLm5hbWUpXG5cbiAgICAvLyBDYWxjdWxhdGUgZXhwaXJ5IHRpbWVcbiAgICBjb25zdCBleHBpcnlUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyBwYXJzZUludChleHBpcnlIb3VycykgKiAzNjAwXG5cbiAgICAvLyBQcmljZSBpbiBVU0RDICg2IGRlY2ltYWxzKVxuICAgIGNvbnN0IHByaWNlSW5XZWkgPSBldGhlcnMucGFyc2VVbml0cyhwcmljZSB8fCAnMCcsIDYpXG5cbiAgICAvLyBDcmVhdGUgZmlsZSByZWNvcmQgaW4gTW9uZ29EQlxuICAgIGNvbnN0IGZpbGVSZWNvcmQgPSBuZXcgRmlsZSh7XG4gICAgICBmaWxlSWQsXG4gICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgICAgZmlsZVNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIGlwZnNIYXNoLFxuICAgICAgZW5jcnlwdGVkS2V5OiBlbmNyeXB0aW9uS2V5LFxuICAgICAgY3JlYXRvcixcbiAgICAgIHByaWNlOiBwYXJzZUZsb2F0KHByaWNlIHx8ICcwJyksXG4gICAgICBleHBpcnlUaW1lLFxuICAgICAgbWF4RG93bmxvYWRzOiBwYXJzZUludChtYXhEb3dubG9hZHMgfHwgJzEnKSxcbiAgICAgIGJ1cm5BZnRlckRvd25sb2FkLFxuICAgICAgZW5hYmxlQ3Jvc3NDaGFpbixcbiAgICB9KVxuXG4gICAgYXdhaXQgZmlsZVJlY29yZC5zYXZlKClcblxuICAgIC8vIENyZWF0ZSBmaWxlIG9uIGJsb2NrY2hhaW5cbiAgICBjb25zdCBjb250cmFjdEFkZHJlc3MgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19DT05UUkFDVF9BRERSRVNTXG4gICAgY29uc3QgcHJpdmF0ZUtleSA9IHByb2Nlc3MuZW52LlBSSVZBVEVfS0VZIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BSSVZBVEVfS0VZXG5cbiAgICBpZiAoY29udHJhY3RBZGRyZXNzICYmIHByaXZhdGVLZXkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5Kc29uUnBjUHJvdmlkZXIoXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUE9MWUdPTl9BTU9ZX1JQQyB8fCAnaHR0cHM6Ly9ycGMtYW1veS5wb2x5Z29uLnRlY2hub2xvZ3knXG4gICAgICAgIClcbiAgICAgICAgY29uc3Qgd2FsbGV0ID0gbmV3IGV0aGVycy5XYWxsZXQocHJpdmF0ZUtleSwgcHJvdmlkZXIpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250cmFjdEFCSSA9IFtcbiAgICAgICAgICAnZnVuY3Rpb24gY3JlYXRlRmlsZShzdHJpbmcgbWVtb3J5IGZpbGVJZCwgc3RyaW5nIG1lbW9yeSBpcGZzSGFzaCwgdWludDI1NiBwcmljZSwgdWludDI1NiBleHBpcnlUaW1lLCB1aW50MjU2IG1heERvd25sb2FkcywgYm9vbCBidXJuQWZ0ZXJEb3dubG9hZCknLFxuICAgICAgICBdXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QoY29udHJhY3RBZGRyZXNzLCBjb250cmFjdEFCSSwgd2FsbGV0KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdHggPSBhd2FpdCBjb250cmFjdC5jcmVhdGVGaWxlKFxuICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICBpcGZzSGFzaCxcbiAgICAgICAgICBwcmljZUluV2VpLFxuICAgICAgICAgIGV4cGlyeVRpbWUsXG4gICAgICAgICAgcGFyc2VJbnQobWF4RG93bmxvYWRzIHx8ICcxJyksXG4gICAgICAgICAgYnVybkFmdGVyRG93bmxvYWRcbiAgICAgICAgKVxuICAgICAgICBhd2FpdCB0eC53YWl0KClcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Jsb2NrY2hhaW4gZXJyb3I6JywgZXJyb3IpXG4gICAgICAgIC8vIENvbnRpbnVlIGV2ZW4gaWYgYmxvY2tjaGFpbiBmYWlsc1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZmlsZUlkLFxuICAgICAgc2hhcmVMaW5rOiBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GUk9OVEVORF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCd9L2ZpbGUvJHtmaWxlSWR9YCxcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignVXBsb2FkIGVycm9yOicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdVcGxvYWQgZmFpbGVkJywgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKVxuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcnlwdG8iLCJDcnlwdG9KUyIsImF4aW9zIiwiZXRoZXJzIiwibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19NT05HT0RCX1VSSSIsImNvbm5lY3Rpb25zIiwicmVhZHlTdGF0ZSIsImNvbm5lY3QiLCJGaWxlU2NoZW1hIiwiU2NoZW1hIiwiZmlsZUlkIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidW5pcXVlIiwiZmlsZU5hbWUiLCJmaWxlU2l6ZSIsIk51bWJlciIsImlwZnNIYXNoIiwiZW5jcnlwdGVkS2V5IiwiY3JlYXRvciIsInByaWNlIiwiZXhwaXJ5VGltZSIsIm1heERvd25sb2FkcyIsImRvd25sb2FkQ291bnQiLCJkZWZhdWx0IiwiYnVybkFmdGVyRG93bmxvYWQiLCJCb29sZWFuIiwiZW5hYmxlQ3Jvc3NDaGFpbiIsImNyZWF0ZWRBdCIsIkRhdGUiLCJub3ciLCJkb3dubG9hZHMiLCJ1c2VyIiwidGltZXN0YW1wIiwiRmlsZSIsIm1vZGVscyIsIm1vZGVsIiwiUElOQVRBX0FQSV9LRVkiLCJORVhUX1BVQkxJQ19QSU5BVEFfQVBJX0tFWSIsIlBJTkFUQV9TRUNSRVRfS0VZIiwiTkVYVF9QVUJMSUNfUElOQVRBX1NFQ1JFVF9LRVkiLCJnZW5lcmF0ZUVuY3J5cHRpb25LZXkiLCJyYW5kb21CeXRlcyIsInRvU3RyaW5nIiwiZW5jcnlwdEZpbGUiLCJidWZmZXIiLCJrZXkiLCJBRVMiLCJlbmNyeXB0IiwidXBsb2FkVG9JUEZTIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImJsb2IiLCJCbG9iIiwiVWludDhBcnJheSIsImFwcGVuZCIsIm1ldGFkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJvcHRpb25zIiwiY2lkVmVyc2lvbiIsInJlc3BvbnNlIiwicG9zdCIsImhlYWRlcnMiLCJtYXhCb2R5TGVuZ3RoIiwiSW5maW5pdHkiLCJkYXRhIiwiSXBmc0hhc2giLCJlcnJvciIsImNvbnNvbGUiLCJFcnJvciIsIm1lc3NhZ2UiLCJQT1NUIiwicmVxdWVzdCIsImZpbGUiLCJnZXQiLCJqc29uIiwic3RhdHVzIiwiZXhwaXJ5SG91cnMiLCJhcnJheUJ1ZmZlciIsIkJ1ZmZlciIsImZyb20iLCJlbmNyeXB0aW9uS2V5IiwiZW5jcnlwdGVkU3RyaW5nIiwiZW5jcnlwdGVkQnVmZmVyIiwiTWF0aCIsImZsb29yIiwicGFyc2VJbnQiLCJwcmljZUluV2VpIiwicGFyc2VVbml0cyIsImZpbGVSZWNvcmQiLCJzaXplIiwicGFyc2VGbG9hdCIsInNhdmUiLCJjb250cmFjdEFkZHJlc3MiLCJORVhUX1BVQkxJQ19DT05UUkFDVF9BRERSRVNTIiwicHJpdmF0ZUtleSIsIlBSSVZBVEVfS0VZIiwiTkVYVF9QVUJMSUNfUFJJVkFURV9LRVkiLCJwcm92aWRlciIsIkpzb25ScGNQcm92aWRlciIsIk5FWFRfUFVCTElDX1BPTFlHT05fQU1PWV9SUEMiLCJ3YWxsZXQiLCJXYWxsZXQiLCJjb250cmFjdEFCSSIsImNvbnRyYWN0IiwiQ29udHJhY3QiLCJ0eCIsImNyZWF0ZUZpbGUiLCJ3YWl0Iiwic3VjY2VzcyIsInNoYXJlTGluayIsIk5FWFRfUFVCTElDX0ZST05URU5EX1VSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/axios","vendor-chunks/mime-db","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/form-data","vendor-chunks/get-intrinsic","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-symbols","vendor-chunks/delayed-stream","vendor-chunks/function-bind","vendor-chunks/es-set-tostringtag","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/has-flag","vendor-chunks/gopd","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/ethers","vendor-chunks/crypto-js","vendor-chunks/@noble","vendor-chunks/aes-js","vendor-chunks/@adraffy"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBMSIT%5CDesktop%5CPolydropbox%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();