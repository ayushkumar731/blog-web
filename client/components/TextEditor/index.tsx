/* eslint-disable react/prop-types */
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = (props: any) => {
  const { onEditorStateChange, editorState } = props;

  function uploadImageCallBack(file: any) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 4d0248de9be9893');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      },
    );
  }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        inline: { inDropdown: false },
        list: { inDropdown: false },
        textAlign: { inDropdown: false },
        link: { inDropdown: false },
        history: { inDropdown: false },
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
        },
      }}
    />
  );
};

export default TextEditor;
