(()=>{"use strict";var t={763:(t,e)=>{function s(t){for(;t.length;)t.pop()?.dispose()}Object.defineProperty(e,"__esModule",{value:!0}),e.Disposable=e.disposeAll=void 0,e.disposeAll=s,e.Disposable=class{constructor(){this._isDisposed=!1,this._disposables=[]}dispose(){this._isDisposed||(this._isDisposed=!0,s(this._disposables))}_register(t){return this._isDisposed?t.dispose():this._disposables.push(t),t}get isDisposed(){return this._isDisposed}}},625:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SimpleBrowserManager=void 0;const i=s(959);e.SimpleBrowserManager=class{constructor(t){this.extensionUri=t}dispose(){this._activeView?.dispose(),this._activeView=void 0}show(t,e){const s="string"==typeof t?t:t.toString(!0);if(this._activeView)this._activeView.show(s,e);else{const t=i.SimpleBrowserView.create(this.extensionUri,s,e);this.registerWebviewListeners(t),this._activeView=t}}restore(t,e){const s=e?.url??"",n=i.SimpleBrowserView.restore(this.extensionUri,s,t);this.registerWebviewListeners(n),this._activeView??(this._activeView=n)}registerWebviewListeners(t){t.onDispose((()=>{this._activeView===t&&(this._activeView=void 0)}))}}},959:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SimpleBrowserView=void 0;const i=s(496),n=s(763);class o extends n.Disposable{static getWebviewLocalResourceRoots(t){return[i.Uri.joinPath(t,"media")]}static getWebviewOptions(t){return{enableScripts:!0,enableForms:!0,localResourceRoots:o.getWebviewLocalResourceRoots(t)}}static create(t,e,s){const n=i.window.createWebviewPanel(o.viewType,o.title,{viewColumn:s?.viewColumn??i.ViewColumn.Active,preserveFocus:s?.preserveFocus},{retainContextWhenHidden:!0,...o.getWebviewOptions(t)});return new o(t,e,n)}static restore(t,e,s){return new o(t,e,s)}constructor(t,e,s){super(),this.extensionUri=t,this._onDidDispose=this._register(new i.EventEmitter),this.onDispose=this._onDidDispose.event,this._webviewPanel=this._register(s),this._webviewPanel.webview.options=o.getWebviewOptions(t),this._register(this._webviewPanel.webview.onDidReceiveMessage((t=>{switch(t.type){case"openExternal":try{const e=i.Uri.parse(t.url);i.env.openExternal(e)}catch{}}}))),this._register(this._webviewPanel.onDidDispose((()=>{this.dispose()}))),this._register(i.workspace.onDidChangeConfiguration((t=>{if(t.affectsConfiguration("simpleBrowser.focusLockIndicator.enabled")){const t=i.workspace.getConfiguration("simpleBrowser");this._webviewPanel.webview.postMessage({type:"didChangeFocusLockIndicatorEnabled",focusLockEnabled:t.get("focusLockIndicator.enabled",!0)})}}))),this.show(e)}dispose(){this._onDidDispose.fire(),super.dispose()}show(t,e){this._webviewPanel.webview.html=this.getHtml(t),this._webviewPanel.reveal(e?.viewColumn,e?.preserveFocus)}getHtml(t){const e=i.workspace.getConfiguration("simpleBrowser"),s=function(){let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let s=0;s<64;s++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}(),n=this.extensionResourceUrl("media","index.js"),o=this.extensionResourceUrl("media","main.css"),r=this.extensionResourceUrl("media","codicon.css");return`<!DOCTYPE html>\n\t\t\t<html>\n\t\t\t<head>\n\t\t\t\t<meta http-equiv="Content-type" content="text/html;charset=UTF-8">\n\n\t\t\t\t<meta http-equiv="Content-Security-Policy" content="\n\t\t\t\t\tdefault-src 'none';\n\t\t\t\t\tfont-src data:;\n\t\t\t\t\tstyle-src ${this._webviewPanel.webview.cspSource};\n\t\t\t\t\tscript-src 'nonce-${s}';\n\t\t\t\t\tframe-src *;\n\t\t\t\t\t">\n\n\t\t\t\t<meta id="simple-browser-settings" data-settings="${a=JSON.stringify({url:t,focusLockEnabled:e.get("focusLockIndicator.enabled",!0)}),a.toString().replace(/"/g,"&quot;")}">\n\n\t\t\t\t<link rel="stylesheet" type="text/css" href="${o}">\n\t\t\t\t<link rel="stylesheet" type="text/css" href="${r}">\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<header class="header">\n\t\t\t\t\t<nav class="controls">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${i.l10n.t("Back")}"\n\t\t\t\t\t\t\tclass="back-button icon"><i class="codicon codicon-arrow-left"></i></button>\n\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${i.l10n.t("Forward")}"\n\t\t\t\t\t\t\tclass="forward-button icon"><i class="codicon codicon-arrow-right"></i></button>\n\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${i.l10n.t("Reload")}"\n\t\t\t\t\t\t\tclass="reload-button icon"><i class="codicon codicon-refresh"></i></button>\n\t\t\t\t\t</nav>\n\n\t\t\t\t\t<input class="url-input" type="text">\n\n\t\t\t\t\t<nav class="controls">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${i.l10n.t("Open in browser")}"\n\t\t\t\t\t\t\tclass="open-external-button icon"><i class="codicon codicon-link-external"></i></button>\n\t\t\t\t\t</nav>\n\t\t\t\t</header>\n\t\t\t\t<div class="content">\n\t\t\t\t\t<div class="iframe-focused-alert">${i.l10n.t("Focus Lock")}</div>\n\t\t\t\t\t<iframe sandbox="allow-scripts allow-forms allow-same-origin allow-downloads"></iframe>\n\t\t\t\t</div>\n\n\t\t\t\t<script src="${n}" nonce="${s}"><\/script>\n\t\t\t</body>\n\t\t\t</html>`;var a}extensionResourceUrl(...t){return this._webviewPanel.webview.asWebviewUri(i.Uri.joinPath(this.extensionUri,...t))}}e.SimpleBrowserView=o,o.viewType="simpleBrowser.view",o.title=i.l10n.t("Simple Browser")},496:t=>{t.exports=require("vscode")}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,s),o.exports}var i={};(()=>{var t=i;Object.defineProperty(t,"__esModule",{value:!0}),t.activate=void 0;const e=s(496),n=s(625),o=s(959),r=new Set(["localhost","127.0.0.1","[0:0:0:0:0:0:0:1]","[::1]","0.0.0.0","[0:0:0:0:0:0:0:0]","[::]"]);t.activate=function(t){const s=new n.SimpleBrowserManager(t.extensionUri);t.subscriptions.push(s),t.subscriptions.push(e.window.registerWebviewPanelSerializer(o.SimpleBrowserView.viewType,{deserializeWebviewPanel:async(t,e)=>{s.restore(t,e)}})),t.subscriptions.push(e.commands.registerCommand("simpleBrowser.show",(async t=>{t||(t=await e.window.showInputBox({placeHolder:e.l10n.t("https://example.com"),prompt:e.l10n.t("Enter url to visit")})),t&&s.show(t)}))),t.subscriptions.push(e.commands.registerCommand("simpleBrowser.api.open",((t,e)=>{s.show(t,e)}))),t.subscriptions.push(e.window.registerExternalUriOpener("simpleBrowser.open",{canOpenExternalUri(t){const s=new URL(t.toString(!0));return r.has(s.hostname)?"undefined"!=typeof navigator&&e.env.uiKind===e.UIKind.Web?e.ExternalUriOpenerPriority.Default:e.ExternalUriOpenerPriority.Option:e.ExternalUriOpenerPriority.None},openExternalUri:t=>s.show(t,{viewColumn:e.window.activeTextEditor?e.ViewColumn.Beside:e.ViewColumn.Active})},{schemes:["http","https"],label:e.l10n.t("Open in simple browser")}))}})();var n=exports;for(var o in i)n[o]=i[o];i.__esModule&&Object.defineProperty(n,"__esModule",{value:!0})})();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/01ce8d869e4220577e194b2dd57bfa12437dfcf5/extensions/simple-browser/dist/browser/extension.js.map