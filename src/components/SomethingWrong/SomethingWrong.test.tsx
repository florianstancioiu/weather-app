import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import SomethingWrong from "./SomethingWrong";

describe("<SomethingWrong> component", () => {
  test("renders the component", async () => {
    const onRetryMock = vi.fn();

    render(<SomethingWrong onRetry={onRetryMock} />);

    const titleElement = screen.getByTestId("somethingWrong.title");
    const buttonElement = screen.getByTestId("somethingWrong.button");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Something went wrong");
    expect(buttonElement).toBeInTheDocument();
    expect(onRetryMock).toHaveBeenCalledTimes(0);
  });

  test("triggeres the onRetry function prop on button click", async () => {
    const onRetryMock = vi.fn();

    render(<SomethingWrong onRetry={onRetryMock} />);

    const buttonElement = screen.getByTestId("somethingWrong.button");

    fireEvent.click(buttonElement);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
    expect(onRetryMock).toHaveBeenCalledWith();
  });
});
