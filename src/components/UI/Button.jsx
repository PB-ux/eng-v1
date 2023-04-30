import React from 'react';
import cn from 'classnames';

import { present } from 'src/lib/RamdaHelpers.js';

function Button({ children, onClick, className, type = 'button' }) {

    const handleOnClick = (e) => {
        if (present(onClick)) {
            e.preventDefault();
            onClick(e);
        }
    };

    return <button className={cn('general-btn', className)} onClick={handleOnClick} type={type}>
        <span className="general-btn__text">{ children }</span>
    </button>;
}

export default Button;