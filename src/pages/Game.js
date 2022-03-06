import React, { useState } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import ShellContainer from "../components/ShellContainer";

function Game(props) {
	const [shells, setShells] = useState(props.shellData);
	const [ballCharacter, setBallCharacter] = useState("");
	const [foundBall, setFoundBall] = useState(null);
	const [score, setScore] = useState(0);

	const onPlay = () => {
		setShells(props.shellData);
		const ballLocation = Math.floor(Math.random() * shells.length);
		shells.forEach((element, index) => {
			if (element.showBall) {
				shells[index].showBall = false;
			}
			if (index == ballLocation) {
				shells[index].showBall = true;
			}
		});
		setBallCharacter("ball-init");
		let tmpDifficulty = props.difficulty;
		//This can also be improved by increasing the number of shells
		while (tmpDifficulty > 0) {
			tmpDifficulty--;
			setShells(shuffleShells(shells));
		}
	};

	const shuffleShells = (tmpShells) => {
		const newShell = tmpShells.slice();
		for (let i = newShell.length - 1; i > 0; i--) {
			let newIndex = Math.floor(Math.random() * (i + 1));
			[newShell[i], newShell[newIndex]] = [newShell[newIndex], newShell[i]];
		}
		return newShell;
	};

	const onAlertClose = () => {
		setFoundBall({});
		setBallCharacter("");
	};

	return (
		<Row className="mt-2">
			{score > 0 ? (
				<div>
					<h4>Score: {score}</h4>
				</div>
			) : null}
			{_.isEmpty(foundBall) ? (
				<div>
					<Row className="justify-content-md-center">
						<Col xs lg="2">
							<Button data-testid="tst-start-game-btn" onClick={onPlay}>
								PLAY
							</Button>
						</Col>
					</Row>

					<Row className="justify-content-md-center">
						<div>
							{shells.map((shell, index) => {
								return (
									<ShellContainer
										key={index}
										setFoundBall={setFoundBall}
										ballCharacter={ballCharacter}
										setBallCharacter={setBallCharacter}
										shell={shell}
										setScore={setScore}
										score={score}
									/>
								);
							})}
						</div>
					</Row>
				</div>
			) : (
				<Row className="justify-content-md-center">
					<Col xs lg="4">
						{" "}
						<Alert
							variant={foundBall.variant}
							dismissible
							onClose={onAlertClose}>
							{foundBall.message}
						</Alert>
					</Col>
				</Row>
			)}
		</Row>
	);
}

Game.propTypes = {
	shellData: PropTypes.array,
	difficulty: PropTypes.number,
};
export default Game;
