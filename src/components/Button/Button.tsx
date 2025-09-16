export type Button = {
  title: string;
  onClick: () => void;
};

const Button = ({ title, onClick }: Button) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue rounded-[0.625rem] w-full h-[3.5rem] cursor-pointer md:w-auto md:px-[1.5rem]"
    >
      {title}
    </button>
  );
};

export default Button;
