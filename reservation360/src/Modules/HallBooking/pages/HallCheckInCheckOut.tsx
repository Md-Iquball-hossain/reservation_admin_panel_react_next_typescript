import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Space,
  Table,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
// import { useGetCustomerListQuery } from "../api/CustomerEndPoints";
import moment from "moment";

import HallCheckOutModal from "../components/HallCheckOutModal";
import { useGetHallCheckInCheckOutQuery } from "../api/HallBookingEndPoints";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const HallCheckInCheckOut = () => {
  const CheckInColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Guest Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Booking Number",
      dataIndex: "booking_no",
      key: "booking_no",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Check In",
      dataIndex: "check_in",
      key: "check_in",
      render: (text) => (
        <span>
          {/* {moment(text).subtract(6, "hour").format("MMMM Do YYYY, h:mm:ss a")}- */}
          {moment(text).add(6, "hour").format("Do MMMM YYYY  (h:mm:ss a)")}
        </span>
      ),
    },
    {
      title: "Check Out",
      dataIndex: "check_out",
      key: "check_out",
      render: (text) => (
        <span>
          {text
            ? moment(text).add(6, "hour").format("Do MMMM YYYY (h:mm A)")
            : "N/A"}
        </span>
      ),
    },
  ];

  const [updateData, setUpdateData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  const { data } = useGetHallCheckInCheckOutQuery({ ...filter });

  console.log("object", data?.data);

  const handleUpdateCheckOut = (data: any) => {
    setUpdateData(data);
    setIsModalOpen(true);
  };

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

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
      <div className="my-5">
        <Breadcrumb
          separator=">"
          items={[
            {
              href: "/",
              title: (
                <>
                  <HomeOutlined className=" me-1" />
                  <span>Dashboard</span>
                </>
              ),
            },
            {
              href: "",
              title: (
                <>
                  {/* <UserOutlined /> */}
                  <span>Hall Check Out</span>
                </>
              ),
            },
            // {
            //   title: <span className="text-[#1B9FA2]">Guest List</span>,
            // },
          ]}
        />
      </div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>Booking Invoice</Typography.Title> */}

          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div className="flex justify-between">
              <div className="flex gap-3 w-full">
                <Col xs={24} sm={12} md={12} lg={4}>
                  <Search
                    placeholder="Search by Booking Number"
                    style={{ width: "100%" }}
                    onChange={(e) => setFilter({ key: e.target.value })}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} lg={4}>
                  <RangePicker
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        from_date:
                          (value && dayjs(value[0]).format("YYYY-MM-DD")) || "",
                        to_date:
                          (value && dayjs(value[1]).format("YYYY-MM-DD")) || "",
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Col>
              </div>

              <div
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "200px",
                }}
                className="py-2"
              >
                <Link
                  to={`/hall-check-in`}
                  className="flex justify-center items-center"
                >
                  <span className="pe-2">
                    <FaArrowLeftLong />
                  </span>
                  Hall Check In
                </Link>
              </div>
            </div>
          </Card>

          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Table
                columns={[
                  ...CheckInColumns,
                  {
                    title: "Status",
                    key: "action",
                    render: (record: any) => (
                      <Space size="middle">
                        {record.status !== "checked-in" ? (
                          <div>
                            <Button
                              size="small"
                              // icon={<EditOutlined />}
                              style={{
                                backgroundColor: "#D04848",
                                color: "white",
                                borderRadius: "50px",
                                width: "160px",
                              }}
                            >
                              Already Checked Out
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="small"
                            // icon={<EditOutlined />}
                            style={{
                              backgroundColor: "#01adad",
                              color: "white",
                              borderRadius: "50px",
                              width: "150px",
                            }}
                            onClick={() => handleUpdateCheckOut(record)}
                          >
                            Make Check Out
                          </Button>
                        )}
                      </Space>
                    ),
                  },
                ]}
                dataSource={data?.data && data.data.length > 0 ? data.data : []}
                bordered={true}
                key={"user_id"}
                rowKey="user_id"
                scroll={{ x: true }}
                // pagination={{ showSizeChanger: true }}
                onChange={(pagination) => {
                  setFilter({
                    ...filter,
                    skip:
                      ((pagination.current || 1) - 1) *
                      (pagination.pageSize || 10),
                    limit: pagination.pageSize!,
                  });
                }}
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30", "50", "100"],
                  total: data?.total,
                  showTotal: (total) => `Total ${total} `,
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <HallCheckOutModal
        updateData={updateData}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default HallCheckInCheckOut;
