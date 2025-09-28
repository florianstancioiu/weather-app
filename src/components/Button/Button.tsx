export type Button = {
  title: string;
  onClick?: () => void;
};

const Button = ({ title, onClick }: Button) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      data-testid="button.button"
      className="bg-blue text-white rounded-[0.625rem] w-full h-[3.5rem] cursor-pointer md:w-auto md:px-[1.5rem] hover:bg-intense-blue"
      type="button"
    >
      {title}
    </button>
  );
};

export default Button;
