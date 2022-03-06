import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Game from "./pages/Game";
import { v4 as uuidv4 } from "uuid";

test("Game of shells app render", () => {
	render(<App />);
	const linkElement = screen.getByText(/Game of shells/i);
	expect(linkElement).toBeInTheDocument();
});

export const ShellData = [
	{ id: uuidv4(), xAxis: 100, yAxisd: 100, showBall: false },
	{ id: uuidv4(), xAxis: 200, yAxis: 100, showBall: false },
	{ id: uuidv4(), xAxis: 400, yAxis: 100, showBall: false },
	{ id: uuidv4(), xAxis: 500, yAxis: 100, showBall: false },
];

export const Difficulty = 4;

test("Game render", () => {
	const { queryByTestId } = render(
		<Game shellData={ShellData} sifficulty={Difficulty} />
	);
	const startGameBtn = queryByTestId("tst-start-game-btn");

	expect(startGameBtn).toBeInTheDocument();
	const shellContainers = screen.getAllByRole("listitem");
	expect(shellContainers).toHaveLength(ShellData.length);
	const ballElement = queryByTestId("tst-ball");
	expect(ballElement).toBeNull();
	fireEvent.click(startGameBtn);
	expect(shellContainers).toHaveLength(ShellData.length);
	expect(screen.getAllByRole("listsubitem")).toHaveLength(1);
});
