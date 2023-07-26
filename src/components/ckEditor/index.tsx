import React, { Component } from 'react';
import { CKEditor } from 'ckeditor4-react';
import useField from '../../payload/admin/components/forms/useField';

type Props = { path: string; label: string; name: string; required: boolean };

const EditorField: React.FC<Props> = (props: Props) => {
  const { path, label, name, required } = props;
  const { value, setValue } = useField<Props>({ path });
  return (
    <div className="field-type text">
      <label className="field-label">
        {label || name.toUpperCase()}
        {required && <span className="required">*</span>}
      </label>
      <CKEditor
        editorUrl="/assets/ckeditor/ckeditor.js"
        onChange={e => {
          setValue(e.editor.getData());
        }}
        onFocus={e => {
          setValue(e.editor.getData());
        }}
        onBlur={e => {
          setValue(e.editor.getData());
        }}
        onSelectionChange={e => {
          setValue(e.editor.getData());
        }}
        initData={value ? `${value}` : ''}
        config={{
          extraPlugins: 'easyimage,editorplaceholder,colorbutton,imageresize,imageresizerowandcolumn,youtube',
          editorplaceholder: 'Start typing here...',
          height: 450,
          removePlugins: 'image',
          cloudServices_uploadUrl: '/api/v1/ckeditor/upload',
          cloudServices_tokenUrl: '/api/v1/ckeditor/token',
          imageResize: { maxWidth: 800, maxHeight: 800 },
          easyimage_toolbar: [
            'EasyImageAlignLeft',
            'EasyImageAlignCenter',
            'EasyImageAlignRight',
            'EasyImageFull',
            'EasyImageSide',
            'EasyImageAlt',
          ],
        }}
      />
    </div>
  );
};

export default EditorField;
