import React from 'react'
import TinyMCEEditor from '../TinyMCEEditor/TinyMCEEditor';

const TinyTextArea = (props) => {
    return (
        <TinyMCEEditor
            name={props.name}
            value={props.value}
            onEditorChange={(newValue) => {
                newValue = newValue.replace(/<[^>]*>/g, "");
                props.setFieldValue(props.name, newValue);
            }}
        />
    )
}

export default TinyTextArea