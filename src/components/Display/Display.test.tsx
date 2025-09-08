import { render, screen } from "@testing-library/react";
import Display from "./Display";

describe("<Display> component", () => {
  test("renders the component", () => {
    render(<Display text="1234567890" />);

    const textElement = screen.getByText(/1234567890/i);

    expect(textElement).toBeInTheDocument();
  });
});
