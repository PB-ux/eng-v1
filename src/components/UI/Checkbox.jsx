import React from 'react';
import cn from 'classnames';

function Checkbox({className, inputClassName, labelClassName, label, onChange, checked}) {
    const classes = cn('checkbox', className);
    const classesLabel = cn('checkbox__description', labelClassName);

    const onChangeInput = (e) => {
        const checked = e.target.checked;

        onChange(checked);
    };

    return <label className={classes}>
        <input onChange={onChangeInput} className={cn('checkbox__input', inputClassName)} checked={checked} type="checkbox" />
        <div className={classesLabel}>{label}</div>
    </label>;
}

export default Checkbox;