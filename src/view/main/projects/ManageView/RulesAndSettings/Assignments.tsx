import React, { useState } from 'react';
import DatePicker from '@/src/components/datepicker/DatePicker';
import styles from "../ManageView.module.scss";
import Infotile from '@/src/components/info-tile/Infotile';
import Toggle from '@/src/components/toggle/Toggle';
import Dropdown from '@/src/components/dropdown/Dropdown';
import Button from '@/src/components/button/Button';
import { ButtonType } from '@/src/components/Button/types';
import { BookmarkSimple, Clock, Plus } from '@phosphor-icons/react';
import { IconSize } from '@/src/constants/iconsize.constant';
import TimePicker from '@/src/components/time-picker/TimePicker';

const Assignments = () => {
    type DurationOption = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biennially' | 'one_time' | 'anytime';
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>("2024-07-06T01:00:00.000Z");
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<DurationOption>('daily');
    const [selectedMonth, setSelectedMonth] = useState<string>(''); // Separate for month
    const [selectedButton, setSelectedButton] = useState<string | null>('allDay');
    const [selectedButtonSignOff, setSelectedButtonSignOff] = useState<string | null>('yes');
    const [selectedAssinBy, setSelectedAssinBy] = useState<string>(''); // Separate for duration
    const [selectedAssinTo, setSelectedAssinTo] = useState<string>(''); // Separate for duration
    const [selectedTime, setSelectedTime] = useState<string>(''); // Separate for duration
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedStartDay, setSelectedStartDay] = useState<string>('');
    const [selectedEndDay, setSelectedEndDay] = useState<string>('');

    const [selectedFrequency, setSelectedFrequency] = useState<string>('');
    const [dailyRows, setDailyRows] = useState<{ id: number; startTime: string; endTime: string }[]>([]);
    const [weeklyRows, setWeeklyRows] = useState<{ id: number; day: string, frequency: string, startTime: string; endTime: string }[]>([]);
    const [monthlyRows, setMonthlyRows] = useState<{ id: number; day: string, frequency: string, startTime: string; endTime: string }[]>([]);
    const [selectedRepeat, setSelectedRepeat] = useState<string>('');

    const handleAddRow = () => {
        if (selectedDuration[0].value == 'daily') {
            console.log('hete')
            setDailyRows([
                ...dailyRows,
                { id: dailyRows.length + 1, startTime: "09:00 am", endTime: "09:00 am" },
            ]);
        }
        if (selectedDuration[0].value == 'weekly') {
            console.log('hete2')
            setWeeklyRows([
                ...weeklyRows,
                { id: weeklyRows.length + 1, day: '', frequency: '', startTime: "09:00 am", endTime: "09:00 am" },
            ]);
        }
        if (selectedDuration[0].value == 'monthly') {
            console.log('hete3')
            setMonthlyRows([
                ...monthlyRows,
                { id: monthlyRows.length + 1, day: '', frequency: '', startTime: "09:00 am", endTime: "09:00 am" },
            ]);
        }

    };

    const handleDeleteRow = (id: number) => {
        if (selectedDuration[0].value == 'daily') {
            const updatedRows = dailyRows.filter(row => row.id !== id);
            const renumberedRows = updatedRows.map((row, index) => ({
                ...row,
                id: index + 1, // Reset the serial number starting from 1
            }));
            setDailyRows(renumberedRows);
        }
        if (selectedDuration[0].value == 'weekly') {
            const updatedRows = weeklyRows.filter(row => row.id !== id);
            const renumberedRows = updatedRows.map((row, index) => ({
                ...row,
                id: index + 1, // Reset the serial number starting from 1
            }));
            setWeeklyRows(renumberedRows);
        }
        if (selectedDuration[0].value == 'monthly') {
            const updatedRows = monthlyRows.filter(row => row.id !== id);
            const renumberedRows = updatedRows.map((row, index) => ({
                ...row,
                id: index + 1, // Reset the serial number starting from 1
            }));
            setMonthlyRows(renumberedRows);
        }
    };

    const handleTimeChange = (id: number, type: "startTime" | "endTime", time: string) => {
        const updatedRows = dailyRows.map((row) =>
            row.id === id ? { ...row, [type]: time } : row
        );
        setDailyRows(updatedRows);
    };

    const handleChangeDuration = (value: DurationOption) => {
        console.log(value, 'value')
        setSelectedDuration(value);
    };

    const handleChangeMonth = (value: string) => {
        console.log(value, 'cal')
        setSelectedMonth(value);
    };
    const handleChangeDay = (value: string) => {
        console.log(value, 'cal')
        setSelectedDay(value);
    };
    const handleChangeStartDay = (value: string) => {
        console.log(value, 'cal')
        setSelectedStartDay(value);
    };
    const handleChangeEndDay = (value: string) => {
        console.log(value, 'cal')
        setSelectedEndDay(value);
    };
    const handleChangeRepeat = (value: string) => {
        console.log(value, 'cal')
        setSelectedRepeat(value);
    };
    const handleChangeFrequency = (value: string) => {
        console.log(value, 'cal')
        setSelectedFrequency(value);
    };
    const handleChangeAssignBy = (value: string) => {
        console.log(value, 'cal')
        setSelectedAssinBy(value);
    };
    const handleChangeAssignTo = (value: string) => {
        console.log(value, 'cal')
        setSelectedAssinTo(value);
    };

    const selectButton = (button: string) => {
        setSelectedButton(button);
    };
    const selectButtonSignOff = (button: string) => {
        setSelectedButtonSignOff(button);
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 auto',
                }}
            >
                <div style={{ width: '1%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Validity</div>
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
                                    <DatePicker
                                        date={selectedStartDate ? new Date(selectedStartDate) : null}
                                        placeholder="Start date"
                                        onSelect={(val: string) => {
                                            setSelectedStartDate(val);
                                        }}
                                    />
                                    <DatePicker
                                        placeholder="End date"
                                        date={selectedEndDate ? new Date(selectedEndDate) : null}
                                        onSelect={(val: string) => {
                                            setSelectedEndDate(val);
                                        }}
                                    />
                                    <Infotile
                                        title="Never ends"
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
                <div style={{ width: '1%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Frequency</div>
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
                                    <div className={styles["w-search-input"]}>
                                        <Dropdown
                                            selectedOption={selectedDuration}
                                            isSearchable={true}
                                            placeHolderLabel="Duration"
                                            options={[
                                                { label: "Daily", value: "daily" },
                                                { label: "Weekly", value: "weekly" },
                                                { label: "Monthly", value: "monthly" },
                                                { label: "Quarterly", value: "quarterly" },
                                                { label: "Biennially", value: "biennially" },
                                                { label: "One Time", value: "one_time" },
                                                { label: "Anytime", value: "anytime" }
                                            ]}
                                            onChange={(selectedOption) => handleChangeDuration(selectedOption)}
                                            placeholder="search Duration"
                                            showOptionsLabel={true}
                                            optionsLabel="Duration"
                                        />
                                    </div>
                                    {selectedDuration[0]?.value == 'monthly' && (
                                        <div className={styles["w-search-input"]}>
                                            <Dropdown
                                                selectedOption={selectedMonth}
                                                isSearchable={true}
                                                placeHolderLabel="Month"
                                                options={[
                                                    { label: "January", value: "jan" },
                                                    { label: "February", value: "feb" },
                                                    { label: "March", value: "mar" },
                                                    { label: "April", value: "apr" },
                                                    { label: "May", value: "may" },
                                                    { label: "June", value: "jun" },
                                                    { label: "July", value: "jul" },
                                                    { label: "August", value: "aug" },
                                                    { label: "September", value: "sep" },
                                                    { label: "October", value: "oct" },
                                                    { label: "November", value: "nov" },
                                                    { label: "December", value: "dec" },
                                                ]}
                                                onChange={(selectedOption) => handleChangeMonth(selectedOption)}
                                                placeholder="search Month"
                                                showOptionsLabel={true}
                                                optionsLabel="Month"
                                            />
                                        </div>
                                    )}
                                    {(selectedDuration[0]?.value == 'weekly' && selectedButton == 'allDay') && (
                                        <Dropdown
                                            selectedOption={selectedRepeat}
                                            isSearchable={true}
                                            placeHolderLabel="Frequency"
                                            options={[
                                                { label: "Every Week", value: '1' },
                                                { label: "Every 2 Weeks", value: '2' },
                                            ]}
                                            onChange={(selectedOption) => handleChangeRepeat(selectedOption)}
                                            placeholder="select repeat"
                                            showOptionsLabel={true}
                                            optionsLabel="Frequency"
                                        />
                                    )}

                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            {(
                selectedDuration[0]?.value === 'monthly' ||
                selectedDuration[0]?.value === 'daily' ||
                selectedDuration[0]?.value === 'weekly'
            ) && (
                    <div
                        style={{
                            display: 'flex',
                            width: '90%',
                            alignItems: 'center',
                            margin: '0 auto',
                        }}
                    >
                        <div style={{ width: selectedDuration[0]?.value === 'monthly' ? '20%' : '15%', textAlign: 'left' }}>
                            <div style={{ fontWeight: 600, color: 'black' }}>Days</div>
                        </div>
                        <div style={{ width: '40%', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%' }}>
                                <div className={styles["button-group-container"]}>
                                    <div className={styles["button-group"]}>
                                        <button
                                            className={`${styles["btn-class"]} ${selectedButton === 'allDay' ? styles["active-button"] : ''}`}
                                            onClick={() => selectButton('allDay')}
                                        >
                                            All day
                                        </button>
                                        <button
                                            className={`${styles["btn-class"]} ${selectedButton === 'fixedTime' ? styles["active-button"] : ''}`}
                                            onClick={() => selectButton('fixedTime')}
                                        >
                                            Fixed {selectedDuration[0]?.value === 'daily' ? 'Time' : 'Days'}
                                        </button>
                                        {selectedDuration[0]?.value === 'monthly' && (
                                            <button
                                                className={`${styles["btn-class"]} ${selectedButton === 'dueDate' ? styles["active-button"] : ''}`}
                                                onClick={() => selectButton('dueDate')}
                                            >
                                                Due date
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {selectedButton === 'fixedTime' && (
                            <div>
                                <Button
                                    buttonType={ButtonType.secondary}
                                    prefixIcon={<Plus size={IconSize.S} />}
                                    onClick={handleAddRow}
                                    title="Add date"
                                />
                            </div>
                        )}
                    </div>
                )}

            {(selectedButton === 'fixedTime' && selectedDuration[0]?.value === 'daily') && (
                <div
                    style={{
                        display: 'flex',
                        width: '90%',
                        alignItems: 'center',
                        margin: '0 auto',
                    }}
                >
                    <div style={{ width: '9%', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, color: 'black' }}></div>
                    </div>
                    <div style={{ width: '60%', textAlign: 'left' }}>
                        <div>
                            <SettingComponent
                                title=""
                                rightComponent={dailyRows.length > 0 &&
                                    dailyRows.map((row) => (
                                        <div
                                            key={row.id}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                margin: "10px 0",
                                            }}
                                        >
                                            <span style={{ fontWeight: 600 }}>{String(row.id).padStart(2, "0")}</span>

                                            <TimePicker
                                                timeValue={row.startTime}
                                                label="Start time"
                                                onChange={(time) => handleTimeChange(row.id, "startTime", time)}
                                            />

                                            <TimePicker
                                                timeValue={row.endTime}
                                                label="End time"
                                                onChange={(time) => handleTimeChange(row.id, "endTime", time)}
                                            />
                                            <Button
                                                buttonType={ButtonType.secondary}
                                                title="Delete"
                                                onClick={() => handleDeleteRow(row.id)}
                                            />
                                        </div>
                                    ))}
                            />
                        </div>
                    </div>
                </div>
            )}
            {(selectedButton === 'fixedTime' && selectedDuration[0]?.value === 'weekly') && (
                <div
                    style={{
                        display: 'flex',
                        width: '90%',
                        alignItems: 'center',
                        margin: '0 auto',
                    }}
                >
                    <div style={{ width: '9%', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, color: 'black' }}></div>
                    </div>
                    <div style={{ width: '60%', textAlign: 'left' }}>
                        <div>
                            <SettingComponent
                                title=""
                                rightComponent={weeklyRows.length > 0 &&
                                    weeklyRows.map((row) => (
                                        <div
                                            key={row.id}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                margin: "10px 0",
                                            }}
                                        >
                                            <span style={{ fontWeight: 600 }}>{String(row.id).padStart(2, "0")}</span>
                                            <Dropdown
                                                selectedOption={selectedDay}
                                                isSearchable={true}
                                                placeHolderLabel="Day"
                                                options={[
                                                    { label: "Monday", value: "monday" },
                                                    { label: "Tuesday", value: "tuesday" },
                                                    { label: "Wednesday", value: "wednesday" },
                                                    { label: "Thursday", value: "thursday" },
                                                    { label: "Friday", value: "friday" },
                                                    { label: "Saturday", value: "saturday" },
                                                    { label: "Sunday", value: "sunday" },
                                                ]}
                                                onChange={(selectedOption) => handleChangeDay(selectedOption)}
                                                placeholder="select day"
                                                showOptionsLabel={true}
                                                optionsLabel="Days"
                                            />
                                            <Dropdown
                                                selectedOption={selectedFrequency}
                                                isSearchable={true}
                                                placeHolderLabel="Frequency"
                                                options={[
                                                    { label: "Anytime", value: "anytime" },
                                                    { label: "Fixed Time", value: "specific_time" },
                                                ]}
                                                onChange={(selectedOption) => handleChangeFrequency(selectedOption)}
                                                placeholder="select frequency"
                                                showOptionsLabel={true}
                                                optionsLabel="Frequency"
                                            />
                                            {selectedFrequency[0]?.value === 'specific_time' && (
                                                <>
                                                    <TimePicker
                                                        timeValue={row.startTime}
                                                        label="Start time"
                                                        onChange={(time) => handleTimeChange(row.id, "startTime", time)}
                                                    />
                                                    <TimePicker
                                                        timeValue={row.endTime}
                                                        label="End time"
                                                        onChange={(time) => handleTimeChange(row.id, "endTime", time)}
                                                    />
                                                </>
                                            )}

                                            <Button
                                                buttonType={ButtonType.secondary}
                                                title="Delete"
                                                onClick={() => handleDeleteRow(row.id)}
                                            />
                                        </div>
                                    ))}
                            />
                        </div>
                    </div>
                </div>
            )}

            {(selectedButton === 'fixedTime' && selectedDuration[0]?.value === 'monthly') && (
                <div
                    style={{
                        display: 'flex',
                        width: '90%',
                        alignItems: 'center',
                        margin: '0 auto',
                    }}
                >
                    <div style={{ width: '9%', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, color: 'black' }}></div>
                    </div>
                    <div style={{ width: '60%', textAlign: 'left' }}>
                        <div>
                            <SettingComponent
                                title=""
                                rightComponent={monthlyRows.length > 0 &&
                                    monthlyRows.map((row) => (
                                        <div
                                            key={row.id}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                margin: "10px 0",
                                            }}
                                        >
                                            <span style={{ fontWeight: 600 }}>{String(row.id).padStart(2, "0")}</span>
                                            <Dropdown
                                                selectedOption={selectedDay}
                                                isSearchable={true}
                                                placeHolderLabel="Day"
                                                options={[
                                                    { label: "Monday", value: "monday" },
                                                    { label: "Tuesday", value: "tuesday" },
                                                    { label: "Wednesday", value: "wednesday" },
                                                    { label: "Thursday", value: "thursday" },
                                                    { label: "Friday", value: "friday" },
                                                    { label: "Saturday", value: "saturday" },
                                                    { label: "Sunday", value: "sunday" },
                                                ]}
                                                onChange={(selectedOption) => handleChangeDay(selectedOption)}
                                                placeholder="select day"
                                                showOptionsLabel={true}
                                                optionsLabel="Days"
                                            />
                                            <Dropdown
                                                selectedOption={selectedFrequency}
                                                isSearchable={true}
                                                placeHolderLabel="Frequency"
                                                options={[
                                                    { label: "Anytime", value: "anytime" },
                                                    { label: "Fixed Time", value: "specific_time" },
                                                ]}
                                                onChange={(selectedOption) => handleChangeFrequency(selectedOption)}
                                                placeholder="select frequency"
                                                showOptionsLabel={true}
                                                optionsLabel="Frequency"
                                            />
                                            {selectedFrequency[0]?.value === 'specific_time' && (
                                                <>
                                                    <TimePicker
                                                        timeValue={row.startTime}
                                                        label="Start time"
                                                        onChange={(time) => handleTimeChange(row.id, "startTime", time)}
                                                    />
                                                    <TimePicker
                                                        timeValue={row.endTime}
                                                        label="End time"
                                                        onChange={(time) => handleTimeChange(row.id, "endTime", time)}
                                                    />
                                                </>
                                            )}

                                            <Button
                                                buttonType={ButtonType.secondary}
                                                title="Delete"
                                                onClick={() => handleDeleteRow(row.id)}
                                            />
                                        </div>
                                    ))}
                            />
                        </div>
                    </div>
                </div>
            )}

            {(selectedButton === 'dueDate' && selectedDuration[0]?.value === 'monthly') && (
                <div
                    style={{
                        display: 'flex',
                        width: '90%',
                        alignItems: 'center',
                        margin: '0 auto',
                        marginTop: '10px'
                    }}
                >
                    <div style={{ width: '25%', textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, color: 'black' }}></div>
                    </div>
                    <div style={{ width: '40%', textAlign: 'left', display: 'flex', gap: '10px' }}>
                        <div>
                            <Dropdown
                                selectedOption={selectedStartDay}
                                isSearchable={true}
                                placeHolderLabel="Start day"
                                options={[
                                    { label: "Monday", value: "monday" },
                                    { label: "Tuesday", value: "tuesday" },
                                    { label: "Wednesday", value: "wednesday" },
                                    { label: "Thursday", value: "thursday" },
                                    { label: "Friday", value: "friday" },
                                    { label: "Saturday", value: "saturday" },
                                    { label: "Sunday", value: "sunday" },
                                ]}
                                onChange={(selectedOption) => handleChangeStartDay(selectedOption)}
                                placeholder="select day"
                                showOptionsLabel={true}
                                optionsLabel="Start day"
                            />
                        </div>
                        <div>
                            <Dropdown
                                selectedOption={selectedEndDay}
                                isSearchable={true}
                                placeHolderLabel="End day"
                                options={[
                                    { label: "Monday", value: "monday" },
                                    { label: "Tuesday", value: "tuesday" },
                                    { label: "Wednesday", value: "wednesday" },
                                    { label: "Thursday", value: "thursday" },
                                    { label: "Friday", value: "friday" },
                                    { label: "Saturday", value: "saturday" },
                                    { label: "Sunday", value: "sunday" },
                                ]}
                                onChange={(selectedOption) => handleChangeEndDay(selectedOption)}
                                placeholder="select day"
                                showOptionsLabel={true}
                                optionsLabel="End day"
                            />
                        </div>
                    </div>
                </div>
            )}


            <div
                style={{
                    display: 'flex',
                    width: '90%',
                    alignItems: 'center',
                    margin: '0 auto',
                }}
            >
                <div style={{ width: '9%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Assign by</div>
                </div>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <div>
                        <SettingComponent
                            title=""
                            rightComponent={
                                <div
                                    style={{
                                        gap: '10px',
                                    }}
                                >
                                    <div className={styles["w-search-input"]}>
                                        <Dropdown
                                            selectedOption={selectedAssinBy}
                                            isSearchable={true}
                                            placeHolderLabel="Location"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeAssignBy(selectedOption)}
                                            placeholder="search Location"
                                            showOptionsLabel={true}
                                            optionsLabel="Location"
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
                }}
            >
                <div style={{ width: '9%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Assign to</div>
                </div>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <div>
                        <SettingComponent
                            title=""
                            rightComponent={
                                <div
                                    style={{
                                        gap: '10px',
                                    }}
                                >
                                    <div className={styles["w-search-input"]}>
                                        <Dropdown
                                            selectedOption={selectedAssinTo}
                                            isSearchable={true}
                                            placeHolderLabel="Location"
                                            options={[

                                            ]}
                                            onChange={(selectedOption) => handleChangeAssignTo(selectedOption)}
                                            placeholder="search Location"
                                            showOptionsLabel={true}
                                            optionsLabel="Location"
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
                }}
            >
                <div style={{ width: '12%', textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'black' }}>Project sign off</div>
                </div>
                <div style={{ width: '40%', textAlign: 'left', }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%' }}>
                        <div className={styles["button-group-container"]}>
                            <div className={styles["button-group"]}>
                                <button
                                    className={`${styles["btn-class"]} ${selectedButtonSignOff === 'yes' ? styles["active-button"] : ''}`}
                                    onClick={() => selectButtonSignOff('yes')}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`${styles["btn-class"]} ${selectedButtonSignOff === 'no' ? styles["active-button"] : ''}`}
                                    onClick={() => selectButtonSignOff('no')}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
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

export default Assignments;
