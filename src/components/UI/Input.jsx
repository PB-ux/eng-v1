import React, { memo, useEffect, useRef } from 'react';
import cn from 'classnames';

function Input({ onChange, value, className, labelClasses, inputClassName, autoFocus = false, textLabel, text = 'text', type }) {
    const inputClasses = cn('input', inputClassName);
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus) inputRef.current.focus();
    }, [autoFocus]);

    const handleInputChange = (e) => {
        e.preventDefault();

        const value = e.target.value;

        onChange(value);
    };


    const renderInput = () => {
        return <input ref={inputRef} className={inputClasses} onChange={handleInputChange} value={value} placeholder={text} type={type} />
    };

    const textLabelClasses = cn('label', { labelClasses });

    return <label className={className}>
        <div className={textLabelClasses}>{ textLabel }</div>
        { renderInput() }
    </label>;
}

export default memo(Input);