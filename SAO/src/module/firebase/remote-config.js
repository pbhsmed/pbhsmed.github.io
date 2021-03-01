!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).firebase)}(this,function(re){"use strict";try{(function(){function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=t(re),r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};var s=function(){return(s=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function f(t,s,a,u){return new(a=a||Promise)(function(r,e){function n(t){try{o(u.next(t))}catch(t){e(t)}}function i(t){try{o(u.throw(t))}catch(t){e(t)}}function o(t){var e;t.done?r(t.value):((e=t.value)instanceof a?e:new a(function(t){t(e)})).then(n,i)}o((u=u.apply(t,s||[])).next())})}function p(r,n){var i,o,s,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},t={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,o&&(s=2&e[0]?o.return:e[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,e[1])).done)return s;switch(o=0,(e=s?[2&e[0],s.value]:e)[0]){case 0:case 1:s=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,o=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){a.label=e[1];break}if(6===e[0]&&a.label<s[1]){a.label=s[1],s=e;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(e);break}s[2]&&a.ops.pop(),a.trys.pop();continue}e=n.call(r,a)}catch(t){e=[6,t],o=0}finally{i=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}function a(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return{value:(t=t&&n>=t.length?void 0:t)&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function n(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,i,o=r.call(t),s=[];try{for(;(void 0===e||0<e--)&&!(n=o.next()).done;)s.push(n.value)}catch(t){i={error:t}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return s}(arguments[e]));return t}var i,o,u,c="FirebaseError",h=(i=Error,r(o=g,u=i),o.prototype=null===u?Object.create(u):(l.prototype=u.prototype,new l),g);function l(){this.constructor=o}function g(t,e,r){e=i.call(this,e)||this;return e.code=t,e.customData=r,e.name=c,Object.setPrototypeOf(e,g.prototype),Error.captureStackTrace&&Error.captureStackTrace(e,d.prototype.create),e}var d=(v.prototype.create=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n,i=e[0]||{},o=this.service+"/"+t,t=this.errors[t],t=t?(n=i,t.replace(m,function(t,e){var r=n[e];return null!=r?String(r):"<"+e+"?>"})):"Error",t=this.serviceName+": "+t+" ("+o+").";return new h(o,t,i)},v);function v(t,e,r){this.service=t,this.serviceName=e,this.errors=r}var m=/\{\$([^}]+)}/g;var y=(b.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},b.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},b.prototype.setServiceProps=function(t){return this.serviceProps=t,this},b);function b(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}function w(r){return new Promise(function(t,e){r.onsuccess=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function _(r,n,i){var o,t=new Promise(function(t,e){w(o=r[n].apply(r,i)).then(t,e)});return t.request=o,t}function S(t,r,e){e.forEach(function(e){Object.defineProperty(t.prototype,e,{get:function(){return this[r][e]},set:function(t){this[r][e]=t}})})}function E(e,r,n,t){t.forEach(function(t){t in n.prototype&&(e.prototype[t]=function(){return _(this[r],t,arguments)})})}function C(e,r,n,t){t.forEach(function(t){t in n.prototype&&(e.prototype[t]=function(){return this[r][t].apply(this[r],arguments)})})}function T(t,n,e,r){r.forEach(function(r){r in e.prototype&&(t.prototype[r]=function(){return t=this[n],(e=_(t,r,arguments)).then(function(t){if(t)return new L(t,e.request)});var t,e})})}function I(t){this._index=t}function L(t,e){this._cursor=t,this._request=e}function P(t){this._store=t}function O(r){this._tx=r,this.complete=new Promise(function(t,e){r.oncomplete=function(){t()},r.onerror=function(){e(r.error)},r.onabort=function(){e(r.error)}})}function M(t,e,r){this._db=t,this.oldVersion=e,this.transaction=new O(r)}function k(t){this._db=t}S(I,"_index",["name","keyPath","multiEntry","unique"]),E(I,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),T(I,"_index",IDBIndex,["openCursor","openKeyCursor"]),S(L,"_cursor",["direction","key","primaryKey","value"]),E(L,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(r){r in IDBCursor.prototype&&(L.prototype[r]=function(){var e=this,t=arguments;return Promise.resolve().then(function(){return e._cursor[r].apply(e._cursor,t),w(e._request).then(function(t){if(t)return new L(t,e._request)})})})}),P.prototype.createIndex=function(){return new I(this._store.createIndex.apply(this._store,arguments))},P.prototype.index=function(){return new I(this._store.index.apply(this._store,arguments))},S(P,"_store",["name","keyPath","indexNames","autoIncrement"]),E(P,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),T(P,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),C(P,"_store",IDBObjectStore,["deleteIndex"]),O.prototype.objectStore=function(){return new P(this._tx.objectStore.apply(this._tx,arguments))},S(O,"_tx",["objectStoreNames","mode"]),C(O,"_tx",IDBTransaction,["abort"]),M.prototype.createObjectStore=function(){return new P(this._db.createObjectStore.apply(this._db,arguments))},S(M,"_db",["name","version","objectStoreNames"]),C(M,"_db",IDBDatabase,["deleteObjectStore","close"]),k.prototype.transaction=function(){return new O(this._db.transaction.apply(this._db,arguments))},S(k,"_db",["name","version","objectStoreNames"]),C(k,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[P,I].forEach(function(t){i in t.prototype&&(t.prototype[i.replace("open","iterate")]=function(){var t=(r=arguments,Array.prototype.slice.call(r)),e=t[t.length-1],r=this._store||this._index,n=r[i].apply(r,t.slice(0,-1));n.onsuccess=function(){e(n.result)}})})}),[I,P].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(t,r){var n=this,i=[];return new Promise(function(e){n.iterateCursor(t,function(t){t?(i.push(t.value),void 0===r||i.length!=r?t.continue():e(i)):e(i)})})})});var F="0.4.19",j=1e4,N="w:"+F,A="FIS_v2",D="https://firebaseinstallations.googleapis.com/v1",R=36e5,x=((x={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',x["not-registered"]="Firebase Installation is not registered.",x["installation-not-found"]="Firebase Installation not found.",x["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',x["app-offline"]="Could not process request. Application offline.",x["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",x),B=new d("installations","Installations",x);function q(t){return t instanceof h&&t.code.includes("request-failed")}function H(t){t=t.projectId;return D+"/projects/"+t+"/installations"}function K(t){return{token:t.token,requestStatus:2,expiresIn:(t=t.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()}}function V(r,n){return f(this,void 0,void 0,function(){var e;return p(this,function(t){switch(t.label){case 0:return[4,n.json()];case 1:return e=t.sent(),e=e.error,[2,B.create("request-failed",{requestName:r,serverCode:e.code,serverMessage:e.message,serverStatus:e.status})]}})})}function z(t){t=t.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function U(t,e){e=e.refreshToken,t=z(t);return t.append("Authorization",A+" "+e),t}function $(r){return f(this,void 0,void 0,function(){var e;return p(this,function(t){switch(t.label){case 0:return[4,r()];case 1:return 500<=(e=t.sent()).status&&e.status<600?[2,r()]:[2,e]}})})}function G(e){return new Promise(function(t){setTimeout(t,e)})}var W=/^[cdef][\w-]{21}$/,J="";function Y(){try{var t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;t=function(t){return btoa(String.fromCharCode.apply(String,n(t))).replace(/\+/g,"-").replace(/\//g,"_")}(t).substr(0,22);return W.test(t)?t:J}catch(t){return J}}function Z(t){return t.appName+"!"+t.appId}var Q=new Map;function X(t,e){var r=Z(t);tt(r,e),t=r,r=e,(e=rt())&&e.postMessage({key:t,fid:r}),nt()}function tt(t,e){var r,n,i=Q.get(t);if(i)try{for(var o=a(i),s=o.next();!s.done;s=o.next())(0,s.value)(e)}catch(t){r={error:t}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}}var et=null;function rt(){return!et&&"BroadcastChannel"in self&&((et=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(t){tt(t.data.key,t.data.fid)}),et}function nt(){0===Q.size&&et&&(et.close(),et=null)}var it,ot,st="firebase-installations-database",at=1,ut="firebase-installations-store",ct=null;function lt(){var t,e,r;return ct||(t=at,e=function(t){0===t.oldVersion&&t.createObjectStore(ut)},(r=(t=_(indexedDB,"open",[st,t])).request)&&(r.onupgradeneeded=function(t){e&&e(new M(r.result,t.oldVersion,r.transaction))}),ct=t.then(function(t){return new k(t)})),ct}function ft(o,s){return f(this,void 0,void 0,function(){var e,r,n,i;return p(this,function(t){switch(t.label){case 0:return e=Z(o),[4,lt()];case 1:return n=t.sent(),r=n.transaction(ut,"readwrite"),[4,(n=r.objectStore(ut)).get(e)];case 2:return i=t.sent(),[4,n.put(s,e)];case 3:return t.sent(),[4,r.complete];case 4:return t.sent(),i&&i.fid===s.fid||X(o,s.fid),[2,s]}})})}function ht(n){return f(this,void 0,void 0,function(){var e,r;return p(this,function(t){switch(t.label){case 0:return e=Z(n),[4,lt()];case 1:return r=t.sent(),[4,(r=r.transaction(ut,"readwrite")).objectStore(ut).delete(e)];case 2:return t.sent(),[4,r.complete];case 3:return t.sent(),[2]}})})}function pt(s,a){return f(this,void 0,void 0,function(){var e,r,n,i,o;return p(this,function(t){switch(t.label){case 0:return e=Z(s),[4,lt()];case 1:return n=t.sent(),r=n.transaction(ut,"readwrite"),[4,(n=r.objectStore(ut)).get(e)];case 2:return i=t.sent(),void 0!==(o=a(i))?[3,4]:[4,n.delete(e)];case 3:return t.sent(),[3,6];case 4:return[4,n.put(o,e)];case 5:t.sent(),t.label=6;case 6:return[4,r.complete];case 7:return t.sent(),!o||i&&i.fid===o.fid||X(s,o.fid),[2,o]}})})}function gt(i){return f(this,void 0,void 0,function(){var e,r,n;return p(this,function(t){switch(t.label){case 0:return[4,pt(i,function(t){t=vt(t||{fid:Y(),registrationStatus:0}),t=function(t,e){{if(0!==e.registrationStatus)return 1===e.registrationStatus?{installationEntry:e,registrationPromise:function(i){return f(this,void 0,void 0,function(){var e,r,n;return p(this,function(t){switch(t.label){case 0:return[4,dt(i)];case 1:e=t.sent(),t.label=2;case 2:return 1!==e.registrationStatus?[3,5]:[4,G(100)];case 3:return t.sent(),[4,dt(i)];case 4:return e=t.sent(),[3,2];case 5:return 0!==e.registrationStatus?[3,7]:[4,gt(i)];case 6:return n=t.sent(),r=n.installationEntry,(n=n.registrationPromise)?[2,n]:[2,r];case 7:return[2,e]}})})}(t)}:{installationEntry:e};if(!navigator.onLine){var r=Promise.reject(B.create("app-offline"));return{installationEntry:e,registrationPromise:r}}e={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},t=function(n,i){return f(this,void 0,void 0,function(){var e,r;return p(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,7]),[4,function(s,t){var a=t.fid;return f(this,void 0,void 0,function(){var e,r,n,i,o;return p(this,function(t){switch(t.label){case 0:return e=H(s),r=z(s),o={fid:a,authVersion:A,appId:s.appId,sdkVersion:N},n={method:"POST",headers:r,body:JSON.stringify(o)},[4,$(function(){return fetch(e,n)})];case 1:return(i=t.sent()).ok?[4,i.json()]:[3,3];case 2:return o=t.sent(),[2,{fid:o.fid||a,registrationStatus:2,refreshToken:o.refreshToken,authToken:K(o.authToken)}];case 3:return[4,V("Create Installation",i)];case 4:throw t.sent()}})})}(n,i)];case 1:return e=t.sent(),[2,ft(n,e)];case 2:return q(r=t.sent())&&409===r.customData.serverCode?[4,ht(n)]:[3,4];case 3:return t.sent(),[3,6];case 4:return[4,ft(n,{fid:i.fid,registrationStatus:0})];case 5:t.sent(),t.label=6;case 6:throw r;case 7:return[2]}})})}(t,e);return{installationEntry:e,registrationPromise:t}}}(i,t);return e=t.registrationPromise,t.installationEntry})];case 1:return(r=t.sent()).fid!==J?[3,3]:(n={},[4,e]);case 2:return[2,(n.installationEntry=t.sent(),n)];case 3:return[2,{installationEntry:r,registrationPromise:e}]}})})}function dt(t){return pt(t,function(t){if(!t)throw B.create("installation-not-found");return vt(t)})}function vt(t){return 1===(e=t).registrationStatus&&e.registrationTime+j<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e}function mt(t,s){var a=t.appConfig,u=t.platformLoggerProvider;return f(this,void 0,void 0,function(){var e,r,n,i,o;return p(this,function(t){switch(t.label){case 0:return e=function(t,e){e=e.fid;return H(t)+"/"+e+"/authTokens:generate"}(a,s),r=U(a,s),(o=u.getImmediate({optional:!0}))&&r.append("x-firebase-client",o.getPlatformInfoString()),o={installation:{sdkVersion:N}},n={method:"POST",headers:r,body:JSON.stringify(o)},[4,$(function(){return fetch(e,n)})];case 1:return(i=t.sent()).ok?[4,i.json()]:[3,3];case 2:return o=t.sent(),[2,K(o)];case 3:return[4,V("Generate Auth Token",i)];case 4:throw t.sent()}})})}function yt(i,o){return void 0===o&&(o=!1),f(this,void 0,void 0,function(){var n,e,r;return p(this,function(t){switch(t.label){case 0:return[4,pt(i.appConfig,function(t){if(!wt(t))throw B.create("not-registered");var e,r=t.authToken;if(o||2!==(e=r).requestStatus||function(t){var e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+R}(e)){if(1===r.requestStatus)return n=function(r,n){return f(this,void 0,void 0,function(){var e;return p(this,function(t){switch(t.label){case 0:return[4,bt(r.appConfig)];case 1:e=t.sent(),t.label=2;case 2:return 1!==e.authToken.requestStatus?[3,5]:[4,G(100)];case 3:return t.sent(),[4,bt(r.appConfig)];case 4:return e=t.sent(),[3,2];case 5:return 0===(e=e.authToken).requestStatus?[2,yt(r,n)]:[2,e]}})})}(i,o),t;if(!navigator.onLine)throw B.create("app-offline");r=(e=t,r={requestStatus:1,requestTime:Date.now()},s(s({},e),{authToken:r}));return n=function(i,o){return f(this,void 0,void 0,function(){var e,r,n;return p(this,function(t){switch(t.label){case 0:return t.trys.push([0,3,,8]),[4,mt(i,o)];case 1:return e=t.sent(),n=s(s({},o),{authToken:e}),[4,ft(i.appConfig,n)];case 2:return t.sent(),[2,e];case 3:return!q(r=t.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,ht(i.appConfig)];case 4:return t.sent(),[3,7];case 5:return n=s(s({},o),{authToken:{requestStatus:0}}),[4,ft(i.appConfig,n)];case 6:t.sent(),t.label=7;case 7:throw r;case 8:return[2]}})})}(i,r),r}return t})];case 1:return e=t.sent(),n?[4,n]:[3,3];case 2:return r=t.sent(),[3,4];case 3:r=e.authToken,t.label=4;case 4:return[2,r]}})})}function bt(t){return pt(t,function(t){if(!wt(t))throw B.create("not-registered");var e=t.authToken;return 1===(e=e).requestStatus&&e.requestTime+j<Date.now()?s(s({},t),{authToken:{requestStatus:0}}):t})}function wt(t){return void 0!==t&&2===t.registrationStatus}function _t(e,r){return void 0===r&&(r=!1),f(this,void 0,void 0,function(){return p(this,function(t){switch(t.label){case 0:return[4,function(r){return f(this,void 0,void 0,function(){var e;return p(this,function(t){switch(t.label){case 0:return[4,gt(r)];case 1:return(e=t.sent().registrationPromise)?[4,e]:[3,3];case 2:t.sent(),t.label=3;case 3:return[2]}})})}(e.appConfig)];case 1:return t.sent(),[4,yt(e,r)];case 2:return[2,t.sent().token]}})})}function St(i,o){return f(this,void 0,void 0,function(){var e,r,n;return p(this,function(t){switch(t.label){case 0:return e=function(t,e){e=e.fid;return H(t)+"/"+e}(i,o),n=U(i,o),r={method:"DELETE",headers:n},[4,$(function(){return fetch(e,r)})];case 1:return(n=t.sent()).ok?[3,3]:[4,V("Delete Installation",n)];case 2:throw t.sent();case 3:return[2]}})})}function Et(t,n){var i=t.appConfig;return function(t,e){rt();var r=Z(t);(t=Q.get(r))||(t=new Set,Q.set(r,t)),t.add(e)}(i,n),function(){var t,e,r;e=n,r=Z(t=i),(t=Q.get(r))&&(t.delete(e),0===t.size&&Q.delete(r),nt())}}function Ct(t){return B.create("missing-app-config-values",{valueName:t})}function Tt(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),i=0,e=0;e<r;e++)for(var o=arguments[e],s=0,a=o.length;s<a;s++,i++)n[i]=o[s];return n}(it=e.default).INTERNAL.registerComponent(new y("installations",function(t){var e=t.getProvider("app").getImmediate(),r={appConfig:function(t){var e,r;if(!t||!t.options)throw Ct("App Configuration");if(!t.name)throw Ct("App Name");try{for(var n=a(["projectId","apiKey","appId"]),i=n.next();!i.done;i=n.next()){var o=i.value;if(!t.options[o])throw Ct(o)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e),platformLoggerProvider:t.getProvider("platform-logger")};return{app:e,getId:function(){return function(n){return f(this,void 0,void 0,function(){var e,r;return p(this,function(t){switch(t.label){case 0:return[4,gt(n.appConfig)];case 1:return e=t.sent(),r=e.installationEntry,(e.registrationPromise||yt(n)).catch(console.error),[2,r.fid]}})})}(r)},getToken:function(t){return _t(r,t)},delete:function(){return function(n){return f(this,void 0,void 0,function(){var e,r;return p(this,function(t){switch(t.label){case 0:return[4,pt(e=n.appConfig,function(t){if(!t||0!==t.registrationStatus)return t})];case 1:if(!(r=t.sent()))return[3,6];if(1!==r.registrationStatus)return[3,2];throw B.create("delete-pending-registration");case 2:if(2!==r.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw B.create("app-offline");case 3:return[4,St(e,r)];case 4:return t.sent(),[4,ht(e)];case 5:t.sent(),t.label=6;case 6:return[2]}})})}(r)},onIdChange:function(t){return Et(r,t)}}},"PUBLIC")),it.registerVersion("@firebase/installations",F),(x=ot=ot||{})[x.DEBUG=0]="DEBUG",x[x.VERBOSE=1]="VERBOSE",x[x.INFO=2]="INFO",x[x.WARN=3]="WARN",x[x.ERROR=4]="ERROR",x[x.SILENT=5]="SILENT";function It(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=(new Date).toISOString(),o=Ot[e];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[o].apply(console,Tt(["["+i+"]  "+t.name+":"],r))}}var Lt={debug:ot.DEBUG,verbose:ot.VERBOSE,info:ot.INFO,warn:ot.WARN,error:ot.ERROR,silent:ot.SILENT},Pt=ot.INFO,Ot=((x={})[ot.DEBUG]="log",x[ot.VERBOSE]="log",x[ot.INFO]="info",x[ot.WARN]="warn",x[ot.ERROR]="error",x),Mt=(Object.defineProperty(kt.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in ot))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),kt.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?Lt[t]:t},Object.defineProperty(kt.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(kt.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),kt.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Tt([this,ot.DEBUG],t)),this._logHandler.apply(this,Tt([this,ot.DEBUG],t))},kt.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Tt([this,ot.VERBOSE],t)),this._logHandler.apply(this,Tt([this,ot.VERBOSE],t))},kt.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Tt([this,ot.INFO],t)),this._logHandler.apply(this,Tt([this,ot.INFO],t))},kt.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Tt([this,ot.WARN],t)),this._logHandler.apply(this,Tt([this,ot.WARN],t))},kt.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Tt([this,ot.ERROR],t)),this._logHandler.apply(this,Tt([this,ot.ERROR],t))},kt);function kt(t){this.name=t,this._logLevel=Pt,this._logHandler=It,this._userLogHandler=null}var Ft=(jt.prototype.isCachedDataFresh=function(t,e){if(!e)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;var r=Date.now()-e,e=r<=t;return this.logger.debug("Config fetch cache check. Cache age millis: "+r+". Cache max age millis (minimumFetchIntervalMillis setting): "+t+". Is cache hit: "+e+"."),e},jt.prototype.fetch=function(i){return f(this,void 0,void 0,function(){var e,r,n;return p(this,function(t){switch(t.label){case 0:return[4,Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()])];case 1:return(n=t.sent(),e=n[0],(n=n[1])&&this.isCachedDataFresh(i.cacheMaxAgeMillis,e))?[2,n]:(i.eTag=n&&n.eTag,[4,this.client.fetch(i)]);case 2:return r=t.sent(),n=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())],200===r.status&&n.push(this.storage.setLastSuccessfulFetchResponse(r)),[4,Promise.all(n)];case 3:return t.sent(),[2,r]}})})},jt);function jt(t,e,r,n){this.client=t,this.storage=e,this.storageCache=r,this.logger=n}var x=((x={})["registration-window"]="Undefined window object. This SDK only supports usage in a browser environment.",x["registration-project-id"]="Undefined project identifier. Check Firebase app initialization.",x["registration-api-key"]="Undefined API key. Check Firebase app initialization.",x["registration-app-id"]="Undefined app identifier. Check Firebase app initialization.",x["storage-open"]="Error thrown when opening storage. Original error: {$originalErrorMessage}.",x["storage-get"]="Error thrown when reading from storage. Original error: {$originalErrorMessage}.",x["storage-set"]="Error thrown when writing to storage. Original error: {$originalErrorMessage}.",x["storage-delete"]="Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",x["fetch-client-network"]="Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",x["fetch-timeout"]='The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',x["fetch-throttle"]='The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',x["fetch-client-parse"]="Fetch client could not parse response. Original error: {$originalErrorMessage}.",x["fetch-status"]="Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",x),Nt=new d("remoteconfig","Remote Config",x);var At=(Dt.prototype.fetch=function(h){return f(this,void 0,void 0,function(){var r,n,i,o,s,a,u,c,l,f;return p(this,function(t){switch(t.label){case 0:return[4,Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()])];case 1:o=t.sent(),r=o[0],i=o[1],n=window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com",o=n+"/v1/projects/"+this.projectId+"/namespaces/"+this.namespace+":fetch?key="+this.apiKey,n={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":h.eTag||"*"},i={sdk_version:this.sdkVersion,app_instance_id:r,app_instance_id_token:i,app_id:this.appId,language_code:(e=void 0===e?navigator:e).languages&&e.languages[0]||e.language},i={method:"POST",headers:n,body:JSON.stringify(i)},o=fetch(o,i),i=new Promise(function(t,e){h.signal.addEventListener(function(){var t=new Error("The operation was aborted.");t.name="AbortError",e(t)})}),t.label=2;case 2:return t.trys.push([2,5,,6]),[4,Promise.race([o,i])];case 3:return t.sent(),[4,o];case 4:return f=t.sent(),[3,6];case 5:throw i=t.sent(),o="fetch-client-network","AbortError"===i.name&&(o="fetch-timeout"),Nt.create(o,{originalErrorMessage:i.message});case 6:if(s=f.status,a=f.headers.get("ETag")||void 0,200!==f.status)return[3,11];l=void 0,t.label=7;case 7:return t.trys.push([7,9,,10]),[4,f.json()];case 8:return l=t.sent(),[3,10];case 9:throw f=t.sent(),Nt.create("fetch-client-parse",{originalErrorMessage:f.message});case 10:u=l.entries,c=l.state,t.label=11;case 11:if("INSTANCE_STATE_UNSPECIFIED"===c?s=500:"NO_CHANGE"===c?s=304:"NO_TEMPLATE"!==c&&"EMPTY_CONFIG"!==c||(u={}),304!==s&&200!==s)throw Nt.create("fetch-status",{httpStatus:s});return[2,{status:s,eTag:a,config:u}]}var e})})},Dt);function Dt(t,e,r,n,i,o){this.firebaseInstallations=t,this.sdkVersion=e,this.namespace=r,this.projectId=n,this.apiKey=i,this.appId=o}var Rt=(xt.prototype.addEventListener=function(t){this.listeners.push(t)},xt.prototype.abort=function(){this.listeners.forEach(function(t){return t()})},xt);function xt(){this.listeners=[]}var Bt=["1","true","t","yes","y","on"],qt=(Ht.prototype.asString=function(){return this._value},Ht.prototype.asBoolean=function(){return"static"!==this._source&&0<=Bt.indexOf(this._value.toLowerCase())},Ht.prototype.asNumber=function(){if("static"===this._source)return 0;var t=Number(this._value);return t=isNaN(t)?0:t},Ht.prototype.getSource=function(){return this._source},Ht);function Ht(t,e){void 0===e&&(e=""),this._source=t,this._value=e}var Kt=(Vt.prototype.setLogLevel=function(t){switch(t){case"debug":this._logger.logLevel=ot.DEBUG;break;case"silent":this._logger.logLevel=ot.SILENT;break;default:this._logger.logLevel=ot.ERROR}},Object.defineProperty(Vt.prototype,"fetchTimeMillis",{get:function(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1},enumerable:!1,configurable:!0}),Object.defineProperty(Vt.prototype,"lastFetchStatus",{get:function(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"},enumerable:!1,configurable:!0}),Vt.prototype.activate=function(){return f(this,void 0,void 0,function(){var e,r;return p(this,function(t){switch(t.label){case 0:return[4,Promise.all([this._storage.getLastSuccessfulFetchResponse(),this._storage.getActiveConfigEtag()])];case 1:return r=t.sent(),e=r[0],r=r[1],e&&e.config&&e.eTag&&e.eTag!==r?[4,Promise.all([this._storageCache.setActiveConfig(e.config),this._storage.setActiveConfigEtag(e.eTag)])]:[2,!1];case 2:return t.sent(),[2,!0]}})})},Vt.prototype.ensureInitialized=function(){var t=this;return this._initializePromise||(this._initializePromise=this._storageCache.loadFromStorage().then(function(){t._isInitializationComplete=!0})),this._initializePromise},Vt.prototype.fetch=function(){return f(this,void 0,void 0,function(){var n,i,o,s=this;return p(this,function(t){switch(t.label){case 0:n=new Rt,setTimeout(function(){return f(s,void 0,void 0,function(){return p(this,function(t){return n.abort(),[2]})})},this.settings.fetchTimeoutMillis),t.label=1;case 1:return t.trys.push([1,4,,6]),[4,this._client.fetch({cacheMaxAgeMillis:this.settings.minimumFetchIntervalMillis,signal:n})];case 2:return t.sent(),[4,this._storageCache.setLastFetchStatus("success")];case 3:return t.sent(),[3,6];case 4:return i=t.sent(),r="fetch-throttle",o=(e=i)instanceof h&&-1!==e.code.indexOf(r)?"throttle":"failure",[4,this._storageCache.setLastFetchStatus(o)];case 5:throw t.sent(),i;case 6:return[2]}var e,r})})},Vt.prototype.fetchAndActivate=function(){return f(this,void 0,void 0,function(){return p(this,function(t){switch(t.label){case 0:return[4,this.fetch()];case 1:return t.sent(),[2,this.activate()]}})})},Vt.prototype.getAll=function(){var r=this;return function(t,e){void 0===t&&(t={});void 0===e&&(e={});return Object.keys(s(s({},t),e))}(this._storageCache.getActiveConfig(),this.defaultConfig).reduce(function(t,e){return t[e]=r.getValue(e),t},{})},Vt.prototype.getBoolean=function(t){return this.getValue(t).asBoolean()},Vt.prototype.getNumber=function(t){return this.getValue(t).asNumber()},Vt.prototype.getString=function(t){return this.getValue(t).asString()},Vt.prototype.getValue=function(t){this._isInitializationComplete||this._logger.debug('A value was requested for key "'+t+'" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.');var e=this._storageCache.getActiveConfig();return e&&void 0!==e[t]?new qt("remote",e[t]):this.defaultConfig&&void 0!==this.defaultConfig[t]?new qt("default",String(this.defaultConfig[t])):(this._logger.debug('Returning static value for key "'+t+'". Define a default or remote value if this is unintentional.'),new qt("static"))},Vt);function Vt(t,e,r,n,i){this.app=t,this._client=e,this._storageCache=r,this._storage=n,this._logger=i,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:6e4,minimumFetchIntervalMillis:432e5},this.defaultConfig={}}function zt(t,e){t=t.target.error||void 0;return Nt.create(e,{originalErrorMessage:t&&t.message})}var Ut="app_namespace_store",$t="firebase_remote_config",Gt=1;var Wt=(Jt.prototype.getLastFetchStatus=function(){return this.get("last_fetch_status")},Jt.prototype.setLastFetchStatus=function(t){return this.set("last_fetch_status",t)},Jt.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.get("last_successful_fetch_timestamp_millis")},Jt.prototype.setLastSuccessfulFetchTimestampMillis=function(t){return this.set("last_successful_fetch_timestamp_millis",t)},Jt.prototype.getLastSuccessfulFetchResponse=function(){return this.get("last_successful_fetch_response")},Jt.prototype.setLastSuccessfulFetchResponse=function(t){return this.set("last_successful_fetch_response",t)},Jt.prototype.getActiveConfig=function(){return this.get("active_config")},Jt.prototype.setActiveConfig=function(t){return this.set("active_config",t)},Jt.prototype.getActiveConfigEtag=function(){return this.get("active_config_etag")},Jt.prototype.setActiveConfigEtag=function(t){return this.set("active_config_etag",t)},Jt.prototype.getThrottleMetadata=function(){return this.get("throttle_metadata")},Jt.prototype.setThrottleMetadata=function(t){return this.set("throttle_metadata",t)},Jt.prototype.deleteThrottleMetadata=function(){return this.delete("throttle_metadata")},Jt.prototype.get=function(a){return f(this,void 0,void 0,function(){var o,s=this;return p(this,function(t){switch(t.label){case 0:return[4,this.openDbPromise];case 1:return o=t.sent(),[2,new Promise(function(e,r){var t=o.transaction([Ut],"readonly").objectStore(Ut),n=s.createCompositeKey(a);try{var i=t.get(n);i.onerror=function(t){r(zt(t,"storage-get"))},i.onsuccess=function(t){t=t.target.result;e(t?t.value:void 0)}}catch(t){r(Nt.create("storage-get",{originalErrorMessage:t&&t.message}))}})]}})})},Jt.prototype.set=function(a,u){return f(this,void 0,void 0,function(){var o,s=this;return p(this,function(t){switch(t.label){case 0:return[4,this.openDbPromise];case 1:return o=t.sent(),[2,new Promise(function(t,e){var r=o.transaction([Ut],"readwrite").objectStore(Ut),n=s.createCompositeKey(a);try{var i=r.put({compositeKey:n,value:u});i.onerror=function(t){e(zt(t,"storage-set"))},i.onsuccess=function(){t()}}catch(t){e(Nt.create("storage-set",{originalErrorMessage:t&&t.message}))}})]}})})},Jt.prototype.delete=function(a){return f(this,void 0,void 0,function(){var o,s=this;return p(this,function(t){switch(t.label){case 0:return[4,this.openDbPromise];case 1:return o=t.sent(),[2,new Promise(function(t,e){var r=o.transaction([Ut],"readwrite").objectStore(Ut),n=s.createCompositeKey(a);try{var i=r.delete(n);i.onerror=function(t){e(zt(t,"storage-delete"))},i.onsuccess=function(){t()}}catch(t){e(Nt.create("storage-delete",{originalErrorMessage:t&&t.message}))}})]}})})},Jt.prototype.createCompositeKey=function(t){return[this.appId,this.appName,this.namespace,t].join()},Jt);function Jt(t,e,r,n){void 0===n&&(n=new Promise(function(e,r){var t=indexedDB.open($t,Gt);t.onerror=function(t){r(zt(t,"storage-open"))},t.onsuccess=function(t){e(t.target.result)},t.onupgradeneeded=function(t){var e=t.target.result;0===t.oldVersion&&e.createObjectStore(Ut,{keyPath:"compositeKey"})}})),this.appId=t,this.appName=e,this.namespace=r,this.openDbPromise=n}var Yt=(Zt.prototype.getLastFetchStatus=function(){return this.lastFetchStatus},Zt.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.lastSuccessfulFetchTimestampMillis},Zt.prototype.getActiveConfig=function(){return this.activeConfig},Zt.prototype.loadFromStorage=function(){return f(this,void 0,void 0,function(){var e,r,n;return p(this,function(t){switch(t.label){case 0:return e=this.storage.getLastFetchStatus(),r=this.storage.getLastSuccessfulFetchTimestampMillis(),n=this.storage.getActiveConfig(),[4,e];case 1:return(e=t.sent())&&(this.lastFetchStatus=e),[4,r];case 2:return(r=t.sent())&&(this.lastSuccessfulFetchTimestampMillis=r),[4,n];case 3:return(n=t.sent())&&(this.activeConfig=n),[2]}})})},Zt.prototype.setLastFetchStatus=function(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)},Zt.prototype.setLastSuccessfulFetchTimestampMillis=function(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)},Zt.prototype.setActiveConfig=function(t){return this.activeConfig=t,this.storage.setActiveConfig(t)},Zt);function Zt(t){this.storage=t}var Qt=(Xt.prototype.fetch=function(r){return f(this,void 0,void 0,function(){var e;return p(this,function(t){switch(t.label){case 0:return[4,this.storage.getThrottleMetadata()];case 1:return e=t.sent()||{backoffCount:0,throttleEndTimeMillis:Date.now()},[2,this.attemptFetch(r,e)]}})})},Xt.prototype.attemptFetch=function(u,t){var c=t.throttleEndTimeMillis,l=t.backoffCount;return f(this,void 0,void 0,function(){var s,a;return p(this,function(t){switch(t.label){case 0:return[4,(i=u.signal,o=c,new Promise(function(t,e){var r=Math.max(o-Date.now(),0),n=setTimeout(t,r);i.addEventListener(function(){clearTimeout(n),e(Nt.create("fetch-throttle",{throttleEndTimeMillis:o}))})}))];case 1:t.sent(),t.label=2;case 2:return t.trys.push([2,5,,7]),[4,this.client.fetch(u)];case 3:return s=t.sent(),[4,this.storage.deleteThrottleMetadata()];case 4:return t.sent(),[2,s];case 5:if(!function(t){if(t instanceof h&&t.customData){t=Number(t.customData.httpStatus);return 429===t||500===t||503===t||504===t}}(a=t.sent()))throw a;return a={throttleEndTimeMillis:Date.now()+(e=l,void 0===n&&(n=2),n=(r=void 0===r?1e3:r)*Math.pow(n,e),e=Math.round(.5*n*(Math.random()-.5)*2),Math.min(144e5,n+e)),backoffCount:l+1},[4,this.storage.setThrottleMetadata(a)];case 6:return t.sent(),[2,this.attemptFetch(u,a)];case 7:return[2]}var e,r,n,i,o})})},Xt);function Xt(t,e){this.client=t,this.storage=e}var te,ee="@firebase/remote-config";(te=e.default).INTERNAL.registerComponent(new y("remoteConfig",function(t,e){var r=t.getProvider("app").getImmediate(),n=t.getProvider("installations").getImmediate();if("undefined"==typeof window)throw Nt.create("registration-window");var i=r.options,o=i.projectId,s=i.apiKey,a=i.appId;if(!o)throw Nt.create("registration-project-id");if(!s)throw Nt.create("registration-api-key");if(!a)throw Nt.create("registration-app-id");e=e||"firebase";var u=new Wt(a,r.name,e),t=new Yt(u),i=new Mt(ee);i.logLevel=ot.ERROR;a=new At(n,te.SDK_VERSION,e,o,s,a),a=new Qt(a,u),a=new Ft(a,u,t,i),i=new Kt(r,a,t,u,i);return i.ensureInitialized(),i},"PUBLIC").setMultipleInstances(!0)),te.registerVersion(ee,"0.1.30")}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-remote-config.js - be sure to load firebase-app.js first.")}});
