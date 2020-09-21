import * as React from 'react';
import { Descriptions } from 'antd';
import dayjs from 'dayjs';

// export interface IAppProps {}

const BasicOrderView: React.FC<any> = ({
  OrderInfo: { supplier, outlet, delieveryDate, supplierInvoiceNumber, createdAt, createdBy, note },
}) => {
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="Supplier">{supplier?.companyName}</Descriptions.Item>
        <Descriptions.Item label="Deliver to">{outlet?.name}</Descriptions.Item>
        <Descriptions.Item label="Delivery due">
          {dayjs(delieveryDate).format('MMMM D YYYY, h:mm:ss a')}
        </Descriptions.Item>
        <Descriptions.Item label="Supplier Invoice ">{supplierInvoiceNumber}</Descriptions.Item>
        <Descriptions.Item label="Created">
          {dayjs(createdAt).format('MMMM D YYYY, h:mm:ss a')}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Recived">{}</Descriptions.Item> */}
        <Descriptions.Item label="Created by">{createdBy}</Descriptions.Item>
        <Descriptions.Item label="Note">{note}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default BasicOrderView;
