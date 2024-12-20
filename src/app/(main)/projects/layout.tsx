import React from 'react'
import ProjectsAndTasksLayout from '@/src/layouts/project-and-tasks-layout/ProjectsAndTasksLayout'

type Props = { children: React.ReactNode }

const layout = ({ children }: Props) => {
    return (
        <ProjectsAndTasksLayout children={children} />
    )
}

export default layout