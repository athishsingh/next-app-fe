'use client';
import Button from '@/src/components/button/Button';
import { ButtonType } from '@/src/components/Button/types';
import IconButton from '@/src/components/icon-button/IconButton';
import Toggle from '@/src/components/toggle/Toggle';
import { IconSize } from '@/src/constants/iconsize.constant';
import { ArrowLeft } from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';
const questions = [
    {
        id: 1,
        text: "Is Tables, Sofa Seat are cleaned (Tops - No Gum, No dust; SS polished)?",
        points: "02/10",
        actions: ["Yes", "No", "Clear"],
        showNA: true,
    },
    {
        id: 2,
        text: "Are windows and glasses properly cleaned (No stains; Dust-free)?",
        points: "05/10",
        actions: ["Yes", "No", "Clear"],
        showNA: true,
    },
];
const FormQuestionDetails = () => {


    const [markNAStates, setMarkNAStates] = useState([]);

    // Initialize NA states based on the questions length
    useEffect(() => {
        setMarkNAStates(Array(questions.length).fill(false));
    }, [questions]);

    const handleToggleChange = (index, value) => {
        setMarkNAStates((prevStates) => {
            const updatedStates = [...prevStates];
            updatedStates[index] = value;
            return updatedStates;
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '10px'
            }}
        >
            {questions.map((question, index) => (
                <div
                    key={question.id}
                    style={{
                        width: '60%',
                        border: '1px solid #EEEEF2',
                        borderRadius: '12px',
                        padding: '10px',
                        textAlign: 'left',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                    >
                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'black' }}>{question.text}</div>
                        <div style={{ fontSize: '12px', fontWeight: 500, color: '#D26300' }}>{question.points}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        {question.actions.map((action) => (
                            <Button
                                key={action}
                                buttonType={ButtonType.secondary}
                                onClick={() => { console.log(`${action} clicked for question ${question.id}`); }}
                                title={action}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                        <label style={{ fontSize: '12px', color: '#D26300' }}>Image </label>
                        <label style={{ fontSize: '12px', color: '#D26300' }}>Comment </label>
                        <label style={{ fontSize: '12px', color: '#D26300' }}>Raise ticket </label>
                        <label style={{ fontSize: '12px', color: '#D26300' }}>NA </label>
                        <Toggle
                            checked={markNAStates[index]}
                            onChange={(value) => handleToggleChange(index, value)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FormQuestionDetails;