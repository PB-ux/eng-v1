import React from 'react';
import cn from 'classnames';

function Button({ children, onClick, className }) {

    const handleOnClick = (e) => {
        e.preventDefault();

        onClick(e);
    };

    return <button className={cn('general-btn', className)} onClick={handleOnClick}>
        <span className="general-btn__text">{ children }</span>
    </button>;
}

export default Button;