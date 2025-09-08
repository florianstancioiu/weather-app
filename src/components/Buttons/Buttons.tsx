import { default as ButtonComponent } from "../Button/Button";
import { type Button } from "../Button/Button";

export type Buttons = {
  values: Button[];
  onClickButton?: (title: string) => void;
};

const Buttons = ({ values, onClickButton }: Buttons) => {
  return (
    <div
      data-testid="buttons-component"
      className="grid grid-cols-4 gap-[0.75rem] bg-ternary p-[1.5rem] rounded-[0.625rem] xs:gap-[1.625rem] xs:p-[2rem]"
    >
      {values.map((val) => (
        <ButtonComponent
          onClickButton={onClickButton}
          key={val.title}
          {...val}
        />
      ))}
    </div>
  );
};

export default Buttons;
