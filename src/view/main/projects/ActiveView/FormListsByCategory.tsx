'use client';
import Button from '@/src/components/button/Button';
import { ButtonType } from '@/src/components/Button/types';
import Header from '@/src/components/header/Header';
import Toggle from '@/src/components/toggle/Toggle';
import { IconSize } from '@/src/constants/iconsize.constant';
import { ArrowRight } from '@phosphor-icons/react';
import React, { useState } from 'react';
import FormQuestionDetails from './FormQuestionDetails';

const FormListsByCategory = ({ category }) => {
    // State for each toggle
    const [markAllYes, setMarkAllYes] = useState(false);
    const [markAllNo, setMarkAllNo] = useState(false);
    const [markAllNA, setMarkAllNA] = useState(false);

    // Handlers for toggles
    const handleToggleChange = (type, value) => {
        switch (type) {
            case 'yes':
                setMarkAllYes(value);
                break;
            case 'no':
                setMarkAllNo(value);
                break;
            case 'na':
                setMarkAllNA(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Header
                leftComponent={
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', gap: '20px', padding: '10px' }}>
                        <div>Points: 08/10</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ color: 'orange', cursor: 'pointer' }}>Mark all Yes</span>
                            <Toggle
                                checked={markAllYes}
                                onChange={(value) => handleToggleChange('yes', value)}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ color: 'orange', cursor: 'pointer' }}>Mark all No</span>
                            <Toggle
                                checked={markAllNo}
                                onChange={(value) => handleToggleChange('no', value)}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ color: 'orange', cursor: 'pointer' }}>Mark all NA</span>
                            <Toggle
                                checked={markAllNA}
                                onChange={(value) => handleToggleChange('na', value)}
                            />
                        </div>
                    </div>
                }
                rightComponent={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ textAlign: 'center', textWrap: 'nowrap' }}>Form 1 of 2</div>
                        <div style={{ paddingTop: '1px' }}>
                            <Button
                                buttonType={ButtonType.tertiary}
                                prefixIcon={<ArrowRight size={IconSize.S} />}
                                onClick={() => { }}
                                title="Next"
                            />
                        </div>

                    </div>
                }
            />
            <div>
                <FormQuestionDetails />
            </div>
        </>
    );
};

export default FormListsByCategory;
