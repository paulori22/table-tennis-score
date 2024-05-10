import { UseModalReturn } from "@/hooks/useModal";
import { FaCopy, FaWhatsapp } from "react-icons/fa";
import CloseIcon from "./CloseIcon";
import { BASE_URL } from "@/util/http";

export interface ShareModalProps
  extends Pick<UseModalReturn, "open" | "handleCloseModal"> {
  matchId: string | null;
}

const ShareModal: React.FunctionComponent<ShareModalProps> = ({
  open = false,
  handleCloseModal,
  matchId,
}) => {
  const openClasses = "flex";
  const closeClasses = "hidden";

  const matchLink = matchId ? `${BASE_URL}/match/${matchId}` : "";

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        open ? openClasses : closeClasses
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Share Match
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <input
              type="text"
              value={matchLink}
              readOnly
              className="bg-black text-center w-full h-full"
            />
            <div className="flex flex-row justify-items-center justify-center gap-2 p-2">
              <button
                className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
                type="button"
              >
                <FaCopy
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  onClick={() => {
                    navigator.clipboard.writeText(matchLink);
                  }}
                />
              </button>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://api.whatsapp.com/send?text=${matchLink}`}
              >
                <button
                  className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
                  type="button"
                >
                  <FaWhatsapp className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
