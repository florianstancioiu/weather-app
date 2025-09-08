import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

describe("<Calculator> component", () => {
  test("renders the component", () => {
    render(<Calculator />);

    const headerElement = screen.getByTestId("header-component");
    const displayElement = screen.getByTestId("display-component");
    const buttonsElement = screen.getByTestId("buttons-component");

    expect(headerElement).toBeInTheDocument();
    expect(displayElement).toBeInTheDocument();
    expect(buttonsElement).toBeInTheDocument();
  });

  test("displays the numbers 0 - 9", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const resetButton = screen.getByTestId("button-reset");

    for (let i = 0; i < 10; i++) {
      const currentNumber = screen.getByTestId(`button-${i}`);

      fireEvent.click(currentNumber);

      expect(+displayText.innerHTML).toEqual(i);

      // reset the state of the display
      fireEvent.click(resetButton);
    }
  });

  test("reset button works", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const resetButton = screen.getByTestId("button-reset");

    const number1 = screen.getByTestId(`button-1`);
    const number2 = screen.getByTestId(`button-2`);
    const number3 = screen.getByTestId(`button-3`);

    fireEvent.click(number1);
    fireEvent.click(number2);
    fireEvent.click(number3);

    expect(+displayText.innerHTML).toEqual(123);

    fireEvent.click(resetButton);

    expect(displayText.innerHTML).toEqual("");
  });

  test("equal button works / calculates 1 + 1 = 2", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const plusButton = screen.getByTestId("button-+");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(plusButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(2);
  });

  test("delete button works with just a single number", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const deleteButton = screen.getByTestId("button-del");
    const number1 = screen.getByTestId("button-1");
    const number2 = screen.getByTestId("button-2");
    const number3 = screen.getByTestId("button-3");

    fireEvent.click(number1);
    fireEvent.click(number2);
    fireEvent.click(number3);

    expect(+displayText.innerHTML).toEqual(123);

    fireEvent.click(deleteButton);

    expect(+displayText.innerHTML).toEqual(12);

    fireEvent.click(deleteButton);

    expect(+displayText.innerHTML).toEqual(1);

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("");
  });

  test("delete button works with an expression", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const deleteButton = screen.getByTestId("button-del");
    const plusButton = screen.getByTestId("button-+");
    const pointButton = screen.getByTestId("button-.");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const number2 = screen.getByTestId("button-2");
    const number3 = screen.getByTestId("button-3");

    fireEvent.click(number1);
    fireEvent.click(number2);
    fireEvent.click(number3);
    fireEvent.click(pointButton);
    fireEvent.click(number1);

    expect(+displayText.innerHTML).toEqual(123.1);

    fireEvent.click(plusButton);

    expect(displayText.innerHTML).toEqual("123.1+");

    fireEvent.click(number0);
    fireEvent.click(pointButton);
    fireEvent.click(number1);

    expect(displayText.innerHTML).toEqual("123.1+0.1");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("123.1+0.");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("123.1+0");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("123.1+");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("123.1");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("123.");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("123");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("12");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("1");

    fireEvent.click(deleteButton);

    expect(displayText.innerHTML).toEqual("");
  });

  test("calculates 0 + 0 = 0", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const plusButton = screen.getByTestId("button-+");
    const number0 = screen.getByTestId("button-0");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number0);
    fireEvent.click(plusButton);
    fireEvent.click(number0);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(0);
  });

  test("calculates 0.1 + 0.2 = 0.3", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const plusButton = screen.getByTestId("button-+");
    const pointButton = screen.getByTestId("button-.");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    // press 0.1
    fireEvent.click(number0);
    fireEvent.click(pointButton);
    fireEvent.click(number1);

    // press plus
    fireEvent.click(plusButton);

    // press 0.2
    fireEvent.click(number0);
    fireEvent.click(pointButton);
    fireEvent.click(number2);

    // press equal
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(0.3);
  });

  test("calculates 1 - 1 = 0", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const minusButton = screen.getByTestId("button--");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(minusButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(0);
  });

  test("calculates 0 - 1 = -1", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const minusButton = screen.getByTestId("button--");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number0);
    fireEvent.click(minusButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(-1);
  });

  test("calculates 0 x 1 = 0", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const timesButton = screen.getByTestId("button-x");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number0);
    fireEvent.click(timesButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(0);
  });

  test("calculates 1 x 1 = 1", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const timesButton = screen.getByTestId("button-x");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(timesButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(1);
  });

  test("calculates 2 x 2 = 4", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const timesButton = screen.getByTestId("button-x");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number2);
    fireEvent.click(timesButton);
    fireEvent.click(number2);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(4);
  });

  test("calculates 2 x -2 = -4", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const timesButton = screen.getByTestId("button-x");
    const minusButton = screen.getByTestId("button--");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number2);
    fireEvent.click(timesButton);
    fireEvent.click(minusButton);
    fireEvent.click(number2);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(-4);
  });

  test("calculates 0 / 1 = 0", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number0);
    fireEvent.click(divisionButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(0);
  });

  test("calculates 0 / 0 = error", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const number0 = screen.getByTestId("button-0");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number0);
    fireEvent.click(divisionButton);
    fireEvent.click(number0);
    fireEvent.click(equalButton);

    expect(displayText.innerHTML).toEqual("error");
  });

  test("calculates 1 / 0 = error", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(divisionButton);
    fireEvent.click(number0);
    fireEvent.click(equalButton);

    expect(displayText.innerHTML).toEqual("error");
  });

  test("calculates -1 / 0 = error", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const minusButton = screen.getByTestId("button--");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(minusButton);
    fireEvent.click(number1);
    fireEvent.click(divisionButton);
    fireEvent.click(number0);
    fireEvent.click(equalButton);

    expect(displayText.innerHTML).toEqual("error");
  });

  test("calculates 2 / 1 = 2", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const number1 = screen.getByTestId("button-1");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number2);
    fireEvent.click(divisionButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(2);
  });

  test("calculates 10 / 2 = 5", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(number0);
    fireEvent.click(divisionButton);
    fireEvent.click(number2);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(5);
  });

  test("calculates 10 / 0.2 = 50", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const divisionButton = screen.getByTestId("button-/");
    const pointButton = screen.getByTestId("button-.");
    const number0 = screen.getByTestId("button-0");
    const number1 = screen.getByTestId("button-1");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(number0);
    fireEvent.click(divisionButton);
    fireEvent.click(number0);
    fireEvent.click(pointButton);
    fireEvent.click(number2);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(50);
  });

  test("calculates 1 + 1 + 1 = 3", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const additionButton = screen.getByTestId("button-+");
    const number1 = screen.getByTestId("button-1");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number1);
    fireEvent.click(additionButton);
    fireEvent.click(number1);
    fireEvent.click(additionButton);
    fireEvent.click(number1);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(3);
  });

  test("calculates 2 + 2 x 2 = 6", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const additionButton = screen.getByTestId("button-+");
    const multiplicationButton = screen.getByTestId("button-x");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(number2);
    fireEvent.click(additionButton);
    fireEvent.click(number2);
    fireEvent.click(multiplicationButton);
    fireEvent.click(number2);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(6);
  });

  test("calculates -2 - 2 x -2 = 2", () => {
    render(<Calculator />);

    const displayText = screen.getByTestId("display-text");
    const multiplicationButton = screen.getByTestId("button-x");
    const minusButton = screen.getByTestId("button--");
    const number2 = screen.getByTestId("button-2");
    const equalButton = screen.getByTestId("button-=");

    fireEvent.click(minusButton);
    fireEvent.click(number2);
    fireEvent.click(minusButton);
    fireEvent.click(number2);
    fireEvent.click(multiplicationButton);
    fireEvent.click(minusButton);
    fireEvent.click(number2);
    fireEvent.click(equalButton);

    expect(+displayText.innerHTML).toEqual(2);
  });
});
