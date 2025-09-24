import { render, screen } from "@testing-library/react";

import NoSearchResults from "./NoSearchResults";

describe("<NoSearchResults> component", () => {
  test("renders the component", async () => {
    const title = "No search results found!";

    render(<NoSearchResults />);

    const noSearchResultsElement = screen.getByTestId(
      "noSearchResults.noSearchResults"
    );

    expect(noSearchResultsElement).toContainHTML(title);
  });
});
