'use client';
import React, { useState, useRef } from 'react';
import Header from "@/src/components/header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import { IconSize } from "@/src/constants/iconsize.constant";
import { ArrowLeft, BookmarkSimple, X, Plus, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import styles from './ProjectsCreate.module.scss';
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Input from '@/src/components/input/Input';
import Dropdown from '@/src/components/dropdown/Dropdown';
import Toggle from '@/src/components/toggle/Toggle';

const ProjectsCreate = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isAutoAssign, setIsAutoAssign] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);
  };

  const handleAutoAssignChange = (value: boolean) => {
    setIsAutoAssign(value);
  };

  return (
    <>
      <Header
        classnames="nu-ai-center nu-flex"
        paddingTop={12}
        paddingBottom={12}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3">
            <IconButton icon={<ArrowLeft size={IconSize.L} />} onClick={handleBackClick} />
            <p className={styles["course__title-text"]}>Back</p>
          </div>
        }
        rightComponent={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button
              buttonType={ButtonType.primary}
              prefixIcon={<BookmarkSimple size={IconSize.S} />}
              onClick={() => {}}
              title="Next"
            />
            <Button
              buttonType={ButtonType.secondary}
              prefixIcon={<X size={IconSize.S} />}
              onClick={() => {}}
              title="Cancel"
            />
          </div>
        }
      />
      <div className={styles.container}>
        <h1 className={styles['project-header']}>Create new project</h1>
        <h3 className={styles['project-sub-header']}>Edit the settings for your new project here</h3>
        <hr style={{ border: '1px solid #EEEFF1', margin: '20px 0' }} />
        <form className={styles.form}>
          <div>
            <div className={styles['project-title-label']}>Project name</div>
            <Input onChange={(value) => setProjectName(value)} value={projectName} placeholder='Enter project name' />
          </div>
          <div className={styles['project-title-label-margin']}>
            <div className={styles['project-title-label']}>Description</div>
            <Input onChange={(value) => setDescription(value)} value={description} placeholder='Enter project description' />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <div style={{ display: 'grid', fontSize: '12px', width: '80%' }}>
              <div className={styles['project-title-label']}>Add attachment</div>
              <div style={{ marginTop: '5px' }}>
                Only JPG, JPEG, PNG, GIF, and PDF formats with a max file size of 5 MB allowed (5 files)
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                buttonType={ButtonType.secondary}
                prefixIcon={<Plus size={IconSize.S} />}
                onClick={(e) => {
                  e.preventDefault();
                  handleFileClick();
                }}
                title="Add new file"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png,.gif,.pdf"
                onChange={handleFileChange}
                multiple
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className={styles["uploaded-files"]}>
            {files.map((file, index) => (
              <div key={index} className={styles["file-item"]}>
                <div className={styles["file-details"]}>
                  <img
                    src="/icons/pdf-icon.svg"
                    alt="File Type"
                    className={styles["file-icon"]}
                  />
                  <div>
                    <p className={styles["file-name"]}>{file.name}</p>
                    <p className={styles["file-size"]}>
                      {file.type} | {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  className={styles["remove-file-button"]}
                  onClick={() => handleFileRemove(index)}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
          <div>
            <div className={styles['project-title-label']}>Add Categories</div>
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              Add categories from the list or add it later inside the builder
            </div>
            <div style={{ marginTop: '5px' }} className={styles["w-search-input"]}>
              <Dropdown
                isSearchable={true}
                placeHolderLabel="Categories"
                options={Array.from({ length: 15 }).map((_, index) => ({
                  label: `Testing ${index + 1}`,
                  value: `Testing value ${index + 1}`,
                }))}
                onChange={handleCategoryChange}
                placeholder="Search categories"
                showOptionsLabel={true}
                optionsLabel="Categories"
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <div style={{ display: 'grid', fontSize: '12px', width: '70%' }}>
              <div className={styles['project-title-label']}>Within location geofence</div>
              <div style={{ marginTop: '5px' }}>
                While completing this project, user needs to be inside geo-fence of the store location
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EEEEF2', borderRadius: 8, padding: '5px' }}>
                Required
                <div style={{ height: '20px', width: '1px', backgroundColor: '#EEEEF2', margin: '0 10px' }} /> 
                <Toggle
                  checked={isAutoAssign}
                  onChange={handleAutoAssignChange}
                />
              </div>
            </div>
          </div>
          <hr style={{ border: '1px solid #EEEFF1', margin: '20px 0' }} />
        </form>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
          <div>Danger Zone</div>
          <div style={{ width: '120px' }}>
            <Button
              buttonType={ButtonType.secondary}
              onClick={() => {}}
              title="Delete project"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsCreate;
