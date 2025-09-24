import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Button from "./Button";

describe("<Button> component", () => {
  test("renders the component", () => {
    render(<Button title="Click me" />);

    const buttonElement = screen.getByText(/Click me/i);

    expect(buttonElement).toBeInTheDocument();
  });

  test("triggers the onClick handler", () => {
    const onClickMock = vi.fn();

    render(<Button title="Click me" onClick={onClickMock} />);

    const buttonElement = screen.getByTestId("button.button");

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith();
  });
});
