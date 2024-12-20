'use client';
import React, { useEffect, useState } from 'react';
import Table from '@/src/components/table/Table';
import GeneralTableCell from '../components/GeneralTableCell/GeneralTableCell';
import Button from '@/src/components/button/Button';
import { useRouter } from 'nextjs-toploader/app';
import { ButtonType } from '@/src/components/button/types';
import { IconSize } from '@/src/constants/iconsize.constant';
import { NotePencil } from '@phosphor-icons/react';
import { useSearchParams } from 'next/navigation';
import { getData } from '@/src/services/data.service';

export const StoreSearchParam = 'query';

export interface ActiveUsers {
    id: string;
    projectName: string;
    frequency: string;
    locations: string;
    assigned_to: string[];
    status: string;
}

const HoverPopover = ({ values }: { values: string[] }) => {
    return (
        <div
            style={{
                position: 'absolute',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                padding: '8px',
                zIndex: 10,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '200px',
                maxHeight: '150px',
                overflowY: 'auto',
            }}
        >
            <ul>
                {values.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </div>
    );
};

const activeUsers: ActiveUsers[] = [
    {
        id: 'user1',
        projectName: 'Project A',
        frequency: 'Daily',
        status: 'In progress',
        locations: '400',
        assigned_to: ['Software Engineer', 'Senior Developer', 'Project Manager', 'UI/UX Designer'],
    },
    {
        id: 'user2',
        projectName: 'Project B',
        frequency: 'Weekly',
        status: 'Completed',
        locations: '400',
        assigned_to: [
            'Software Engineer',
            'Senior Developer',
            'Project Manager',
            'UI/UX Designer',
            'Business Analyst',
            'HR Manager',
            'Database Administrator',
            'Frontend Developer',
        ],
    },
    {
        id: 'user3',
        projectName: 'Project C',
        frequency: 'Monthly',
        status: 'Overdue',
        locations: '400',
        assigned_to: ['Business Analyst', 'HR Manager', 'Database Administrator', 'Frontend Developer'],
    },
    {
        id: 'user4',
        projectName: 'Project D',
        frequency: 'Quarterly',
        status: 'Completed',
        locations: '400',
        assigned_to: ['Quality Assurance', 'System Analyst', 'DevOps Engineer', 'Product Manager'],
    },
];

const ActiveTasks = () => {

    const router = useRouter();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Tracks the hovered row index
    const params = useSearchParams();
    const onClickFunction = (user: ActiveUsers) => {
        localStorage.setItem('activeUser', JSON.stringify(user));
        router.push(`/project-active-view?id=${user.id}`);
    };

    useEffect(() => {
        const storeQuery = params.get(StoreSearchParam);
        try {
            const fetchData = async () => {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos");
                const data = await response.json();
                console.log(data)
            }
            fetchData();
        } catch (err) {

        }

    }, [])


    return (
        <Table
            rows={activeUsers.map((user, index) => {
                const assignedToValues = user.assigned_to || [];
                const remainingValues = assignedToValues.slice(1);

                return {
                    id: index.toString(),
                    cells: [
                        {
                            component: (
                                <div style={{ width: '90px', overflow: 'hidden' }}>
                                    <GeneralTableCell header="Project name" cellValue={user.projectName || '-'} />
                                </div>
                            ),
                        },
                        {
                            component: <GeneralTableCell header="Frequency" cellValue={user.frequency || '-'} />,
                        },
                        {
                            component: <GeneralTableCell header="Locations" cellValue={user.locations || '-'} />,
                        },
                        {
                            component: (
                                <div
                                    style={{
                                        width: '300px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <GeneralTableCell
                                        header="Assigned to"
                                        cellValue={
                                            assignedToValues.length > 0
                                                ? `${assignedToValues[0]} +${remainingValues.length}`
                                                : '-'
                                        }
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                            textAlign: 'left',
                                        }}
                                    />
                                    {hoveredRow === index && remainingValues.length > 0 && (
                                        <HoverPopover values={remainingValues} />
                                    )}
                                </div>
                            ),
                        },
                    ],
                    rightComponent: (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <GeneralTableCell
                                header="Status"
                                cellValue={
                                    <span
                                        style={{
                                            color:
                                                user.status === 'In progress'
                                                    ? '#D26300'
                                                    : user.status === 'Completed'
                                                        ? '#34C759'
                                                        : '#D26300',
                                        }}
                                    >
                                        {user.status || '-'}
                                    </span>
                                }
                            />
                            <Button
                                onClick={() => onClickFunction(user)}
                                buttonType={ButtonType.secondary}
                                title="View"
                                prefixIcon={<NotePencil size={IconSize.S} />}
                            />
                        </div>
                    ),
                };
            })}
        />
    );
};

export default ActiveTasks;
