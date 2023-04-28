import React, { useRef, useEffect } from 'react';
import cn from 'classnames';

function Textarea({ className, textLabel, labelClasses, inputClassName, onChange, value, text, autoFocus = true }) {
    const inputClasses = cn('textarea', inputClassName);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (autoFocus) textAreaRef.current.focus();
    }, [autoFocus]);

    const handleInputChange = (e) => {
        e.preventDefault();

        const value = e.target.value;

        onChange(value);
    };


    const renderInput = () => {
        return <textarea ref={textAreaRef} className={inputClasses} onChange={handleInputChange} value={value} placeholder={text} />
    };

    const textLabelClasses = cn('label', { labelClasses });

    return <label className={className}>
        <div className={textLabelClasses}>{ textLabel }</div>
        { renderInput() }
    </label>;
}

export default Textarea;