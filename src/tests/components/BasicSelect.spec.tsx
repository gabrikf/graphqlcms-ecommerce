import { render, screen, fireEvent } from "@testing-library/react";
import { BasicSelect } from "../../components/Form/BasicSelect";

const mockedOptions = [
  {
    value: "test value",
    display: "test value",
  },
];

describe("BasicSelect component", () => {
  it("should render correctly", () => {
    render(
      <BasicSelect
        width={40}
        outlined
        label="testLabel"
        options={mockedOptions}
        value=""
        setValue={() => {}}
      />
    );
    expect(screen.getAllByText("testLabel")[0]).toBeInTheDocument();
  });

  it("should render correctly when outlined is false and width is not given", () => {
    render(
      <BasicSelect
        width={40}
        label="testLabel"
        options={mockedOptions}
        value=""
        setValue={() => {}}
      />
    );
    expect(screen.getByText("testLabel")).toBeInTheDocument();
  });

  it("should change when onChange", () => {
    const mockedChange = jest.fn();
    const result = render(
      <BasicSelect
        width={40}
        outlined
        label="testLabel"
        options={mockedOptions}
        value=""
        setValue={mockedChange}
      />
    );
    const select = result.container.querySelector("#simple-select") as any;
    fireEvent.mouseDown(select);

    const options = screen.getAllByRole("option");

    fireEvent.mouseDown(options[1]);
    options[1].click();
    expect(mockedChange).toBeCalled();
  });
});
