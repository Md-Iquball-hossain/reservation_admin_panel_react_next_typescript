import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Button, Card, Col, Input, Row, Upload, Badge } from "antd";

const GuestForm = () => {
  const [form] = Form.useForm();
  //   const { Option } = Select;

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Badge.Ribbon text="Create Guest" placement="start">
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row
              align={"middle"}
              justify={"space-between"}
              style={{ marginBottom: "1rem" }}
            >
              {/* <Typography.Title level={5}>Create Guest</Typography.Title> */}
            </Row>

            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Card style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <Row align={"middle"} gutter={[20, 16]}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true }]}
                      label="Name"
                      required
                    >
                      <Input placeholder="Enter Name" type="text" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="email"
                      rules={[{ required: true }]}
                      label="Email"
                      required
                    >
                      <Input placeholder="Enter Email" type="email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="password"
                      rules={[{ required: true }]}
                      label="Password"
                      required
                    >
                      <Input placeholder="Enter Password" type="password" />
                    </Form.Item>
                  </Col>

                  {/* <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Select Role"
                    name="role"
                    initialValue="Admin"
                  >
                    <Select>
                      <Option value="Admin">Admin</Option>
                      <Option value="super_admin">Super Admin</Option>
                    </Select>
                  </Form.Item>
                </Col> */}

                  <Col span={8}>
                    <Form.Item name="photo" label="Photo" required>
                      <Upload
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        listType="picture"
                        beforeUpload={() => false}
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Form.Item style={{ marginTop: "1rem" }}>
                <Button htmlType="submit" icon={<SendOutlined />}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Row>
  );
};

export default GuestForm;
