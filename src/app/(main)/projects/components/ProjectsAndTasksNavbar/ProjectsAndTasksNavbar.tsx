import React, { useState } from 'react'
import { subNavbarRoutes } from './project-tasks-routes.data';
import Tabs from '@/src/components/tabs/Tabs';
import { usePathname, useRouter } from 'next/navigation';
import styles from "./ProjectsTasksnavbar.module.scss";
import Header from '@/src/components/header/Header';
import { p } from 'framer-motion/client';
import Button from '@/src/components/button/Button';
import { ButtonType } from "@/src/components/button/types";
import { IconSize } from "@/src/constants/iconsize.constant";
import { Funnel } from "@phosphor-icons/react";

const ProjectsAndTasksNavbar = () => {
    const pathName = usePathname();
    const getIsActive = (string: string): boolean => {
        return pathName.includes(string);
    };
    return (
        <>
            <Header
                leftComponent={
                    <div className='nu-flex nu-gap-2 h-full' style={{ height: '44px', padding: '0px 10px' }}>
                        {subNavbarRoutes.map((ele) => {
                            return (
                                <div className="nu-f-center h-full" key={ele.name}>
                                    <Tabs
                                        isActive={getIsActive(ele.key)}
                                        route={ele.route}
                                        title={ele.name}
                                        key={ele.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                }
                rightComponent={
                    <div style={{ marginTop: '5px' }}>  {/* Adding a wrapper div with margin-top */}
                        <Button
                            onClick={() => { }}
                            buttonType={ButtonType.secondary}
                            title="Filters"
                            prefixIcon={<Funnel size={IconSize.L} />}
                        />
                    </div>
                }
            />
        </>
    );

}

export default ProjectsAndTasksNavbar