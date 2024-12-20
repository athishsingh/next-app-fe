'use client'
import Table from '@/src/components/table/Table';
import React from 'react'
import GeneralTableCell from '../components/GeneralTableCell/GeneralTableCell';
import Button from '@/src/components/button/Button';
import { useRouter } from 'next/navigation';
import { ButtonType } from "@/src/components/button/types";
import { IconSize } from "@/src/constants/iconsize.constant";
import { ArrowCounterClockwise  } from "@phosphor-icons/react";

export interface ActiveUsers {
    id: string;
    projectName: string;
    frequency: string;
    status: string;
}

const ActiveTaks = () => {
    const router = useRouter();
    const activeUsers: ActiveUsers[] = [
        {
            id: "user1",
            projectName: "Project A",
            frequency: "Daily",
            status: 'In progress'
        },
        {
            id: "user2",
            projectName: "Project B",
            frequency: "Weekly",
            status: 'Completed'
        },
        {
            id: "user3",
            projectName: "Project C",
            frequency: "Monthly",
            status: 'Overdue'
        },
        {
            id: "user4",
            projectName: "Project D",
            frequency: "Quarterly",
            status: 'In progress'
        },
    ];
    return (
        <Table
            rows={activeUsers.map((user, index) => ({
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
                ],
                rightComponent: (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Button
                            onClick={() => router.push(`/project-form?id=${user.id}`)}
                            buttonType={ButtonType.secondary}
                            title="Restore"
                            prefixIcon={<ArrowCounterClockwise  size={IconSize.S} />}
                        />
                    </div>
                ),
            }))}
        />
    )
}

export default ActiveTaks