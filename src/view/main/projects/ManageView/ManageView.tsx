'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/src/components/header/Header';
import IconButton from '@/src/components/icon-button/IconButton';
import Button from '@/src/components/button/Button';
import { IconSize } from '@/src/constants/iconsize.constant';
import { ArrowLeft, ArrowSquareOut, BookmarkSimple, CloudArrowUp, Folders, PencilSimple } from '@phosphor-icons/react';
import Rules from './RulesAndSettings/Rules';
import Builder from './Builder/Builder';
import styles from './ManageView.module.scss';
import Library from './Builder/Library/Library';

const ManageView = () => {
    const router = useRouter();
    const [user, setUser] = useState<ManageUsers | null>(null);
    const [activeTab, setActiveTab] = useState('Builder'); // Manage active tab state
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false); // Manage side panel visibility
    const [activeIndex, setActiveIndex] = useState(0);
    const closeSidePanel = () => {
        setIsSidePanelOpen(false);
      };
    useEffect(() => {
        const storedUser = localStorage.getItem('manageUser');
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

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const settingDetail: settingDetail[] = [
        'Assignments',
        'Grades & Actions',
        'Reporting & Notifications',
        'Display',
    ];

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
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                            buttonType="tertiary"
                            prefixIcon={<BookmarkSimple size={IconSize.S} />}
                            onClick={() => {}}
                            title="Save changes"
                        />
                        <Button
                            buttonType="primary"
                            prefixIcon={<ArrowSquareOut size={IconSize.S} />}
                            onClick={() => {}}
                            title="Launch"
                        />
                    </div>
                }
            />
            <div className={styles['tabs-container']}>
                <div className={styles['tabs-left']}>
                    <div
                        className={`${styles['tab-item']} ${activeTab === 'Builder' ? styles.active : ''}`}
                        onClick={() => handleTabClick('Builder')}
                    >
                        Builder
                    </div>
                    <div
                        className={`${styles['tab-item']} ${activeTab === 'Rules' ? styles.active : ''}`}
                        onClick={() => handleTabClick('Rules')}
                    >
                        Rules & Settings
                    </div>
                </div>
                <div className={styles['tabs-right']}>
                    <Button
                        buttonType="secondary"
                        prefixIcon={<CloudArrowUp size={IconSize.S} />}
                        onClick={() => {}}
                        title="Bulk edit"
                    />
                    <Button
                        buttonType="secondary"
                        prefixIcon={<Folders size={IconSize.S} />}
                        onClick={() => setIsSidePanelOpen(true)}
                        title="Library"
                    />
                </div>
            </div>
            <hr style={{ border: '1px solid #EEEFF1', margin: '10px 0' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', height: '72vh' }}>
                {activeTab === 'Rules' && (
                    <>
                        <div style={{ flex: '0 0 25%' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {settingDetail.map((form, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <div
                                            key={index}
                                            className={`form-item ${isActive ? 'active' : ''}`}
                                            style={{
                                                padding: '10px',
                                                backgroundColor: isActive ? '#FBEBE3' : '#fff',
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
                                                    paddingLeft: '40px',
                                                }}
                                            >
                                                {form}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{ borderLeft: '1px solid #EEEEF2', height: '100%' }}></div>
                        <div style={{ flex: '1', textAlign: 'left' }}>
                            <Rules step={settingDetail[activeIndex]} />
                        </div>
                    </>
                )}
                {activeTab === 'Builder' && <Builder />}
            </div>

            {/* Side Panel */}
            <div className={`${styles['side-panel']} ${isSidePanelOpen ? styles.open : ''}`}>
               <Library onClose={closeSidePanel} />
            </div>
        </>
    );
};

export default ManageView;
