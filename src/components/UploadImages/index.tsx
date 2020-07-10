import React, { useState, useEffect } from 'react';
import { Upload, notification } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Uploader: React.FC<any> = ({
  request,
  wall,
  limit,
  showUploadButton,
  value = {},
  onChange,
}: any) => {
  const [fileList, setfileList] = useState<any>([]);

  useEffect(()=>{
    if(Array.isArray(value))
    setfileList(value);
  },[value])

  const handlePreview = async (file: any) => {
    if (file.response?.url || file.url) {
      window.open(file.response?.url ? file.response.url : file.url, '_blank');
      return;
    }
    notification.error({
      description: "picture did'nt get uploaded",
      message: 'Sorry',
    });
  };

  const onDeleteHandler = () => {};

  // eslint-disable-next-line no-shadow
  const onFileListChange = ({ fileList }: any) => {
    setfileList([...fileList]);
    onChange(
      fileList
        .filter((file: any) => file.response?.url || file.url)
        .map((file: any) => ({ uid: file.uid, url: file.response.url })),
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
      {wall ? (
        <Dragger
          customRequest={request}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={onDeleteHandler}
          onChange={onFileListChange}
          showUploadList={{ showPreviewIcon: true, showDownloadIcon: false, showRemoveIcon: true }}
          multiple
          style={{ margin: '5px' }}
          accept=".JPEG,.JPG,.PNG,.gif,.jfif,.octet-stream"
        >
          {/* {fileList.length >= 8 && showUploadButton ? null : uploadButton} */}
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      ) : (
        <Upload
          customRequest={request}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={onDeleteHandler}
          onChange={onFileListChange}
          showUploadList={{ showPreviewIcon: true, showDownloadIcon: false, showRemoveIcon: true }}
          accept=".JPEG,.JPG,.PNG,.gif,.jfif,.octet-stream"
          multiple
        >
          {fileList.length >= limit && !showUploadButton ? null : uploadButton}
        </Upload>
      )}
    </div>
  );
};

export default Uploader;
