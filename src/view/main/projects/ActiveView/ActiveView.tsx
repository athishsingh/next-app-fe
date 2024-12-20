'use client';

import Header from '@/src/components/header/Header';
import IconButton from '@/src/components/icon-button/IconButton';
import { IconSize } from '@/src/constants/iconsize.constant';
import { ArrowLeft, BookmarkSimple, X, PencilSimple, MagnifyingGlass } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from '@/src/components/button/Button';
import styles from './ActiveView.module.scss';
import { ButtonType } from '@/src/components/Button/types';
import Dropdown from '@/src/components/dropdown/Dropdown';
import Input from '@/src/components/input/Input';
import FormListsByCategory from './FormListsByCategory';

export const ActiveView = () => {
  interface FormDetail {
    categoryName: string;
    formName: string;
    completion: number; // Percentage completion
    score: number;      // Score out of 100
  }

  // Form Details Array
  const formDetails: FormDetail[] = [
    {
      categoryName: "Health",
      formName: "Annual Health Checkup",
      completion: 85,
      score: 90,
    },
    {
      categoryName: "Finance",
      formName: "Tax Filing",
      completion: 100,
      score: 95,
    },
    {
      categoryName: "Education",
      formName: "Semester Exams",
      completion: 75,
      score: 80,
    },
  ];

  const router = useRouter();
  const [user, setUser] = useState<ActiveUsers | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // Initially set the first item as active
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const handleEditClick = () => {
    const userId = user?.id ?? '';
    router.push(`/project-form?id=${userId}`);
  };

  const handleChangeInput = (input: string) => {
    setUserInput(input);
    console.log(input, 'userInput');
  };

  return (
    <>
      <Header
        classnames="nu-ai-center nu-flex"
        paddingTop={12}
        paddingBottom={12}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3">
            <IconButton
              icon={<ArrowLeft size={IconSize.L} />}
              onClick={handleBackClick}
            />
            <p className={styles['course__title-text']}>
              {user?.projectName || 'No Project Name'}
            </p>
            <IconButton
              onClick={handleEditClick}
              icon={<PencilSimple size={IconSize.L} />}
            />
          </div>
        }
        rightComponent={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <div style={{ width: '300px' }}>
              <Dropdown
                isSearchable={true}
                placeHolderLabel="Form name"
                options={Array.from({ length: 15 }).map((_, index) => ({
                  label: `Testing ${index + 1}`,
                  value: `Testing value ${index + 1}`,
                }))}
                onChange={() => { }}
                placeholder="search form"
                showOptionsLabel={true}
                optionsLabel="Form"
              />
            </div>
            <div>
              <Button
                buttonType={ButtonType.tertiary}
                prefixIcon={<BookmarkSimple size={IconSize.S} />}
                onClick={() => { }}
                title="Save changes"
              />
            </div>
          </div>
        }
      />
      <div style={{ display: 'flex', alignItems: 'flex-start', height: '82vh' }}>
        <div style={{ flex: '0 0 25%', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              marginTop: '10px',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Input
              prefixIcon={<MagnifyingGlass size={20} />}
              onChange={(value) => handleChangeInput(value)}
              value={userInput}
              placeholder="Search categories"
            />
          </div>
          <div style={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {formDetails.map((form, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className={`form-item ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '10px',
                    backgroundColor: isActive ? '#FBEBE3' : '#fff',
                    borderBottom: '1px solid #EEEEF2',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: isActive ? '#D26300' : '#333',
                      paddingLeft: '40px'
                    }}
                  >
                    {form.categoryName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#555', paddingLeft: '40px' }}>
                    <span>Forms . 01/04</span> <span>Completion . {form.completion.toFixed(2)}%</span> <span>Score . {form.score}/58 (20%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            borderLeft: '1px solid #EEEEF2',
            height: '100%',
          }}
        ></div>
        <div style={{ flex: '1', textAlign: 'left' }}>
          <FormListsByCategory category={formDetails[activeIndex]} />
        </div>
      </div>


    </>
  );
};
