import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { checkIsLoggedIn } from "./nice-accounts";
import styles from "./Account.module.scss";

export default class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
	}

	componentDidMount() {
		checkIsLoggedIn()
			.then(
				function(data) {
					if (this.props.onLoginStatusChecked) {
						this.props.onLoginStatusChecked(data);
					}
				}.bind(this)
			)
			.catch(
				function(e) {
					console.warn("Couldn't load account data", e);
				}.bind(this)
			);
	}

	render() {
		const { accountsData } = this.props;

		return this.props.isLoggedIn ? (
			<div className={styles.account}>
				<button
					className={classnames(styles.button, styles.myAccount)}
					aria-controls="my-account"
					aria-expanded={this.state.isExpanded}
					onClick={this.handleClick}
				>
					My account
				</button>
				<ul
					className={styles.menu}
					aria-hidden={!this.state.isExpanded}
					id="my-account"
				>
					{accountsData.links &&
						Object.keys(accountsData.links).map(function(text, i) {
							return (
								<li key={i}>
									<a
										href={accountsData.links[text]}
										data-hj-suppress={
											accountsData.links[text].indexOf("profile") > -1
												? ""
												: null
										}
									>
										{text}
									</a>
								</li>
							);
						})}
				</ul>
			</div>
		) : (
			<a href="https://accounts.nice.org.uk/signin" className={styles.button}>
				Sign in
			</a>
		);
	}
}

Account.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	onLoginStatusChecked: PropTypes.func,
	accountsData: PropTypes.shape({
		display_name: PropTypes.string,
		thumbnail: PropTypes.string,
		links: PropTypes.object
	})
};
