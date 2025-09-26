import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import SearchCity from "./SearchCity";
import locations from "../../utils/stories/locations";

describe("<SearchCity> component", () => {
  test("renders the component", async () => {
    const onChangeMock = vi.fn();
    const onSearchMock = vi.fn();

    render(
      <SearchCity
        dropdownData={locations}
        onChange={onChangeMock}
        onSearch={onSearchMock}
      />
    );

    const titleElement = screen.getByTestId("searchCity.title");
    const inputElement = screen.getByTestId("searchCity.input");
    const listElement = screen.queryByTestId("searchCity.list");

    expect(titleElement).toHaveTextContent("How's the sky looking today?");
    expect(inputElement).toBeInTheDocument();
    expect(listElement).not.toBeInTheDocument();

    expect(onChangeMock).toHaveBeenCalledTimes(0);
    expect(onSearchMock).toHaveBeenCalledTimes(0);
  });

  test("renders the dropdown on input focus", async () => {
    const onChangeMock = vi.fn();
    const onSearchMock = vi.fn();

    render(
      <SearchCity
        dropdownData={locations}
        onChange={onChangeMock}
        onSearch={onSearchMock}
      />
    );

    const inputElement = screen.getByTestId("searchCity.input");

    fireEvent.focus(inputElement);

    const listElement = await screen.findByTestId("searchCity.list");

    expect(listElement).toBeInTheDocument();
    expect(listElement.children).toHaveLength(4);
  });

  test("triggers the onChange function prop", async () => {
    const onChangeMock = vi.fn();
    const onSearchMock = vi.fn();

    render(
      <SearchCity
        dropdownData={locations}
        onChange={onChangeMock}
        onSearch={onSearchMock}
      />
    );

    const inputElement = screen.getByTestId("searchCity.input");

    fireEvent.focus(inputElement);

    const listElement = await screen.findByTestId("searchCity.list");
    const listItemElement = listElement.children[0];

    fireEvent.click(listItemElement);

    expect(listElement).not.toBeInTheDocument();
    expect(inputElement).toHaveValue(locations[0]);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(locations[0]);
    expect(onSearchMock).not.toHaveBeenCalled();
  });

  test("triggers the onSearch function prop on button click", async () => {
    const onChangeMock = vi.fn();
    const onSearchMock = vi.fn();

    render(
      <SearchCity
        dropdownData={locations}
        onChange={onChangeMock}
        onSearch={onSearchMock}
      />
    );

    const inputElement = screen.getByTestId("searchCity.input");
    const buttonElement = screen.getByTestId("button.button");

    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: locations[0] } });

    fireEvent.click(buttonElement);

    expect(inputElement).toHaveValue(locations[0]);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith(locations[0]);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test("triggers the onSearch function prop on pressing Enter in the input", async () => {
    const onChangeMock = vi.fn();
    const onSearchMock = vi.fn();

    render(
      <SearchCity
        dropdownData={locations}
        onChange={onChangeMock}
        onSearch={onSearchMock}
      />
    );

    const inputElement = screen.getByTestId("searchCity.input");

    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: locations[3] } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    expect(inputElement).toHaveValue(locations[3]);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith(locations[3]);
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
