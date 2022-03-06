import React from "react";
import PropTypes from "prop-types";

// Defines the shell container and ball
const ShellContainer = (props) => {
	const {
		shell,
		score,
		setScore,
		setBallCharacter,
		ballCharacter,
		setFoundBall,
	} = props;

	const onHandleShellClick = () => {
		let tmpscore = score;

		if (shell.showBall) {
			setScore(tmpscore + 1);
			setBallCharacter("ball-final");
			setFoundBall({
				variant: "success",
				message: "You got it right!",
			});
		} else {
			setFoundBall({
				variant: "danger",
				message: "Wrong!",
			});
		}
	};

	return (
		<div
			role="listitem"
			className="shell-container"
			onClick={onHandleShellClick}
			style={{
				transform: `translateX(${shell.xAxis}px) translateY(${shell.yAxis}px)`,
			}}>
			<div className="shell"></div>
			{shell.showBall ? (
				<div
					role="listsubitem"
					data-testid="tst-ball"
					className={`ball ${ballCharacter}`}></div>
			) : null}
		</div>
	);
};

ShellContainer.propTypes = {
	shell: PropTypes.object,
	setBallCharacter: PropTypes.func,
	ballCharacter: PropTypes.string,
	setFoundBall: PropTypes.func,
	setScore: PropTypes.func,
	score: PropTypes.number,
};

export default ShellContainer;
