import React, { useState, useEffect } from 'react';
import { Upload, notification, Button } from 'antd';
import { PlusOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import UploadList from './UploadList';

const { Dragger } = Upload;

const Uploader: React.FC<any> = ({
  request,
  type,
  limit,
  value = {},
  showUploadList,
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

  const onDeleteHandler = (file: any) => {
    // setfileList(fileList.filter((f: any) => file.uid !== f.uid));
  };

  // eslint-disable-next-line no-shadow
  const onFileListChange = ({ fileList }: any) => {
    setfileList([...fileList]);
    onChange(fileList);
  };

  const Render = () => {
    switch (type) {
      case 'wall-list':
        return (
          <div>
            <Dragger
              customRequest={request}
              fileList={fileList}
              onChange={onFileListChange}
              showUploadList={false}
              multiple
              style={{ margin: '5px' }}
              accept=".JPEG,.JPG,.PNG,.gif,.jfif,.octet-stream"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
            <UploadList
              fileList={fileList}
              showUploadList={
                showUploadList || {
                  showPreviewIcon: true,
                  showDownloadIcon: false,
                  showRemoveIcon: true,
                }
              }
              onFileListChange={onFileListChange}
              handlePreview={handlePreview}
              onDeleteHandler={onDeleteHandler}
            />
          </div>
        );

      case 'button':
        return (
          <Upload
            customRequest={request}
            fileList={fileList}
            onPreview={handlePreview}
            onRemove={onDeleteHandler}
            onChange={onFileListChange}
            showUploadList={
              showUploadList || {
                showPreviewIcon: true,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }
            }
            accept=".JPEG,.JPG,.PNG,.gif,.jfif,.octet-stream"
            multiple
          >
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        );

      default:
        return (
          <Dragger
            customRequest={request}
            fileList={fileList}
            onPreview={handlePreview}
            onRemove={onDeleteHandler}
            onChange={onFileListChange}
            listType="picture-card"
            showUploadList={
              showUploadList || {
                showPreviewIcon: true,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }
            }
            multiple
            style={{ margin: '5px' }}
            accept=".JPEG,.JPG,.PNG,.gif,.jfif,.octet-stream"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        );
    }
  };
  return <div className="clearfix">{Render()}</div>;
};

export default Uploader;
