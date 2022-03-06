import React from "react";
import "./App.css";
import { Container, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import Game from "./pages/Game";
import { Settings } from "./data/ShellSettings";

function App() {
	const GenerateShellData = () => {
		let xAxisInit = 0;
		return new Array(Settings.NumberOfShells).fill().map(() => {
			xAxisInit = xAxisInit + 200;
			return {
				id: uuidv4(),
				xAxis: `${xAxisInit}`,
				yAxis: 100,
				showBall: false,
			};
		});
	};
	return (
		<Container className="mt-4">
			<Card>
				<Card.Header>Game of shells</Card.Header>
			</Card>
			<Game
				shellData={GenerateShellData()}
				difficulty={Settings.NumberOfShells}
			/>
		</Container>
	);
}

export default App;
