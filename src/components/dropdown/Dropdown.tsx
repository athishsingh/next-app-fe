/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./dropdown.module.scss";
import { CaretDown, MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/src/utils/class.utils";
import Input from "../input/Input";
import {
  DropdownOptionType,
  DropdownProps,
  DropdownSelectUIType,
} from "./dropdown.types";
import Image from "next/image";
import { IconSize } from "@/src/constants/iconsize.constant";
import { getCapitalized } from "@/src/utils/general.utils";
import Shrimmer from "../shrimmer/Shrimmer";

function Dropdown({
  optionsLabel,
  headerLabel,
  placeHolderLabel,
  showHeaderLabel = false,
  options,
  placeholder,
  selectedOption: propsSelectedOptions = [],
  disabled,
  isSearchable = false,
  showOptionsLabel = false,
  onFocus,
  onOpen = () => {},
  onChange,
  readonly = false,
  width = "100%",
  forceTop = false,
  uiType = DropdownSelectUIType.advanced,
  searchInputPlaceholder,
  removeAllStyles = false,
  customSelectContainer,
  noItemsText = "Nothing to display",
  classNames,
  padding = 10,
  isMultiSelect = false,
  isLoading = false,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<(HTMLDivElement | null)[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [alignRight, setAlignRight] = useState(false);
  const [currentKeyboardSelectedIndex, setCurrentKeyboardSelectedIndex] =
    useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [labelWidth, setLabelWidth] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, [selectedOption]);

  const filteredOptions = useMemo(() => {
    if (isSearchable) {
      setCurrentKeyboardSelectedIndex(-1);
      return options.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return options;
  }, [isSearchable, options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(propsSelectedOptions);
  }, [propsSelectedOptions]);

  useEffect(() => {
    if (forceTop) return;
    if (optionsRef.current && open && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const optionsHeight = optionsRef.current.offsetHeight;

      const spaceBelow =
        window.innerHeight - (dropdownRect.bottom + optionsHeight + 20);
      const spaceAbove = dropdownRect.top - (optionsHeight + 20);

      const dropdownWidth = dropdownRef.current.offsetWidth;
      const spaceRight = window.innerWidth - dropdownRect.right;

      if (width === "150%") {
        const requiredWidth = dropdownWidth * 1.25;
        if (spaceRight < requiredWidth) {
          setAlignRight(true);
        } else {
          setAlignRight(false);
        }
      } else {
        setAlignRight(false);
      }

      if (spaceBelow < 0 && spaceAbove > spaceBelow) {
        optionsRef.current.classList.add(styles["open-top"]);
        optionsRef.current.classList.remove(styles["open-bottom"]);
      } else {
        optionsRef.current.classList.remove(styles["open-top"]);
        optionsRef.current.classList.add(styles["open-bottom"]);
      }
    }
  }, [open, options.length, dropdownRef, optionsRef, forceTop, width]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyboardEvents);

      return () => {
        document.removeEventListener("keydown", handleKeyboardEvents);
      };
    }
  }, [open, filteredOptions, currentKeyboardSelectedIndex]);

  const handleKeyboardEvents = (e: KeyboardEvent) => {
    if (!open) return;
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    if (e.key === "ArrowDown") {
      if (currentKeyboardSelectedIndex === filteredOptions.length - 1) {
        setCurrentKeyboardSelectedIndex(0);
      } else {
        setCurrentKeyboardSelectedIndex(currentKeyboardSelectedIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (currentKeyboardSelectedIndex <= 0) {
        setCurrentKeyboardSelectedIndex(filteredOptions.length - 1);
      } else {
        setCurrentKeyboardSelectedIndex(currentKeyboardSelectedIndex - 1);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (open && optionsRef.current && dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const dropdownWidth = dropdownRef.current.offsetWidth;
        const spaceRight = window.innerWidth - dropdownRect.right;
        const requiredWidth = dropdownWidth * 1.2;

        if (width === "150%") {
          if (spaceRight < requiredWidth) {
            setAlignRight(true);
          } else {
            setAlignRight(false);
          }
        } else {
          setAlignRight(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, width]);

  const handleDropDownClick = () => {
    if (disabled || readonly) return;
    setSearchTerm("");
    if (!open) {
      onFocus && onFocus();
      onOpen();
    }
    setOpen(!open);
  };

  const handleDropDownOptionClick = (
    option: DropdownOptionType,
    index: number
  ) => {
    if (onChange) {
      if (isMultiSelect) {
        const isSelected = selectedOption.some(
          (selected) => selected.value === option.value
        );
        if (isSelected) {
          const updatedOptions = selectedOption.filter(
            (selected) => selected.value !== option.value
          );
          onChange(updatedOptions, index);
        } else {
          const updatedOptions = [...selectedOption, option];
          onChange(updatedOptions, index);
        }
      } else {
        onChange([option], index);
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setCurrentKeyboardSelectedIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (currentKeyboardSelectedIndex !== -1) {
      filterRef.current[currentKeyboardSelectedIndex]?.focus();
    }
  }, [currentKeyboardSelectedIndex]);

  return (
    <div className={cn("nu-position-relative", classNames)}>
      {headerLabel && showHeaderLabel && (
        <p className={styles["header__label-text"]}>{headerLabel}</p>
      )}
      <div
        role="button"
        className={cn(styles["dropdown__main-con"], {
          [styles["remove__all-styles"]]: removeAllStyles,
        })}
        style={
          {
            "--dropdown-padding": `${padding}px`,
          } as CSSProperties
        }
        ref={dropdownRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            handleDropDownClick();
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleDropDownClick();
        }}
      >
        {customSelectContainer ? (
          <>{customSelectContainer}</>
        ) : (
          <>
            {uiType === DropdownSelectUIType.advanced ? (
              <div className="nu-flex nu-ai-center nu-w-full">
                <div className={styles["dropdown__placeholder-text-con"]}>
                  <p className={styles["placeholder-text"]} ref={labelRef}>
                    {placeHolderLabel}
                  </p>
                  <div className={styles["divider-con"]}></div>
                </div>
                <div className={styles["dropdown__right-con"]}>
                  {selectedOption.length > 0 && (
                    <>
                      {isMultiSelect ? (
                        <div className={styles["multi__select-con"]}>
                          {selectedOption.map((option, index) => (
                            <div key={index} className={styles["chip__con"]}>
                              <p className={styles["chip__text"]}>
                                {option.label}
                              </p>
                              <X
                                size={IconSize.S}
                                color="#705500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDropDownOptionClick(option, index);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        selectedOption[0]?.label && (
                          <p
                            className={styles["selected__option-text"]}
                            ref={labelRef}
                          >
                            {getCapitalized(selectedOption[0].label)}
                          </p>
                        )
                      )}
                    </>
                  )}
                  {selectedOption.length === 0 && placeholder && (
                    <p
                      style={
                        {
                          "--label-width": `${labelWidth}px`,
                        } as CSSProperties
                      }
                      className={styles["placeholder-text"]}
                    >
                      {placeholder}
                    </p>
                  )}
                  <CaretDown
                    size={IconSize.S}
                    className={`${
                      open ? "nu-rotate-180" : "nu-rotate-0"
                    } nu-shrink-zero`}
                  />
                </div>
              </div>
            ) : (
              <div className={styles["simple__ui-dropdown-component"]}>
                {selectedOption.length === 0 && placeholder && (
                  <p
                    className={styles["simple__ui-placeholder-text"]}
                    ref={labelRef}
                  >
                    {placeholder}
                  </p>
                )}
                {selectedOption.length > 0 && (
                  <>
                    {isMultiSelect ? (
                      <div>
                        {selectedOption.map((option, index) => (
                          <p
                            key={index}
                            className={
                              styles["simple__ui-selected-option-text"]
                            }
                          >
                            {option.label}
                          </p>
                        ))}
                      </div>
                    ) : (
                      selectedOption[0]?.label && (
                        <p
                          style={
                            {
                              "--label-width": `${labelWidth}px`,
                            } as CSSProperties
                          }
                          ref={labelRef}
                          className={styles["simple__ui-selected-option-text"]}
                        >
                          {getCapitalized(selectedOption[0].label)}
                        </p>
                      )
                    )}
                  </>
                )}
                <CaretDown
                  size={IconSize.S}
                  className={`${open ? "nu-rotate-180" : "nu-rotate-0"}`}
                />
              </div>
            )}
          </>
        )}

        <div
          className={cn(
            styles["options__main-con"],
            open ? styles["visible"] : styles["hidden"],
            {
              [styles["open-top"]]: forceTop,
              [styles["align-right"]]: alignRight,
            }
          )}
          style={
            {
              "--dropdown__width": width,
            } as CSSProperties
          }
          ref={optionsRef}
          onClick={(e) => e.stopPropagation()}
        >
          {isSearchable && (
            <div>
              <Input
                autoWidth
                classnames={styles["dropdown__search"]}
                prefixIcon={<MagnifyingGlass size={20} />}
                onChange={(e) => {
                  setSearchTerm(e);
                }}
                value={searchTerm}
                placeholder={searchInputPlaceholder || ""}
                removeBorder
              />
            </div>
          )}
          {showOptionsLabel && <p>{optionsLabel}</p>}
          {isLoading ? (
            <div className="nu-flex nu-column nu-gap-1 nu-overflow-scroll">
              {Array.from({ length: 20 }).map((_, i) => (
                <Shrimmer key={i} autoWidth height={20} borderRadius={2} />
              ))}
            </div>
          ) : (
            <div className={styles["options__con"]}>
              {filteredOptions.length > 0 ? (
                <div className="nu-p-1">
                  {filteredOptions.map((option, index) => (
                    <div
                      className={styles["option__list-parent-con"]}
                      ref={(el) => {
                        filterRef.current[index] = el;
                      }}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(-1);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropDownOptionClick(option, index);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleDropDownOptionClick(option, index);
                        }
                      }}
                      key={index}
                      tabIndex={0}
                    >
                      <div
                        className={cn(styles["option__list-item"], {
                          [styles["hovered-item"]]: index === hoveredIndex,
                          [styles["keyboard-selected"]]:
                            index === currentKeyboardSelectedIndex,
                          [styles["selected__option"]]: isMultiSelect
                            ? selectedOption.some(
                                (selected) => selected.value === option.value
                              )
                            : selectedOption[0]?.value === option.value,
                        })}
                      >
                        {option.customRenderer ? (
                          <div className="nu-flex nu-gap-1 nu-ai-center nu-w-full">
                            {isMultiSelect
                              ? selectedOption.some(
                                  (selected) => selected.value === option.value
                                ) && (
                                  <Image
                                    src={"/icons/tick.svg"}
                                    alt="tick"
                                    width={16}
                                    height={16}
                                  />
                                )
                              : selectedOption[0]?.value === option.value && (
                                  <Image
                                    src={"/icons/tick.svg"}
                                    alt="tick"
                                    width={16}
                                    height={16}
                                  />
                                )}
                            {option.customRenderer}
                          </div>
                        ) : (
                          <div className="nu-flex nu-gap-1 nu-ai-center">
                            {isMultiSelect
                              ? selectedOption.some(
                                  (selected) => selected.value === option.value
                                ) && (
                                  <Image
                                    src={"/icons/tick.svg"}
                                    alt="tick"
                                    width={16}
                                    height={16}
                                  />
                                )
                              : selectedOption[0]?.value === option.value && (
                                  <Image
                                    src={"/icons/tick.svg"}
                                    alt="tick"
                                    width={16}
                                    height={16}
                                  />
                                )}
                            <p>{getCapitalized(option.label)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles["no__item-container"]}>
                  <p>{noItemsText}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
