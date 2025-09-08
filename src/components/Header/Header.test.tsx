import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("<Header> component", () => {
  test("renders the component", () => {
    render(<Header />);

    const titleElement = screen.getByText(/calc/i);

    expect(titleElement).toBeInTheDocument();
  });
});
