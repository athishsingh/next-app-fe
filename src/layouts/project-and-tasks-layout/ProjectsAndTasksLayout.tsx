'use client'
import ProjectAndTaskHeader from '@/src/app/(main)/projects/components/ProjectsAndTasksHeader/project&taskHeader'
import React from 'react'
import styles from "./ProjectAndTasksLayout.module.scss"
import ProjectsAndTasksNavbar from '@/src/app/(main)/projects/components/ProjectsAndTasksNavbar/ProjectsAndTasksNavbar';
type Props = { children: React.ReactNode };
const ProjectsAndTasksLayout = ({ children }: Props) => {
    return (
        <div >
            <ProjectAndTaskHeader />
            <ProjectsAndTasksNavbar />
            {children}
        </div>
    )
}

export default ProjectsAndTasksLayout