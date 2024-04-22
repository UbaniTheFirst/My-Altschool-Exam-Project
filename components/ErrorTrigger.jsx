import React from 'react';

const ErrorTrigger = ({ className }) => {
    const handleClick = () => {
        alert("This is a test page for error handling. If anything goes wrong in the components, an error will be triggered.");
        throw new Error("This is a test page for error handling. If anything goes wrong in the components, an error will be triggered.");
    };

    return (
        <button onClick={handleClick} className={className}>Trigger Error</button>
    );
};

export default ErrorTrigger;
