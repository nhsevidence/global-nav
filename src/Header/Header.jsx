import React, { Component } from "react";
import PropTypes from "prop-types";
import LogoIcon from "@nice-digital/icons/lib/LogoFull";

import {
	defaultEventCategory,
	headerClickEventAction,
	trackEvent,
} from "./../tracker";
import OldIEMessage from "./OldIEMessage";
import CoronaMessage from "./CoronaMessage";
import Nav from "./Nav";
import Search from "./Search";
import Account from "./Account";
import SkipLink from "./SkipLink";

import styles from "./Header.module.scss";

export class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false,
			isLoggedIn: false,
			accountsData: null,
		};

		this.handleMobileMenuBtnClick = this.handleMobileMenuBtnClick.bind(this);
		this.handleLoginStatusChecked = this.handleLoginStatusChecked.bind(this);
		this.handleLogoClick = this.handleLogoClick.bind(this);
	}

	componentDidMount() {
		if (!document.getElementById(this.props.skipLinkId)) {
			const firstH1OnPage = document.getElementsByTagName("h1")[0];
			firstH1OnPage
				? firstH1OnPage.setAttribute("id", this.props.skipLinkId)
				: console.warn(
						`Global nav "skip to link" can't find a H1 tag or an element with the ID of "${this.props.skipLinkId}"`
				  );
		}
	}

	handleMobileMenuBtnClick() {
		trackEvent(defaultEventCategory, headerClickEventAction, "Menu");

		this.setState((prevState) => ({
			isExpanded: !prevState.isExpanded,
		}));
	}

	handleLogoClick(e) {
		e.preventDefault();

		const href = e.currentTarget.getAttribute("href");

		trackEvent(
			defaultEventCategory,
			headerClickEventAction,
			"Logo",
			null,
			function () {
				window.location.href = href;
			}
		);
	}

	handleLoginStatusChecked(accountsData) {
		if (accountsData.display_name) {
			this.setState({ isLoggedIn: true, accountsData: accountsData });
		} else {
			this.setState({ isLoggedIn: false, accountsData: accountsData });
		}
	}

	render() {
		return (
			this.props.enabled !== false && (
				<div className={styles.header}>
					<header aria-label="Site header">
						<ul className={styles.a11yLinks} aria-label="Accessibility links">
							<li>
								<SkipLink to={`#${this.props.skipLinkId}`}>
									Skip to content
								</SkipLink>
							</li>
							<li>
								<SkipLink to="https://www.nice.org.uk/accessibility">
									Accessibility help
								</SkipLink>
							</li>
						</ul>
						<div className={styles.container}>
							<a
								href="https://www.nice.org.uk/"
								aria-label="Home"
								className={styles.home}
								onClick={this.handleLogoClick}
							>
								<LogoIcon className={styles.icon} width={null} height={null} />
							</a>
							<div className={styles.wrapper}>
								<div className={styles.search}>
									{this.props.search && (
										<Search
											skipLinkId={this.props.skipLinkId}
											onNavigating={this.props.onNavigating}
											{...this.props.search}
										/>
									)}
								</div>
								<button
									className={styles.mobileMenuBtn}
									id="header-menu-button"
									type="button"
									aria-controls="header-menu"
									aria-expanded={this.state.isExpanded}
									aria-haspopup="menu"
									aria-label={
										this.state.isExpanded
											? "Close site menu"
											: "Expand site menu"
									}
									onClick={this.handleMobileMenuBtnClick}
								>
									{this.state.isExpanded ? "Close" : "Menu"}
								</button>
								{this.props.auth !== false && (
									<div className={styles.account}>
										<Account
											onLoginStatusChecked={this.handleLoginStatusChecked}
											isLoggedIn={this.state.isLoggedIn}
											accountsData={this.state.accountsData}
											{...this.props.auth}
										/>
									</div>
								)}
							</div>
						</div>
						<Nav
							service={this.props.service}
							isExpanded={this.state.isExpanded}
							accountsLinks={
								this.state.accountsData && this.state.accountsData.links
							}
							onNavigating={this.props.onNavigating}
							additionalSubMenuItems={this.props.additionalSubMenuItems}
						/>
					</header>
					<CoronaMessage onResize={this.props.onResize} />
					<OldIEMessage />
				</div>
			)
		);
	}
}

Header.propTypes = {
	service: PropTypes.string,
	skipLinkId: PropTypes.string,
	enabled: PropTypes.bool,
	search: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	onNavigating: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	onResize: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	additionalSubMenuItems: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
	search: {},
	skipLinkId: "content-start",
	additionalSubMenuItems: [],
};

export default Header;
