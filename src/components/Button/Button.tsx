export type Button = {
  title: string | number;
  bgColor: string;
  bgColorSecondary: string;
  bgColorHover: string;
  textColor: string;
  spansTwoColumns?: boolean;
  isNumber: boolean;
  onClickButton?: (title: string) => void;
};

const Button = ({
  title,
  bgColor,
  bgColorSecondary,
  bgColorHover,
  textColor,
  spansTwoColumns,
  onClickButton,
}: Button) => {
  return (
    <div
      className={`${
        spansTwoColumns ? "col-span-2" : ""
      } rounded-[0.5rem] overflow-hidden ${bgColorSecondary}`}
    >
      <div
        data-testid={`button-${title}`}
        onClick={() => {
          if (onClickButton) {
            return onClickButton(`${title}`);
          }
        }}
        className={`${bgColor} ${textColor} ${bgColorHover} transition-all
      grid place-items-center cursor-pointer min-h-[3.75rem] uppercase select-none font-bold text-xl rounded-[0.5rem] xs:text-[2.5rem] xs:pt-[0.438rem]
      `}
      >
        {title}
      </div>
      <div className={`h-[0.25rem]`}></div>
    </div>
  );
};

export default Button;
