import React from 'react';
import Assignments from './Assignments';
import ProjectSettings from './GradesAndActions';
import ReportingAndNotification from './ReportingAndNotification';

const Rules = ({ step }) => {
    console.log(step, 'rules');

    const renderContent = () => {
        switch (step) {
            case 'Assignments':
                return <div><Assignments /></div>;
            case 'Grades & Actions':
                return <div><ProjectSettings /></div>;
            case 'Reporting & Notifications':
                return <div><ReportingAndNotification /></div>;
            case 'Display':
                return <div>Step 4: Final Guidelines</div>;
            default:
                return <div>Welcome! Please select a step to view rules.</div>;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default Rules;
