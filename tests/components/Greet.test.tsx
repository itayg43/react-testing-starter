import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render hello with the name when name is provided", () => {
    render(<Greet name="Itay" />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(/itay/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/login/i);
  });
});
