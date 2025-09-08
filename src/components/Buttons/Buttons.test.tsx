import { render, screen } from "@testing-library/react";
import Buttons from "./Buttons";
import { buttons } from "../Calculator/CalculatorButtonValues";

describe("<Buttons> component", () => {
  test("renders the component", () => {
    render(<Buttons values={buttons} />);

    const numberButtons = [
      screen.getByText(/0/i),
      screen.getByText(/1/i),
      screen.getByText(/2/i),
      screen.getByText(/3/i),
      screen.getByText(/4/i),
      screen.getByText(/5/i),
      screen.getByText(/6/i),
      screen.getByText(/7/i),
      screen.getByText(/8/i),
      screen.getByText(/9/i),
    ];
    numberButtons.forEach((numberButton) =>
      expect(numberButton).toBeInTheDocument()
    );

    const mathButtons = [
      screen.getByText(/del/i),
      screen.getByText(/\+/i),
      screen.getByText(/-/i),
      screen.getByText(/x/i),
      screen.getByText(/reset/i),
      screen.getByText(/=/i),
    ];
    mathButtons.forEach((numberButton) =>
      expect(numberButton).toBeInTheDocument()
    );
  });
});
