import React, { useState, useEffect } from 'react';
import { Upload, notification, Button } from 'antd';
import { PlusOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';

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

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) setfileList(value);
  }, [value]);

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
    onChange(fileList);
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
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      ) : (
        <Upload
          customRequest={request}
          listType={!showUploadButton ? 'picture-card' : undefined}
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={onDeleteHandler}
          onChange={onFileListChange}
          showUploadList={{ showPreviewIcon: true, showDownloadIcon: false, showRemoveIcon: true }}
          accept=".JPEG,.JPG,.PNG,.gif,.jfif,.octet-stream"
          multiple
        >
          {showUploadButton ? (
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          ) : (
            uploadButton
          )}
        </Upload>
      )}
    </div>
  );
};

export default Uploader;
