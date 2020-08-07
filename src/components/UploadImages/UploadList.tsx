import React from 'react';
import { Table, Tooltip, Spin } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import {
  MenuOutlined,
  EyeOutlined,
  PaperClipOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import arrayMove from 'array-move';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const CSortableContainer = SortableContainer((props: any) => <tbody {...props} />);

const SortableTable: React.FC<any> = ({
  fileList,
  onFileListChange,
  handlePreview,
  onDeleteHandler,
}) => {
  const onDelete = (file: any) => {
    onFileListChange({ fileList: fileList.filter((f: any) => file.uid !== f.uid) });
    if (onDeleteHandler) onDeleteHandler();
  };

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '85%',
      className: 'drag-visible',
      render: (text: string, record: any) => (
        <div
          onClick={() => handlePreview(record)}
          style={{ color: record.status === 'error' ? 'red' : 'inherit' }}
        >
          <PaperClipOutlined /> {text || record.url?.split('/')[record.url.split('/').length - 1]}{' '}
          {record.status === 'uploading' ? <Spin indicator={antIcon} /> : null}
        </div>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      render: (text, record) => (
        <div className="Dragable-list-action">
          <span onClick={() => handlePreview(record)}>
            <Tooltip title="Open">
              <EyeOutlined />
            </Tooltip>
          </span>
          {/* <span>
            <Tooltip title="Download">
              <DownloadOutlined />
            </Tooltip>
          </span> */}
          <span onClick={() => onDelete(record)}>
            <Tooltip title="Delete">
              <DeleteOutlined style={{ color: 'red' }} />
            </Tooltip>
          </span>
        </div>
      ),
    },
  ];

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(fileList), oldIndex, newIndex).filter((el) => !!el);
      onFileListChange({ fileList: newData });
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = fileList.findIndex((x) => x.uid === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = (props: any) => (
    <CSortableContainer useDragHandle helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );

  return (
    <Table
      className="Dragable-list"
      showHeader={false}
      pagination={false}
      dataSource={fileList}
      columns={columns}
      rowKey="uid"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};

export default SortableTable;
