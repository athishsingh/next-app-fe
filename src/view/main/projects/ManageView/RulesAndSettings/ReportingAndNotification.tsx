'use client';
import Dropdown from '@/src/components/dropdown/Dropdown';
import React, { useState } from 'react'
import styles from "../ManageView.module.scss";
import Infotile from '@/src/components/info-tile/Infotile';
import Toggle from '@/src/components/toggle/Toggle';

const ReportingAndNotification = () => {
    const [selectedReports, setSelectedReports] = useState<string>('');

    const handleChangeReports = (value: string) => {
        console.log(value, 'cal')
        setSelectedReports(value);
    };
    const [selectedNotifications, setSelectedNotifications] = useState<string>('');

    const handleChangeNotifications = (value: string) => {
        console.log(value, 'cal')
        setSelectedNotifications(value);
    };
    const [selectedBeforeCount, setSelectedBeforeCount] = useState<string>('');

    const handleChangeBeforeCount = (value: string) => {
        console.log(value, 'cal')
        setSelectedBeforeCount(value);
    };
    const [selectedAfterCount, setSelectedAfterCount] = useState<string>('');

    const handleChangeAfterCount= (value: string) => {
        console.log(value, 'cal')
        setSelectedAfterCount(value);
    };

    

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    alignItems: 'center',
                    margin: '0 auto',
                    marginTop: '-20px'
                }}
            >
                <div style={{ width: '20%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Reports</div>
                </div>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <div >
                        <SettingComponent
                            title=""
                            rightComponent={
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <div className={styles["w-search-input"]}>
                                        <Dropdown
                                            selectedOption={selectedReports}
                                            isSearchable={true}
                                            placeHolderLabel="Designation"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeReports(selectedOption)}
                                            placeholder="Select designation"
                                            showOptionsLabel={true}
                                            optionsLabel="Designation"
                                        />
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    alignItems: 'center',
                    margin: '0 auto',
                    marginTop: '-20px'
                }}
            >
                <div style={{ width: '20%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Notifications</div>
                </div>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <div >
                        <SettingComponent
                            title=""
                            rightComponent={
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <div className={styles["w-search-input"]}>
                                        <Dropdown
                                            selectedOption={selectedNotifications}
                                            isSearchable={true}
                                            placeHolderLabel="Designation"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeNotifications(selectedOption)}
                                            placeholder="Select designation"
                                            showOptionsLabel={true}
                                            optionsLabel="Designation"
                                        />
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 auto',
                    marginTop: '-20px'
                }}
            >
                <div style={{ width: '20%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Trigger notifications</div>
                </div>
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <div style={{ marginLeft: '-100px' }}>
                        <SettingComponent
                            title=""
                            rightComponent={
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Infotile
                                        title="Project start"
                                        rightComponent={<Toggle />}
                                    />

                                    <Infotile
                                        title="Project completed"
                                        rightComponent={<Toggle />}
                                    />
                                    <Infotile
                                        title="Project overdue"
                                        rightComponent={<Toggle />}
                                    />
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 auto',
                }}
            >
                <div style={{ width: '55%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Reminder</div>
                </div>
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            fontWeight: 400, fontSize: "14px", whiteSpace: 'nowrap',
                            color: ' #8E8EA9',
                        }}>Before project starts</div>
                        <div className={styles["w-search-input"]}>
                            <Dropdown
                                selectedOption={selectedBeforeCount}
                                isSearchable={true}
                                placeHolderLabel="Count"
                                options={[

                                ]}
                                onChange={(selectedOption) => handleChangeBeforeCount(selectedOption)}
                                placeholder="Select days"
                                showOptionsLabel={true}
                                optionsLabel="Days"
                            />
                        </div>
                        <div className={styles["w-search-input"]}>
                            <Dropdown
                                isSearchable={true}
                                placeHolderLabel="Time"
                                options={[

                                ]}
                                showOptionsLabel={true}
                                optionsLabel="Days"
                            />
                        </div>
                    </div>
                </div>
            </div >
            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 auto',
                    marginTop: '20px'
                }}
            >
                <div style={{ width: '55%', textAlign: 'left' }}>
                </div>
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            fontWeight: 400, fontSize: "14px", whiteSpace: 'nowrap',
                            color: ' #8E8EA9',
                        }}>Before project ends</div>
                        <div className={styles["w-search-input"]}>
                        <Dropdown
                                selectedOption={selectedAfterCount}
                                isSearchable={true}
                                placeHolderLabel="Count"
                                options={[

                                ]}
                                onChange={(selectedOption) => handleChangeAfterCount(selectedOption)}
                                placeholder="Select days"
                                showOptionsLabel={true}
                                optionsLabel="Days"
                            />
                        </div>
                        <div className={styles["w-search-input"]}>
                            <Dropdown
                                isSearchable={true}
                                placeHolderLabel="Time"
                                options={[

                                ]}
                                showOptionsLabel={true}
                                optionsLabel="Days"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
const SettingComponent = ({
    title,
    rightComponent,
}: {
    title: string;
    rightComponent?: React.ReactNode;
}) => {
    return (
        <div className={styles["settings__component"]}>
            <div className={styles["settings__left-component"]}>
                <p className={styles["title__text"]}>{title}</p>
            </div>
            <div className={styles["settings__right-component"]}>{rightComponent}</div>
        </div>
    );
};
export default ReportingAndNotification