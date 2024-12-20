'use client'
import React, { useEffect, useState, useRef } from 'react';
import Header from "@/src/components/header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import { IconSize } from "@/src/constants/iconsize.constant";
import { ArrowLeft, BookmarkSimple, X, Plus } from "@phosphor-icons/react";
import { useRouter } from "nextjs-toploader/app";
import styles from './ProjectsCreate.module.scss'; // Adjust the import based on your file structure
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Input from '@/src/components/input/Input';

// import { useSearchParams } from 'next/navigation';


const ProjectsCreate = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const  user = useZustandStore()
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(['Zero tolerance checklist', 'King\'s journey RT', 'FSC']);
  const [isGeoFenceRequired, setGeoFenceRequired] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

    let validFiles = [];
    let invalidFiles = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          invalidFiles.push(`File ${file.name} exceeds 5 MB`);
        } else if (!acceptedFormats.includes(file.type)) {
          invalidFiles.push(`File ${file.name} is not an accepted format`);
        } else {
          validFiles.push(file);
        }
      }

      if (validFiles.length > 5) {
        alert('You can upload a maximum of 5 files.');
      } else {
        // Process valid files here (e.g., upload them)
        console.log('Valid files:', validFiles);
      }

      if (invalidFiles.length > 0) {
        alert(invalidFiles.join('\n'));
      }
    }
  }
  // useEffect(() => {
  //   const  userId = searchParams.get('id');
  //   const fetchData = async() => {
  //     const result  = await fetch(`/api/nymbleup/${userId}`);
  //   }
  //   fetchData();
  // }, [])

  const handleBackClick = () => {
    router.back();
  };
  const handleButtonClick = () => {
    // Trigger file input when button is clicked
    fileInputRef.current.click();
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
            <p className={styles["course__title-text"]}>Back</p>
          </div>
        }
        rightComponent={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button
              buttonType={ButtonType.primary}
              prefixIcon={<BookmarkSimple size={IconSize.S} />}
              onClick={() => { }}
              title="Next"
            />
            <Button
              buttonType={ButtonType.secondary}
              prefixIcon={<X size={IconSize.S} />}
              onClick={() => { }}
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
            <div className={styles['project-title-label']}>
              Project name
            </div>
            <div >
              <Input onChange={(value) => handleChangeInput(value)} value={projectName} placeholder='Search' />
            </div>
          </div>
          <div className={styles['project-title-label-margin']}>
            <div className={styles['project-title-label']}>
              Description
            </div>
            <div className={styles['w-input']} >
              <Input onChange={(value) => handleChangeInput(value)} value={description} placeholder='Search' />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'grid', fontSize: '12px', width: '80%' }}>
                <div className={styles['project-title-label']}>Add attachment</div>
                <div style={{ marginTop: '5px' }}>Only JPG, JPEG, PNG, GIF and PDF formats with max file size of 5 mb maximum allowed (5 files)</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                buttonType={ButtonType.secondary}
                prefixIcon={<Plus size={IconSize.S} />}
                onClick={handleButtonClick}
                title="Add new file"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png,.gif,.pdf"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectsCreate;
