import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import DaysDropdown from "./DaysDropdown";
import days from "../../utils/stories/days";

describe("<DaysDropdown> component", () => {
  test("renders the component && onChange works", async () => {
    const onChangeMock = vi.fn();

    render(<DaysDropdown days={days} onChange={onChangeMock} />);

    const titleElement = screen.getByTestId("daysDropdown.title");

    fireEvent.click(titleElement);

    const listElement = await screen.findByTestId("daysDropdown.list");
    const listItemElement = listElement.children[1];

    fireEvent.click(listItemElement);

    expect(listElement.children).toHaveLength(7);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(days[1]);
  });
});
