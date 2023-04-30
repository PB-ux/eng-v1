import React from 'react';
import cn from 'classnames';

import { present } from 'src/lib/RamdaHelpers.js';

function Textarea({ className, textLabel, labelClasses, inputClassName, text, register, name, required, validationSchema, errors }) {
    const inputClasses = cn('textarea', inputClassName);

    const renderInput = () => {
        return <textarea  {...register(name, validationSchema)}  className={inputClasses} placeholder={text} />
    };

    const textLabelClasses = cn('label', { labelClasses });

    return <label className={className}>
        <div className={textLabelClasses}>
            { textLabel }
            { required && present(errors[name]) ? <span className="input__required">*</span> : null }
        </div>
        { renderInput() }
        { present(errors) ? <span className="input__errors">{errors[name]?.message}</span> : null }
    </label>;
}

export default Textarea;