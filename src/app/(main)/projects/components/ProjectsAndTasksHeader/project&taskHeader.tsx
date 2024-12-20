import React, { useEffect, useState } from 'react';
import Header from "@/src/components/header/Header";
import Styles from "./ProjectsTasksHeader.module.scss";
import Input from '@/src/components/input/Input';
import { useRouter } from 'next/navigation'; // Fix import
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import Dropdown from '@/src/components/dropdown/Dropdown';
import Button from '@/src/components/button/Button';
import { IconSize } from "@/src/constants/iconsize.constant";

const ProjectAndTaskHeader = () => {
    const router = useRouter();
    const [userInput, setUserInput] = useState('');
    const [selectedStore, setSelectedStore] = useState<{ label: string; value: string }>({ label: 'Testing 1', value: 'Testing value 1' });

    const handleChangeInput = (userInput: string) => {
        setUserInput(userInput);
        if (userInput) {
            router.push(`?storeSearchParam=${userInput}`); // Fix search param name
        }
    };

    useEffect(() => {
        console.log(selectedStore);
    }, [selectedStore]);

    const handleClickCreate = () => {
        router.push('/project-form');
    };

    return (
        <div className="parent__class_athish">
            <Header
                classnames="nu-ai-center"
                leftComponent={
                    <div className="nu-flex nu-ai-center nu-f-center h-full">
                        <span className={Styles["projects-label"]}>Projects & Tasks</span>
                    </div>
                }
                paddingBottom={12}
                paddingTop={12}
                rightComponent={
                    <div className={Styles["w-input"]}>
                        <Input
                            prefixIcon={<MagnifyingGlass size={20} />}
                            onChange={(value) => handleChangeInput(value)}
                            value={userInput}
                            placeholder="Search"
                        />
                        <div className={Styles["w-search-input"]}>
                            <Dropdown
                                selectedOption={selectedStore}
                                isSearchable={true}
                                placeHolderLabel="Store"
                                options={Array.from({ length: 15 }).map((_, index) => ({
                                    label: `Testing ${index + 1}`,
                                    value: `Testing value ${index + 1}`,
                                }))}
                                onChange={(selectedOption) => setSelectedStore(selectedOption)}
                                placeholder="search store"
                                showOptionsLabel={true}
                                optionsLabel="Store"
                            />
                        </div>
                        <Button
                            onClick={handleClickCreate}
                            title="Create"
                            prefixIcon={<Plus size={IconSize.L} />}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default ProjectAndTaskHeader;
