import React, { Component } from "react";

import styles from "./TLSMessage.module.scss";

export default class TLSMessage extends Component {
	// See https://gist.github.com/padolsey/527683#gistcomment-768383
	getIEVersion() {
		if (typeof document === "undefined") return void 0;
		let tmp = (document["documentMode"] || document.attachEvent) && "ev",
			msie =
				tmp &&
				(tmp = window[tmp + "al"]) &&
				tmp("/*@cc_on 1;@*/") &&
				+((/msie (\d+)/i.exec(navigator.userAgent) || [])[1] || 0);
		return msie || void 0;
	}

	render() {
		const ieVersion = this.getIEVersion();

		if (!ieVersion || ieVersion > 10) {
			return null;
		}

		return (
			<aside className={styles.container}>
				<div className={styles.alert}>
					<h2>TLS upgrade warning - your browser is out of date</h2>
					<p>
						Your version of Internet Explorer (version {ieVersion}) is outdated
						and insecure.
					</p>
					<p>
						NICE will be upgrading websites to latest security standards (TLS
						1.2) from{" "}
						<strong>
							<time dateTime="2019-08-01">1 August 2019</time>
						</strong>
						.
					</p>
					<p>
						After this date, NICE websites may stop working in Internet Explorer
						versions 8, 9 and 10.
					</p>
					<p>
						Please upgrade your browser to continue accessing NICE services
						after this date.
					</p>
					<p className={styles.lastP}>
						<a href="https://www.nice.org.uk/tls">
							Find out how to upgrade your browser
						</a>
					</p>
				</div>
			</aside>
		);
	}
}
