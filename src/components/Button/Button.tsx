export type Button = {
  title: string;
};

const Button = ({ title }: Button) => {
  return (
    <button className="bg-blue rounded-[0.625rem] w-full h-[3.5rem] cursor-pointer dsktp:w-auto dsktp:px-[1.5rem]">
      {title}
    </button>
  );
};

export default Button;
