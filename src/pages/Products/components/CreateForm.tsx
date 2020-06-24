import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Select, Steps, Row, Col, Spin, Tag } from 'antd';
import { FormInstance } from 'antd/lib/form';
import CreateVariation from './CreateVariationFrom';
import {
  getAllBrands,
  getAllSuppliers,
  getAllcategories,
  getAllAttributes,
  getSubCategories,
} from '../service';

export interface FormValueType {
  name?: string;
  supplier?: number;
  brand?: number;
  productType?: string;
  stockAvailableAt?: string;
  category?: number;
  subCategory?: number;
  subSubCategory?: number;
}

export interface BarcodeType {
  barcode?: string;
  supplyPrice?: number;
}

export interface FormVarationsValueType {
  sku?: string;
  slug?: string;
  costPrice?: number;
  barcodes?: Array<BarcodeType>;
}

export interface CreateFormProps {
  onClose: (flag?: boolean, formVals?: FormValueType) => void;
  Open: boolean;
}

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const productInitialValues: FormValueType = {
  productType: 'eboves',
  stockAvailableAt: 'web',
};
const CreateForm: React.FC<CreateFormProps> = ({ onClose, Open }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [allBrands, SetallBrands] = useState<{ id: number; name: string }[]>([]);
  const [allSuppliers, SetallSuppliers] = useState<{ id: number; companyName: string }[]>([]);
  const [allAttributes, SetallAttributes] = useState<{ id: number; name: string; type: string }[]>(
    [],
  );
  const [variationForms, setVariationForms] = useState<any[]>([React.createRef<FormInstance>()]);
  const [productForm] = Form.useForm();

  const [categories, SetCategories] = useState<{ id: number; name: string; categoryId: number }[]>(
    [],
  );
  const [Subcategories, SetSubcategories] = useState<
    { id: number; name: string; categoryId: number }[]
  >([]);
  const [SubSubcategories, SetSubSubcategories] = useState<
    { id: number; name: string; categoryId: number }[]
  >([]);

  useEffect(() => {
    getAllBrands().then((response) => {
      SetallBrands(response);
    });
    getAllSuppliers().then((response) => {
      SetallSuppliers(response);
    });
    getAllcategories().then((response) => {
      SetCategories(response);
    });
    getAllAttributes().then((response) => {
      SetallAttributes(response);
    });
  }, []);

  const onCategoryChangeHandler = (value: number) => {
    setLoading(true);
    productForm.setFieldsValue({ subCategory: null, subSubCategory: null });
    getSubCategories(value).then((response) => {
      SetSubcategories(response);
      setLoading(false);
    });
  };
  const onSubCategoryChangeHandler = (value: number) => {
    setLoading(true);
    productForm.setFieldsValue({ subSubCategory: null });
    getSubCategories(value).then((response) => {
      SetSubSubcategories(response);
      setLoading(false);
    });
  };

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await productForm.validateFields(); // this will throw an error if anything went wrong
    if (currentStep === 1) {
      // console.log(variationForms)  // console.log(variationForms)
      try {
        variationForms.map(async (formCurrent) => {
          const tmp = await formCurrent.current.validateFields();
          console.log(tmp);
        });
      } catch (e) {
        throw Error('error');
      }
      // forward();
    } else if (currentStep < 2) {
      forward();
    } else {
      // onSubmit({ ...formVals, ...fieldsValue });
    }
  };

  const createNewVariation = () => {
    setVariationForms((prestate) => [...prestate, React.createRef<FormInstance>()]);
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          {variationForms &&
            // eslint-disable-next-line no-shadow
            variationForms.map((ref, index) => (
              <CreateVariation
                createNewVariation={createNewVariation}
                // eslint-disable-next-line no-unneeded-ternary
                showRemove={variationForms.length > 1}
                key={index}
                attributes={productForm.getFieldValue('attributes')}
                sn={index}
                ref={ref}
              />
            ))}
        </>
      );
    }
    if (currentStep === 2) {
      return <>Success Full Created</>;
    }
    return (
      <>
        <Form layout="vertical" form={productForm} initialValues={productInitialValues}>
          <Row gutter={16}>
            <Col lg={24} md={24} sm={24}>
              <FormItem
                name="name"
                label="Name"
                // rules={[{ required: true, message: 'its is required!' }]}
              >
                <Input placeholder="Enter here.." />
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12}>
              <FormItem name="supplier" label="Supplier">
                <Select style={{ width: '100%' }} placeholder="please select">
                  {allSuppliers &&
                    allSuppliers.map((supplier: { id: number; companyName: string }) => (
                      <Option key={supplier.id} value={supplier.id}>
                        {supplier.companyName}
                      </Option>
                    ))}
                </Select>
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12}>
              <FormItem name="brand" label="Brand">
                <Select style={{ width: '100%' }} placeholder="please select">
                  {allBrands &&
                    allBrands.map((brand: { id: number; name: string }) => (
                      <Option key={brand.id} value={brand.id}>
                        {brand.name}
                      </Option>
                    ))}
                </Select>
              </FormItem>
            </Col>

            <Col lg={12} md={12} sm={12}>
              <FormItem name="productType" label="Product Type">
                <Select style={{ width: '100%' }} placeholder="please select">
                  <Option value="eboves">Eboves</Option>
                  <Option value="supplier">Other Supplier</Option>
                </Select>
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12}>
              <FormItem name="stockAvailableAt" label="Stock Available At">
                <Select style={{ width: '100%' }} placeholder="please select">
                  <Option value="web">Web</Option>
                  <Option value="store">Store</Option>
                </Select>
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8}>
              <FormItem name="category" label="Category">
                <Select
                  style={{ width: '100%' }}
                  onChange={onCategoryChangeHandler}
                  placeholder="please select"
                >
                  {categories &&
                    categories.map((category: { id: number; name: string }) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
              </FormItem>
            </Col>
            <Col lg={8} md={8} sm={8}>
              <FormItem name="subCategory" label="Sub Category">
                <Select
                  placeholder="please select"
                  style={{ width: '100%' }}
                  onChange={onSubCategoryChangeHandler}
                >
                  {Subcategories &&
                    Subcategories.map(
                      (category: { id: number; name: string; categoryId: number }) => {
                        return (
                          <Option key={category.id} value={category.id}>
                            {category.name}{' '}
                          </Option>
                        );
                      },
                    )}
                </Select>
              </FormItem>
            </Col>
            <Col lg={8} md={8} sm={8}>
              <FormItem label="Sub Sub Category" name="subSubCategory">
                <Select style={{ width: '100%' }} placeholder="please select">
                  {SubSubcategories &&
                    SubSubcategories.map(
                      (category: { id: number; name: string; categoryId: number }) => {
                        return (
                          <Option key={category.id} value={category.id}>
                            {category.name}{' '}
                          </Option>
                        );
                      },
                    )}
                </Select>
              </FormItem>
            </Col>
            <Col lg={24} md={24} sm={24}>
              <FormItem
                name="desc"
                label="Description"
                // rules={[{ required: true, message: '', min: 5 }]}
              >
                <TextArea rows={4} placeholder="Enter.." />
              </FormItem>
            </Col>
            <Col lg={24} md={24} sm={24}>
              <FormItem
                label="Attributes"
                name="attributes"
                // rules={[{ required: true, message: '', min: 5 }]}
              >
                <Select
                  mode="multiple"
                  labelInValue
                  placeholder="Select attributes"
                  size="large"
                  // optionLabelProp="optionLable"
                  optionFilterProp="optionLable"
                  style={{ width: '100%' }}
                >
                  {allAttributes.map((attribute: { id: number; name: string; type: string }) => (
                    <Option key={attribute.id} value={attribute.id} optionLable={attribute.name}>
                      {attribute.name} &nbsp;
                      <Tag color="blue"> {attribute.type}</Tag>
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Back
          </Button>
          <Button onClick={() => onClose()}>Close</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Next
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Back
          </Button>
          <Button onClick={() => onClose()}>Close</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Finish
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => onClose(false)}>Close</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Next
        </Button>
      </>
    );
  };

  return (
    <Modal
      width="70%"
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Create Product"
      visible={Open}
      footer={renderFooter()}
      onCancel={() => onClose()}
    >
      <Spin spinning={loading}>
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="Product Information" />
          <Step title="Variations" />
          <Step title="Thrid Step" />
        </Steps>

        {renderContent()}
      </Spin>
    </Modal>
  );
};

export default CreateForm;
