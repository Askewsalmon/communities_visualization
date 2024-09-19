import PropTypes from "prop-types";
import {
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import _ from "lodash";

const SideInformation = ({
  graphData,
  aggregations,
  setHighlightedNode,
  highlightedNode,
}) => {
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
              {informationData.map(
                (data, idx) =>
                  data.children.length > 0 && (
                    <Disclosure key={idx}>
                      {({ open }) => (
                        <>
                          <div className="flex flex-column w-full px-4 py-2 border-b border-solid border-white text-sm font-semibold text-white bg-black hover:bg-orange-600">
                            <span>
                              {data.name} ({data.children.length})
                            </span>
                            <div className="flex ml-auto space-x-2">
                              <svg
                                className="h-4 fill-white cursor-pointer"
                                onClick={() => {
                                  if (
                                    _.includes(
                                      highlightedNode,
                                      data.children[0].id
                                    )
                                  ) {
                                    setHighlightedNode(undefined);
                                  } else {
                                    const nodes = data.children.map(
                                      (child) => child.id
                                    );
                                    setHighlightedNode(nodes);
                                  }
                                }}
                                viewBox="0 0 576 512"
                              >
                                <path d="M315 315l158.4-215L444.1 70.6 229 229 315 315zm-187 5s0 0 0 0l0-71.7c0-15.3 7.2-29.6 19.5-38.6L420.6 8.4C428 2.9 437 0 446.2 0c11.4 0 22.4 4.5 30.5 12.6l54.8 54.8c8.1 8.1 12.6 19 12.6 30.5c0 9.2-2.9 18.2-8.4 25.6L334.4 396.5c-9 12.3-23.4 19.5-38.6 19.5L224 416l-25.4 25.4c-12.5 12.5-32.8 12.5-45.3 0l-50.7-50.7c-12.5-12.5-12.5-32.8 0-45.3L128 320zM7 466.3l63-63 70.6 70.6-31 31c-4.5 4.5-10.6 7-17 7L24 512c-13.3 0-24-10.7-24-24l0-4.7c0-6.4 2.5-12.5 7-17z" />
                              </svg>
                              <DisclosureButton>
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
                            </div>
                          </div>
                          <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-100"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-100"
                          >
                            <DisclosurePanel className="px-4 py-2 text-xs text-white bg-black w-full ">
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
                  )
              )}
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
  graphData: PropTypes.object,
  aggregations: PropTypes.array,
  setHighlightedNode: PropTypes.func,
  highlightedNode: PropTypes.array,
};

export default SideInformation;
