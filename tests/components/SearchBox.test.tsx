import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);

    return {
      user: userEvent.setup(),
      input: screen.getByPlaceholderText(/search/i),
      onChange,
    };
  };

  it("should render an input field for searching", () => {
    const { input } = renderComponent();

    expect(input).toBeInTheDocument();
  });

  it("should call onChange when Enter is pressed", async () => {
    const { user, input, onChange } = renderComponent();
    const searchQuery = "query";

    await user.type(input, `${searchQuery}{enter}`);

    expect(onChange).toHaveBeenCalledWith(searchQuery);
  });

  it("should not call onChange if input field is empty", async () => {
    const { user, input, onChange } = renderComponent();

    await user.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
