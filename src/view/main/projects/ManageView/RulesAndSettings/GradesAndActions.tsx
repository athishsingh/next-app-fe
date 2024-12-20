import React, { useState } from 'react';
import styles from "../ManageView.module.scss";
import Infotile from '@/src/components/info-tile/Infotile';
import Toggle from '@/src/components/toggle/Toggle';
import IconButton from '@/src/components/icon-button/IconButton';
import { Info } from '@phosphor-icons/react';
import { IconSize } from '@/src/constants/iconsize.constant';
import Dropdown from '@/src/components/dropdown/Dropdown';

const Tooltip = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);


    return (
        <div
            style={{ position: 'relative', marginTop: '8px' }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <IconButton icon={<Info size={IconSize.L} />} onClick={() => { }} />
            {isVisible && (
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#000',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        zIndex: 10,
                        whiteSpace: 'normal',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        width: '500px',
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

const GradesAndActions = () => {
    const [selectedCompletedBy, setSelectedCompletedBy] = useState<string>('');

    const handleChangeCompletedBy = (value: string) => {
        console.log(value, 'cal')
        setSelectedCompletedBy(value);
    };
    const [selectedApprovalBy, setSelectedApprovalBy] = useState<string>('');

    const handleChangeApprovalBy = (value: string) => {
        console.log(value, 'cal')
        setSelectedApprovalBy(value);
    };


    const [selectedActionPlan, setSelectedActionPlan] = useState<string>('');

    const handleChangeActionPlan = (value: string) => {
        console.log(value, 'cal')
        setSelectedActionPlan(value);
    };

    const [selectedAutoApprove, setSelectedAutoApprove] = useState<string>('');

    const handleChangeAutoApprove = (value: string) => {
        console.log(value, 'cal')
        setSelectedAutoApprove(value);
    };
    const sections = [
        {
            title: 'Grades',
            tooltips: [],
        },
        {
            title: 'Actions',
            tooltips: [
                "Note - Any non-compliant questions will become a part of corrective action plan. Location managers will be required to submit an action plan on completion of each project",
            ],
        },
        {
            title: 'Raise actions',
            tooltips: [
                "Note - An assignee can create and assign actions manually for any steps throughout the project",
            ],
        },
        {
            title: 'Open actions',
            tooltips: [
                "Note - Status of the Projects can be kept on hold if Action plan is not submitted",
            ],
        },
        {
            title: 'Upload files',
            tooltips: [
                "Note - Upload a supporting file can be made mandatory for every Action",
            ],
        },
    ];

    return (
        <div
            style={{
                height: '66vh', // Restricts the height to 90% of the viewport
                overflowY: 'auto', // Adds vertical scrolling when content exceeds the height
            }}
        >
            {sections.map((section, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        width: '90%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 auto',
                        marginTop: index === 0 ? '0' : '-20px',
                    }}
                >
                    <div style={{ width: '20%', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, color: 'black' }}>{section.title}</div>
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
                                        <Infotile title="Applicable" rightComponent={<Toggle />} />
                                        {section.tooltips.map((tooltip, i) => (
                                            <Tooltip key={i} content={tooltip} />
                                        ))}
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}
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
                    <div style={{ fontWeight: 600, color: 'black' }}>To be completed by</div>
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
                                            selectedOption={selectedCompletedBy}
                                            isSearchable={true}
                                            placeHolderLabel="Designation"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeCompletedBy(selectedOption)}
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
                    <div style={{ fontWeight: 600, color: 'black' }}>Submit Action Plan Within</div>
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
                                            selectedOption={selectedActionPlan}
                                            isSearchable={true}
                                            placeHolderLabel="Days"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeActionPlan(selectedOption)}
                                            placeholder="Select days"
                                            showOptionsLabel={true}
                                            optionsLabel="Days"
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
                    <div style={{ fontWeight: 600, color: 'black' }}>Action required</div>
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
                                        title="Not required"
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
                    alignItems: 'center',
                    margin: '0 auto',
                    marginTop: '-20px'
                }}
            >
                <div style={{ width: '20%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Approval by</div>
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
                                            selectedOption={selectedApprovalBy}
                                            isSearchable={true}
                                            placeHolderLabel="Designation"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeApprovalBy(selectedOption)}
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
                    <div style={{ fontWeight: 600, color: 'black' }}>Auto approve</div>
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
                                            selectedOption={selectedAutoApprove}
                                            isSearchable={true}
                                            placeHolderLabel="Days"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeAutoApprove(selectedOption)}
                                            placeholder="Select days"
                                            showOptionsLabel={true}
                                            optionsLabel="Days"
                                        />
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
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

export default GradesAndActions;
