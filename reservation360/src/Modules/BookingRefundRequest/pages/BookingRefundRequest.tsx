import {
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import { Link } from "react-router-dom";

const bookingInvoiceColumns: ColumnsType<any> = [
  {
    title: "Booking",
    dataIndex: "userid",
    key: "userid",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Booking",
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Booking",
    dataIndex: "agencyname",
    key: "agencyname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Booking",
    dataIndex: "specializations",
    key: "specializations",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Booking",
    dataIndex: "is_verified",
    key: "is_verified",
    render: (text) => <a>{text ? "Verified" : "Non-Verified"}</a>,
  },
];

const BookingRefundRequest = () => {
  //   const [filterValue, setFilterValue] = useState("all");
  //   const { data } = useGetAgentListQuery({ data: filterValue });
  //   console.log("object", data);
  //   const [deleteAgentData, { isSuccess }] = useDeleteAgentMutation();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  //   const handleFilterChange = (value: string) => {
  //     setFilterValue(value);
  //   };

  //   const deleteAgentList = async (id: string) => {
  //     try {
  //       const response = await deleteAgentData({
  //         id: Number(id),
  //       });
  //       if (isSuccess) {
  //         console.log("Update successful", response);
  //       }
  //     } catch (error) {
  //       // Handle error
  //       console.error("Update failed", error);
  //     }
  //   };

  return (
    <div>
      <Row
        justify="center"
        align="middle"
        style={{ maxWidth: "auto" }}
        // style={{
        //   boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
        //   marginBottom: "1rem",
        // }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Booking Refind Request </Typography.Title>
          <hr className="mb-4" />
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row>
              {/* <Col xs={24} sm={12} md={12} lg={6}>
                      <Search
                        placeholder="Search by Company"
                        style={{ width: "100%" }}
                      />
                    </Col> */}
              <Col xs={24} sm={12} md={12} lg={2}>
                <Select
                  defaultValue="all"
                  style={{ width: "100%" }}
                  //   onChange={handleFilterChange}
                >
                  <Select.Option value="all">Status</Select.Option>
                  <Select.Option value="true">Verified</Select.Option>
                  <Select.Option value="false">Non-Verified</Select.Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={12} lg={2} className="ms-5">
                <Select
                  defaultValue="all"
                  style={{ width: "100%" }}
                  //   onChange={handleFilterChange}
                >
                  <Select.Option value="all">Name</Select.Option>
                  <Select.Option value="true">Verified</Select.Option>
                  <Select.Option value="false">Non-Verified</Select.Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={12} lg={2} className="ms-5">
                <Form.Item

                //   onChange={handleFilterChange}
                >
                  <DatePicker onChange={onChange} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* <TransactionForm /> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Table
                columns={[
                  ...bookingInvoiceColumns,
                  {
                    title: "View",
                    key: "action",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render: (record: any) => (
                      <Space size="middle">
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          //   onConfirm={() => {
                          //     deleteAgentList(record.userid);
                          //   }}
                          okText="Yes"
                          cancelText="No"
                        >
                          {" "}
                          <DeleteOutlined
                            style={{
                              cursor: "pointer",
                              paddingRight: "20px",
                            }}
                          />
                        </Popconfirm>
                        <Link to={`/agentView/${record.userid}`}>
                          <Tooltip title="View">
                            <EditOutlined
                              style={{
                                cursor: "pointer",
                                paddingRight: "20px",
                              }}
                            />
                          </Tooltip>
                        </Link>

                        {/* More actions can be added here */}
                      </Space>
                    ),
                  },
                ]}
                // dataSource={data?.data && data.data.length > 0 ? data.data : []}
                // key={data?.data?.userid}
                rowKey="agentListId"
                scroll={{ x: true }}
                pagination={{ showSizeChanger: true }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookingRefundRequest;
