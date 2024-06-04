import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      user: userEvent.setup(),
      combobox: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) =>
        screen.findByRole("option", { name: label }),
      onChange,
    };
  };

  it("should render New as the default value", () => {
    const { combobox } = renderComponent();

    expect(combobox).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { combobox, getOptions, user } = renderComponent();

    await user.click(combobox);

    const options = await getOptions();
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onChnage with $value when the $label option is selected",
    async ({ label, value }) => {
      const { combobox, getOption, onChange, user } = renderComponent();

      await user.click(combobox);

      const option = await getOption(label);
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("should call onChnage with `new` when the New option is selected", async () => {
    const { combobox, getOption, onChange, user } = renderComponent();

    await user.click(combobox);

    const fulfilledOption = await getOption(/fulfilled/i);
    await user.click(fulfilledOption);

    await user.click(combobox);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
