import React, { useState } from 'react';
import styles from './Library.module.scss';
import IconButton from '@/src/components/icon-button/IconButton';
import { MagnifyingGlass, X, BookmarkSimple, BookmarkSimpleFill, CaretDown, CaretRight, Funnel } from '@phosphor-icons/react';
import { IconSize } from '@/src/constants/iconsize.constant';
import Input from '@/src/components/input/Input';
import Button from '@/src/components/button/Button';
import { ButtonType } from '@/src/components/button/types';

const categoriesData = [
  {
    id: 1,
    category: "Zero tolerance checklist",
    forms: [{ name: "Veg products", isChecked: false }],
    isChecked: false,
    isBookmarked: false,
    isExpanded: false, // New state to track expanded/collapsed
  },
  {
    id: 2,
    category: "TC training audit",
    forms: [],
    isChecked: false,
    isBookmarked: false,
    isExpanded: false, // New state to track expanded/collapsed
  },
  {
    id: 3,
    category: "Fire safety checklist",
    forms: [],
    isChecked: false,
    isBookmarked: false,
    isExpanded: false, // New state to track expanded/collapsed
  },
  {
    id: 4,
    category: "King's Journey RT",
    forms: [{ name: "Veg products", isChecked: false }, { name: "Cafe", isChecked: false }],
    isChecked: false,
    isBookmarked: false,
    isExpanded: false, // New state to track expanded/collapsed
  },
  {
    id: 5,
    category: "FSC",
    forms: [{ name: "Veg products", isChecked: false }],
    isChecked: false,
    isBookmarked: false,
    isExpanded: false, // New state to track expanded/collapsed
  },
];

const Library = ({ onClose }: { onClose: () => void }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>('byCategory');
  const [categories, setCategories] = useState(categoriesData);

  const selectButton = (button: string) => {
    setSelectedButton(button);
  };

  const toggleCheckbox = (id: number) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            isChecked: !item.isChecked,
            forms: item.forms.map((form) => ({
              ...form,
              isChecked: !item.isChecked,  // Check all forms when the category is selected/deselected
            })),
            isExpanded: !item.isExpanded, // Toggle expanded state when checkbox is clicked
          }
          : item
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const toggleFormCheckbox = (categoryId: number, formName: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
            ...category,
            forms: category.forms.map((form) =>
              form.name === formName
                ? { ...form, isChecked: !form.isChecked }  // Toggle individual form checkbox
                : form
            ),
            isChecked: category.forms.every(form => form.isChecked) // Update category checkbox if all forms are selected
          }
          : category
      )
    );
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div className={styles.header}>From Library</div>
        <IconButton onClick={onClose} icon={<X size={IconSize.L} />} />
      </div>
      <hr style={{ border: '1px solid #EEEFF1', margin: '5px 0' }} />
      <div style={{ padding: '10px' }}>
        <Input
          onChange={() => { }}
          value=""
          placeholder="Search categories"
          autoWidth={true}
          prefixIcon={<MagnifyingGlass size={IconSize.L} />}
        />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', width: '100%', padding: '10px' }}>
          <div className={styles["button-group-container"]}>
            <div className={styles["button-group"]}>
              <button
                className={`${styles["btn-class"]} ${selectedButton === 'byCategory' ? styles["active-button"] : ''}`}
                onClick={() => selectButton('byCategory')}
              >
                Add by category
              </button>
              <button
                className={`${styles["btn-class"]} ${selectedButton === 'byForm' ? styles["active-button"] : ''}`}
                onClick={() => selectButton('byForm')}
              >
                Add by form
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedButton === 'byCategory' && (
        <div style={{ padding: "0px" }}>
          {categories.map((category) => (
            <div key={category.id}>
              <div className={`${styles.categoryRow} ${category.isChecked ? styles.checked : ""}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={styles.customCheckbox}>
                      <input
                        type="checkbox"
                        id={`checkbox-${category.id}`}
                        checked={category.isChecked}
                        onChange={() => toggleCheckbox(category.id)}
                      />
                      <label htmlFor={`checkbox-${category.id}`}></label>
                    </div>
                    <span className={styles.categoryText}>{category.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => toggleBookmark(category.id)} className={styles.bookmarkButton}>
                      {category.isBookmarked ? (
                        <BookmarkSimpleFill size={IconSize.M} />
                      ) : (
                        <BookmarkSimple size={IconSize.M} />
                      )}
                    </button>
                    {category.isExpanded ? (
                      <IconButton onClick={onClose} icon={<CaretDown size={IconSize.L} />} />
                    ) : (
                      <IconButton onClick={onClose} icon={<CaretRight size={IconSize.L} />} />
                    )}
                  </div>
                </div>
              </div>

              {category.isExpanded && category.isChecked && category.forms.length > 0 && (
                <div>
                  {category.forms.map((form, index) => (
                    <>
                      <div style={{ display: 'flex', gap: '10px', paddingLeft: '20px' }} key={form.name}>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.customCheckboxInput}
                            checked={form.isChecked}
                            onChange={() => toggleFormCheckbox(category.id, form.name)}
                          />
                        </div>
                        <label>{form.name}</label>
                      </div>
                      <hr style={{ border: '1px solid #EEEFF1', margin: '5px 0' }} />
                    </>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {selectedButton === 'byForm' && (
        <div style={{ padding: "0px" }}>
          {categories.map((category) => (
            <div key={category.id}>
              <div className={`${styles.categoryRow} ${category.isChecked ? styles.checked : ""}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={styles.categoryText}>{category.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => toggleBookmark(category.id)} className={styles.bookmarkButton}>
                      {category.isBookmarked ? (
                        <BookmarkSimpleFill size={IconSize.M} />
                      ) : (
                        <BookmarkSimple size={IconSize.M} />
                      )}
                    </button>
                    {category.isExpanded ? (
                      <IconButton onClick={() => toggleCheckbox(category.id)} icon={<CaretDown size={IconSize.L} />} />
                    ) : (
                      <IconButton onClick={() => toggleCheckbox(category.id)} icon={<CaretRight size={IconSize.L} />} />
                    )}
                  </div>
                </div>
              </div>
              {category.isExpanded && category.isChecked && category.forms.length > 0 && (
                <div>
                  {category.forms.map((form, index) => (
                    <>
                      <div style={{ display: 'flex', gap: '10px', paddingLeft: '20px' }} key={form.name}>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.customCheckboxInput}
                            checked={form.isChecked}
                            onChange={() => toggleFormCheckbox(category.id, form.name)}
                          />
                        </div>
                        <label>{form.name}</label>
                      </div>
                      <hr style={{ border: '1px solid #EEEFF1', margin: '5px 0' }} />
                    </>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div style={{ position: 'fixed', bottom: 20, width: '30%', padding: '10px', }}>
        <Button
          onClick={() => { }}
          buttonType={ButtonType.tertiary}
          title="Add selected"
        />
      </div>
    </>
  );
};

export default Library;
