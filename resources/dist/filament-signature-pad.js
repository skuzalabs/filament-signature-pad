(()=>{var v=class{constructor(t,i,e,o){if(isNaN(t)||isNaN(i))throw new Error(`Point is invalid: (${t}, ${i})`);this.x=+t,this.y=+i,this.pressure=e||0,this.time=o||Date.now()}distanceTo(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}equals(t){return this.x===t.x&&this.y===t.y&&this.pressure===t.pressure&&this.time===t.time}velocityFrom(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):0}},w=class{constructor(t,i,e,o,n,r){this.startPoint=t,this.control2=i,this.control1=e,this.endPoint=o,this.startWidth=n,this.endWidth=r}static fromPoints(t,i){let e=this.calculateControlPoints(t[0],t[1],t[2]).c2,o=this.calculateControlPoints(t[1],t[2],t[3]).c1;return new w(t[1],e,o,t[2],i.start,i.end)}static calculateControlPoints(t,i,e){let o=t.x-i.x,n=t.y-i.y,r=i.x-e.x,h=i.y-e.y,a={x:(t.x+i.x)/2,y:(t.y+i.y)/2},s={x:(i.x+e.x)/2,y:(i.y+e.y)/2},d=Math.sqrt(o*o+n*n),c=Math.sqrt(r*r+h*h),m=a.x-s.x,l=a.y-s.y,u=c/(d+c),g={x:s.x+m*u,y:s.y+l*u},p=i.x-g.x,x=i.y-g.y;return{c1:new v(a.x+p,a.y+x),c2:new v(s.x+p,s.y+x)}}length(){let t=10,i=0,e,o;for(let n=0;n<=t;n+=1){let r=n/t,h=this.point(r,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),a=this.point(r,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(n>0){let s=h-e,d=a-o;i+=Math.sqrt(s*s+d*d)}e=h,o=a}return i}point(t,i,e,o,n){return i*(1-t)*(1-t)*(1-t)+3*e*(1-t)*(1-t)*t+3*o*(1-t)*t*t+n*t*t*t}},y=class{constructor(){try{this._et=new EventTarget}catch(t){this._et=document}}addEventListener(t,i,e){this._et.addEventListener(t,i,e)}dispatchEvent(t){return this._et.dispatchEvent(t)}removeEventListener(t,i,e){this._et.removeEventListener(t,i,e)}};function P(f,t=250){let i=0,e=null,o,n,r,h=()=>{i=Date.now(),e=null,o=f.apply(n,r),e||(n=null,r=[])};return function(...s){let d=Date.now(),c=t-(d-i);return n=this,r=s,c<=0||c>t?(e&&(clearTimeout(e),e=null),i=d,o=f.apply(n,r),e||(n=null,r=[])):e||(e=window.setTimeout(h,c)),o}}var _=class extends y{constructor(t,i={}){super();this.canvas=t,this._handleMouseDown=e=>{e.buttons===1&&(this._drawningStroke=!0,this._strokeBegin(e))},this._handleMouseMove=e=>{this._drawningStroke&&this._strokeMoveUpdate(e)},this._handleMouseUp=e=>{e.buttons===1&&this._drawningStroke&&(this._drawningStroke=!1,this._strokeEnd(e))},this._handleTouchStart=e=>{if(e.cancelable&&e.preventDefault(),e.targetTouches.length===1){let o=e.changedTouches[0];this._strokeBegin(o)}},this._handleTouchMove=e=>{e.cancelable&&e.preventDefault();let o=e.targetTouches[0];this._strokeMoveUpdate(o)},this._handleTouchEnd=e=>{if(e.target===this.canvas){e.cancelable&&e.preventDefault();let n=e.changedTouches[0];this._strokeEnd(n)}},this._handlePointerStart=e=>{this._drawningStroke=!0,e.preventDefault(),this._strokeBegin(e)},this._handlePointerMove=e=>{this._drawningStroke&&(e.preventDefault(),this._strokeMoveUpdate(e))},this._handlePointerEnd=e=>{this._drawningStroke&&(e.preventDefault(),this._drawningStroke=!1,this._strokeEnd(e))},this.velocityFilterWeight=i.velocityFilterWeight||.7,this.minWidth=i.minWidth||.5,this.maxWidth=i.maxWidth||2.5,this.throttle="throttle"in i?i.throttle:16,this.minDistance="minDistance"in i?i.minDistance:5,this.dotSize=i.dotSize||0,this.penColor=i.penColor||"black",this.backgroundColor=i.backgroundColor||"rgba(0,0,0,0)",this._strokeMoveUpdate=this.throttle?P(_.prototype._strokeUpdate,this.throttle):_.prototype._strokeUpdate,this._ctx=t.getContext("2d"),this.clear(),this.on()}clear(){let{_ctx:t,canvas:i}=this;t.fillStyle=this.backgroundColor,t.clearRect(0,0,i.width,i.height),t.fillRect(0,0,i.width,i.height),this._data=[],this._reset(this._getPointGroupOptions()),this._isEmpty=!0}fromDataURL(t,i={}){return new Promise((e,o)=>{let n=new Image,r=i.ratio||window.devicePixelRatio||1,h=i.width||this.canvas.width/r,a=i.height||this.canvas.height/r,s=i.xOffset||0,d=i.yOffset||0;this._reset(this._getPointGroupOptions()),n.onload=()=>{this._ctx.drawImage(n,s,d,h,a),e()},n.onerror=c=>{o(c)},n.crossOrigin="anonymous",n.src=t,this._isEmpty=!1})}toDataURL(t="image/png",i){switch(t){case"image/svg+xml":return typeof i!="object"&&(i=void 0),`data:image/svg+xml;base64,${btoa(this.toSVG(i))}`;default:return typeof i!="number"&&(i=void 0),this.canvas.toDataURL(t,i)}}on(){this.canvas.style.touchAction="none",this.canvas.style.msTouchAction="none",this.canvas.style.userSelect="none";let t=/Macintosh/.test(navigator.userAgent)&&"ontouchstart"in document;window.PointerEvent&&!t?this._handlePointerEvents():(this._handleMouseEvents(),"ontouchstart"in window&&this._handleTouchEvents())}off(){this.canvas.style.touchAction="auto",this.canvas.style.msTouchAction="auto",this.canvas.style.userSelect="auto",this.canvas.removeEventListener("pointerdown",this._handlePointerStart),this.canvas.removeEventListener("pointermove",this._handlePointerMove),this.canvas.ownerDocument.removeEventListener("pointerup",this._handlePointerEnd),this.canvas.removeEventListener("mousedown",this._handleMouseDown),this.canvas.removeEventListener("mousemove",this._handleMouseMove),this.canvas.ownerDocument.removeEventListener("mouseup",this._handleMouseUp),this.canvas.removeEventListener("touchstart",this._handleTouchStart),this.canvas.removeEventListener("touchmove",this._handleTouchMove),this.canvas.removeEventListener("touchend",this._handleTouchEnd)}isEmpty(){return this._isEmpty}fromData(t,{clear:i=!0}={}){i&&this.clear(),this._fromData(t,this._drawCurve.bind(this),this._drawDot.bind(this)),this._data=this._data.concat(t)}toData(){return this._data}_getPointGroupOptions(t){return{penColor:t&&"penColor"in t?t.penColor:this.penColor,dotSize:t&&"dotSize"in t?t.dotSize:this.dotSize,minWidth:t&&"minWidth"in t?t.minWidth:this.minWidth,maxWidth:t&&"maxWidth"in t?t.maxWidth:this.maxWidth,velocityFilterWeight:t&&"velocityFilterWeight"in t?t.velocityFilterWeight:this.velocityFilterWeight}}_strokeBegin(t){this.dispatchEvent(new CustomEvent("beginStroke",{detail:t}));let i=this._getPointGroupOptions(),e=Object.assign(Object.assign({},i),{points:[]});this._data.push(e),this._reset(i),this._strokeUpdate(t)}_strokeUpdate(t){if(this._data.length===0){this._strokeBegin(t);return}this.dispatchEvent(new CustomEvent("beforeUpdateStroke",{detail:t}));let i=t.clientX,e=t.clientY,o=t.pressure!==void 0?t.pressure:t.force!==void 0?t.force:0,n=this._createPoint(i,e,o),r=this._data[this._data.length-1],h=r.points,a=h.length>0&&h[h.length-1],s=a?n.distanceTo(a)<=this.minDistance:!1,d=this._getPointGroupOptions(r);if(!a||!(a&&s)){let c=this._addPoint(n,d);a?c&&this._drawCurve(c,d):this._drawDot(n,d),h.push({time:n.time,x:n.x,y:n.y,pressure:n.pressure})}this.dispatchEvent(new CustomEvent("afterUpdateStroke",{detail:t}))}_strokeEnd(t){this._strokeUpdate(t),this.dispatchEvent(new CustomEvent("endStroke",{detail:t}))}_handlePointerEvents(){this._drawningStroke=!1,this.canvas.addEventListener("pointerdown",this._handlePointerStart),this.canvas.addEventListener("pointermove",this._handlePointerMove),this.canvas.ownerDocument.addEventListener("pointerup",this._handlePointerEnd)}_handleMouseEvents(){this._drawningStroke=!1,this.canvas.addEventListener("mousedown",this._handleMouseDown),this.canvas.addEventListener("mousemove",this._handleMouseMove),this.canvas.ownerDocument.addEventListener("mouseup",this._handleMouseUp)}_handleTouchEvents(){this.canvas.addEventListener("touchstart",this._handleTouchStart),this.canvas.addEventListener("touchmove",this._handleTouchMove),this.canvas.addEventListener("touchend",this._handleTouchEnd)}_reset(t){this._lastPoints=[],this._lastVelocity=0,this._lastWidth=(t.minWidth+t.maxWidth)/2,this._ctx.fillStyle=t.penColor}_createPoint(t,i,e){let o=this.canvas.getBoundingClientRect();return new v(t-o.left,i-o.top,e,new Date().getTime())}_addPoint(t,i){let{_lastPoints:e}=this;if(e.push(t),e.length>2){e.length===3&&e.unshift(e[0]);let o=this._calculateCurveWidths(e[1],e[2],i),n=w.fromPoints(e,o);return e.shift(),n}return null}_calculateCurveWidths(t,i,e){let o=e.velocityFilterWeight*i.velocityFrom(t)+(1-e.velocityFilterWeight)*this._lastVelocity,n=this._strokeWidth(o,e),r={end:n,start:this._lastWidth};return this._lastVelocity=o,this._lastWidth=n,r}_strokeWidth(t,i){return Math.max(i.maxWidth/(t+1),i.minWidth)}_drawCurveSegment(t,i,e){let o=this._ctx;o.moveTo(t,i),o.arc(t,i,e,0,2*Math.PI,!1),this._isEmpty=!1}_drawCurve(t,i){let e=this._ctx,o=t.endWidth-t.startWidth,n=Math.ceil(t.length())*2;e.beginPath(),e.fillStyle=i.penColor;for(let r=0;r<n;r+=1){let h=r/n,a=h*h,s=a*h,d=1-h,c=d*d,m=c*d,l=m*t.startPoint.x;l+=3*c*h*t.control1.x,l+=3*d*a*t.control2.x,l+=s*t.endPoint.x;let u=m*t.startPoint.y;u+=3*c*h*t.control1.y,u+=3*d*a*t.control2.y,u+=s*t.endPoint.y;let g=Math.min(t.startWidth+s*o,i.maxWidth);this._drawCurveSegment(l,u,g)}e.closePath(),e.fill()}_drawDot(t,i){let e=this._ctx,o=i.dotSize>0?i.dotSize:(i.minWidth+i.maxWidth)/2;e.beginPath(),this._drawCurveSegment(t.x,t.y,o),e.closePath(),e.fillStyle=i.penColor,e.fill()}_fromData(t,i,e){for(let o of t){let{points:n}=o,r=this._getPointGroupOptions(o);if(n.length>1)for(let h=0;h<n.length;h+=1){let a=n[h],s=new v(a.x,a.y,a.pressure,a.time);h===0&&this._reset(r);let d=this._addPoint(s,r);d&&i(d,r)}else this._reset(r),e(n[0],r)}}toSVG({includeBackgroundColor:t=!1}={}){let i=this._data,e=Math.max(window.devicePixelRatio||1,1),o=0,n=0,r=this.canvas.width/e,h=this.canvas.height/e,a=document.createElementNS("http://www.w3.org/2000/svg","svg");if(a.setAttribute("xmlns","http://www.w3.org/2000/svg"),a.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),a.setAttribute("viewBox",`${o} ${n} ${r} ${h}`),a.setAttribute("width",r.toString()),a.setAttribute("height",h.toString()),t&&this.backgroundColor){let s=document.createElement("rect");s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.setAttribute("fill",this.backgroundColor),a.appendChild(s)}return this._fromData(i,(s,{penColor:d})=>{let c=document.createElement("path");if(!isNaN(s.control1.x)&&!isNaN(s.control1.y)&&!isNaN(s.control2.x)&&!isNaN(s.control2.y)){let m=`M ${s.startPoint.x.toFixed(3)},${s.startPoint.y.toFixed(3)} C ${s.control1.x.toFixed(3)},${s.control1.y.toFixed(3)} ${s.control2.x.toFixed(3)},${s.control2.y.toFixed(3)} ${s.endPoint.x.toFixed(3)},${s.endPoint.y.toFixed(3)}`;c.setAttribute("d",m),c.setAttribute("stroke-width",(s.endWidth*2.25).toFixed(3)),c.setAttribute("stroke",d),c.setAttribute("fill","none"),c.setAttribute("stroke-linecap","round"),a.appendChild(c)}},(s,{penColor:d,dotSize:c,minWidth:m,maxWidth:l})=>{let u=document.createElement("circle"),g=c>0?c:(m+l)/2;u.setAttribute("r",g.toString()),u.setAttribute("cx",s.x.toString()),u.setAttribute("cy",s.y.toString()),u.setAttribute("fill",d),a.appendChild(u)}),a.outerHTML}};document.addEventListener("alpine:init",()=>{Alpine.data("signaturePadComponent",({state:f,signaturePadId:t,disabled:i,dotSize:e,minWidth:o,maxWidth:n,minDistance:r,penColor:h,backgroundColor:a})=>({signaturePad:null,signaturePadId:t,state:f,disabled:i,init(){i||(this.resizeCanvas(),this.signaturePad=new _(this.$refs.canvas,{dotSize:e||2,minWidth:o||1,maxWidth:n||2.5,minDistance:r||2,penColor:h||"rgb(0,0,0)",backgroundColor:a||"rgba(0,0,0,0)"}),this.state&&this.signaturePad.fromDataURL(this.state,{ratio:this.ratio}),this.signaturePad.addEventListener("beginStroke",()=>{console.log("Signature started")},{once:!1}),this.signaturePad.addEventListener("endStroke",s=>{this.save()},{once:!1}),this.signaturePad.addEventListener("afterUpdateStroke",()=>{},{once:!1}))},save(){this.state=this.signaturePad.toDataURL("image/svg+xml"),this.$dispatch("signature-saved",this.signaturePadId)},clear(){this.signaturePad.clear(),this.state=null},resizeCanvas(){this.ratio=Math.max(window.devicePixelRatio||1,1),this.$refs.canvas.width=this.$refs.canvas.offsetWidth*this.ratio,this.$refs.canvas.height=this.$refs.canvas.offsetHeight*this.ratio,this.$refs.canvas.getContext("2d").scale(this.ratio,this.ratio)},downloadSVG(){if(this.signaturePad.isEmpty())alert("Please provide a signature first.");else{let s=this.signaturePad.toDataURL("image/svg+xml");this.download(s,"signature.svg")}},downloadPNG(){if(this.signaturePad.isEmpty())alert("Please provide a signature first.");else{let s=this.signaturePad.toDataURL();this.download(s,"signature.png")}},downloadJPG(){if(this.signaturePad.isEmpty())alert("Please provide a signature first.");else{this.signaturePad.backgroundColor="rgb(255,255,255)";let s=this.signaturePad.toDataURL("image/jpeg");this.download(s,"signature.jpg")}},download(s,d="signature"){let c=this.dataURLToBlob(s),m=window.URL.createObjectURL(c),l=document.createElement("a");l.href=m,l.style="display: none",l.download=d,document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(m)},dataURLToBlob(s){let d=s.split(";base64,"),c=d[0].split(":")[1],m=window.atob(d[1]),l=m.length,u=new Uint8Array(l);for(let g=0;g<l;++g)u[g]=m.charCodeAt(g);return new Blob([u],{type:c})}}))});})();
/*!
 * Signature Pad v4.1.4 | https://github.com/szimek/signature_pad
 * (c) 2022 Szymon Nowak | Released under the MIT license
 */