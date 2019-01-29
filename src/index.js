import React from "react";
import { render } from "react-dom";
import Header from "./Header";
import Footer from "./Footer/Footer";

var headerElement = document.getElementById("header");
if (!headerElement) {
	headerElement = document.createElement("div");
	document.body.insertBefore(headerElement, document.body.firstChild);
}
render(<Header />, headerElement);

// Render footer
var footerElement = document.getElementById("footer");
if (!footerElement) {
	footerElement = document.createElement("div");
	document.body.appendChild(footerElement);
}
render(<Footer />, footerElement);