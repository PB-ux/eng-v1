import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Controller } from 'react-hook-form';

import { present } from 'src/lib/RamdaHelpers';

function MdEditor({ control, name, errors, rules, }) {
    return <>
        <Controller control={control} render={({ field }) => <MDEditor {...field} className="admin__theory-editor" />} name="description" rules={rules} />
        { present(errors) ? <span className="input__errors">{errors[name]?.message}</span> : null }
    </>

}

export default MdEditor;