import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export interface SwitchButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const SwitchButton: React.FunctionComponent<SwitchButtonProps> = (props) => {
  return (
    <button
      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
      type="button"
      {...props}
    >
      <FaExchangeAlt
        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        size={30}
      />
    </button>
  );
};

export default SwitchButton;
