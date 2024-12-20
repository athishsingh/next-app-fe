'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/src/components/table/Table';
import GeneralTableCell from '../components/GeneralTableCell/GeneralTableCell';
import Button from '@/src/components/button/Button';
import { ButtonType } from "@/src/components/button/types";
import { IconSize } from "@/src/constants/iconsize.constant";
import { NotePencil } from "@phosphor-icons/react";

export interface ManageUsers {
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

const ActiveTasks = () => {
    const router = useRouter();
    const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

    const onClickFunction = (user: ManageUsers) => {
        localStorage.setItem('manageUser', JSON.stringify(user));
        console.log('users,user', user)
        router.push(`/project-manage-view?id=${user.id}`);
    };

    const manageUsers: ManageUsers[] = [
        {
            id: "user1",
            projectName: "Project A",
            frequency: "Daily",
            status: 'Active',
            locations: '400',
            assigned_to: ["Software Engineer", "Senior Developer", "Project Manager", "UI/UX Designer"],
        },
        {
            id: "user2",
            projectName: "Project B",
            frequency: "Weekly",
            status: 'Draft',
            locations: '400',
            assigned_to: [
                "Software Engineer", "Senior Developer", "Project Manager", "UI/UX Designer",
                "Business Analyst", "HR Manager", "Database Administrator", "Frontend Developer",
            ],
        },
        {
            id: "user3",
            projectName: "Project C",
            frequency: "Monthly",
            status: 'Scheduled',
            locations: '400',
            assigned_to: ["Business Analyst", "HR Manager", "Database Administrator", "Frontend Developer"],
        },
        {
            id: "user4",
            projectName: "Project D",
            frequency: "Quarterly",
            status: 'Active',
            locations: '400',
            assigned_to: ["Quality Assurance", "System Analyst", "DevOps Engineer", "Product Manager"],
        },
    ];

    return (
        <Table
            rows={manageUsers.map((user, index) => {
                const assignedToValues = user.assigned_to || [];
                const remainingValues = assignedToValues.slice(1); // Exclude the first item to display the rest

                return {
                    id: index.toString(),
                    cells: [
                        {
                            component: (
                                <div style={{ width: "90px", overflow: "hidden" }}>
                                    <GeneralTableCell header="Project name" cellValue={user.projectName || "-"} />
                                </div>
                            ),
                        },
                        {
                            component: <GeneralTableCell header="Frequency" cellValue={user.frequency || "-"} />,
                        },
                        {
                            component: <GeneralTableCell header="Locations" cellValue={user.locations || "-"} />,
                        },
                        {
                            component: (
                                <div
                                    style={{
                                        width: "300px",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                    }}
                                    onMouseEnter={() => setHoveredUserId(user.id)}
                                    onMouseLeave={() => setHoveredUserId(null)}
                                >
                                    <GeneralTableCell
                                        header="Assigned to"
                                        cellValue={
                                            assignedToValues.length > 0
                                                ? `${assignedToValues[0]} +${remainingValues.length}`
                                                : "-"
                                        }
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "1.5",
                                            textAlign: "left",
                                        }}
                                    />
                                    {hoveredUserId === user.id && remainingValues.length > 0 && (
                                        <HoverPopover values={remainingValues} />
                                    )}
                                </div>
                            ),
                        },
                    ],
                    rightComponent: (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div>
                                <span
                                    style={{
                                        color:
                                            user.status === "Draft"
                                                ? "#D26300"
                                                : user.status === "Active"
                                                    ? "#34C759"
                                                    : "#717171",
                                    }}
                                >
                                    {user.status || "-"}
                                </span>
                                {user.status === "Scheduled" && <div style={{ fontSize: '12px' }}>09/09/2024</div>}
                            </div>
                            <Button
                                onClick={() => onClickFunction(user)}
                                buttonType={ButtonType.secondary}
                                title="Edit"
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
