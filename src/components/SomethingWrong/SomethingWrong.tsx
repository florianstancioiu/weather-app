import IconRetry from "../../images/icon-retry.svg?react";
import IconError from "../../images/icon-error.svg?react";

export type SomethingWrong = {
  onRetry: () => void;
};

const SomethingWrong = ({ onRetry }: SomethingWrong) => {
  return (
    <div className="text-center mt-[4rem]">
      <IconError className="w-[3.125rem] h-[2.625rem] mx-auto mb-[1.5rem]" />
      <h1 className="font-bold leading-[120%] text-[3.25rem] mb-[1.5rem]">
        Something went wrong
      </h1>
      <p className="font-medium text-[1.25rem] text-neutral leading-[120%] mb-[1.5rem] max-w-[34.625rem] mx-auto">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        onClick={() => onRetry()}
        className="bg-neutral-2 py-[0.75rem] px-[1.125rem] flex gap-[0.625rem] items-center cursor-pointer mx-auto rounded-[0.5rem]"
      >
        <IconRetry />
        <span>Retry</span>
      </button>
    </div>
  );
};

export default SomethingWrong;
