import PropTypes from "prop-types";
import {
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import _ from "lodash";
const SideInformation = ({ graphData, aggregations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [informationData, setinformationData] = useState(undefined);

  useEffect(() => {
    if (graphData && aggregations) {
      let data = [];
      data = _.map(aggregations, (aggregation) => {
        const children = _.filter(
          graphData.nodes,
          (node) => node.community_name === aggregation.name
        );
        return {
          name: aggregation.name,
          children: children,
        };
      });
      setinformationData(data);
    }
  }, [graphData, aggregations]);
  return (
    <div
      className={`max-h-screen flex absolute top-0 left-0 bg-transparent z-40 ${
        isOpen ? "w-full" : "w-1/2"
      }`}
    >
      <div className="w-1/4">
        <div className="w-full z-50 ml-4 mt-4">
          <p
            className="text-white cursor-pointer h-fit w-fit"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="h-6 fill-white cursor-pointer mb-2"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            ) : (
              <svg
                className="h-6 fill-white cursor-pointer"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
              </svg>
            )}
          </p>
        </div>
        <div className="w-full max-h-[93vh] overflow-y-scroll custom-scrollbar border-r  ">
          {informationData && isOpen && (
            <div className="border-t border-solid border-white">
              {informationData.map((data, idx) => (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full px-4 py-2 border-b border-solid border-white text-sm font-semibold text-white bg-black hover:bg-orange-600">
                        <span>{data.name}</span>
                        <svg
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-white`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          />
                        </svg>
                      </DisclosureButton>
                      <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-100"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-100"
                      >
                        <DisclosurePanel className="px-4 py-2 text-xs text-white bg-black ">
                          {data.children.map((child, idx) => (
                            <p key={idx} className="hover:bg-orange-700">
                              {child.name}
                            </p>
                          ))}
                        </DisclosurePanel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="w-full h-screen cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        ></div>
      )}
    </div>
  );
};

SideInformation.propTypes = {
  graphData: PropTypes.object.isRequired,
  aggregations: PropTypes.array.isRequired,
};

export default SideInformation;
