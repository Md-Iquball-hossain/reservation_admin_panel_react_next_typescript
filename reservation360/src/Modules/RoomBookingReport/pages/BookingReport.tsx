import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Row,
  Select,
  Table,
  Tag,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
// import { useGetReportListQuery } from "../api/ReportEndPoints";

import { IoPrintOutline } from "react-icons/io5";

import { HomeOutlined } from "@ant-design/icons";

import "../../../App.css";
import { useReactToPrint } from "react-to-print";
import { useGetBookingReportListQuery } from "../api/BookingReportEndpoints";
import dayjs from "dayjs";
import { TbFileReport } from "react-icons/tb";

import { useGetHotelRoomListQuery } from "../../RoomModule/api/HotelRoomEndPoints";
import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";
// import PrintableReport from "../components/PrintableReport";

const { RangePicker } = DatePicker;
const BookingReport = () => {
  const themeGlobal = useAppSelector(globalTheme);
  // Helper function to format date in YYYY-MM-DD format
  const [roomTypeList, setRoomTypeList] = useState<any>([]);
  const [dummy, _setRoomTypeList] = useState<any>({});
  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  // Get current date
  const currentDate = new Date();

  // Get the start of the current week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  // Get the end of the current week (Saturday)
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
  const getStatusColor = (value: string) => {
    switch (value) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "volcano";
      case "left":
        return "blue";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getStatusText = (value: string) => {
    switch (value) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      case "left":
        return "Left";
      default:
        return "Unknown Status";
    }
  };
  const getCheckIn_outColor = (value: string) => {
    // console.log("getCheckIn_outColor", value);

    switch (value) {
      case "checked-in":
        return "green";
      case "checked-out":
        return "red";
      case undefined:
        return "orange";
      default:
        return ""; // You can specify a default color if needed
    }
  };

  const getCheckIn_out_text = (value: string) => {
    // console.log("getCheckIn_out_text", value);
    switch (value) {
      case "checked-in":
        return "Checked In";
      case "checked-out":
        return "Checked Out";
      case undefined:
        return "Pending";
      default:
        return "Make Check In";
    }
  };
  const [filter, setFilter] = useState<any>({
    // from_date: dayjs().format("YYYY-MM-DD"),
    // to_date: dayjs().format("YYYY-MM-DD"),
    from_date: formatDate(startOfWeek),
    to_date: formatDate(endOfWeek),
    skip: 0,
    limit: 20,
    room_id: "",
    pay_status: "",
  });
  console.log("filter", filter);
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });

  const { data } = useGetBookingReportListQuery({ ...filter });
  const { data: roomTypesData } = useGetHotelRoomListQuery(dummy);
  console.log(" roomTypesData?.data", roomTypesData?.data);

  useEffect(() => {
    if (roomTypesData) {
      const roomTypeListFromData =
        roomTypesData?.data?.map((value: any, index: any) => ({
          value: Number(value.id),
          label: value.room_number,
          key: `room_${value.room_number}_${index}`,
        })) || [];

      // Prepend the "All" option to the room type list
      const roomTypeListWithAll = [
        {
          value: "",
          label: "All",
          key: "room_all",
        },
        ...roomTypeListFromData,
      ];

      setRoomTypeList(roomTypeListWithAll);
    }
  }, [roomTypesData]);

  const reportListColumns: ColumnsType<any> = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Guest Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
      className: "custom-header-style",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Total Guest",
      dataIndex: "total_occupancy",
      key: "total_occupancy",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Number Of Nights",
      dataIndex: "number_of_nights",
      key: "number_of_nights",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Extra Charge",
      dataIndex: "extra_charge",
      key: "extra_charge",
      render: (text) => <span>{text ? text : 0}</span>,
    },

    {
      title: "Pay Status",
      dataIndex: "pay_status",
      key: "pay_status",
      render: (text) => (
        <span>
          {text === 1 ? (
            <Tag color="green">Pay</Tag>
          ) : (
            <Tag color="red">Non-Pay</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Booked Room",
      dataIndex: "reserved_room",
      key: "reserved_room",
      render: (text) => (
        <span>
          {text === 1 ? (
            <Tag color="red">Booked</Tag>
          ) : (
            <Tag color="green">Not Booked</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          <Tag color={getStatusColor(status ?? "")}>
            {getStatusText(status ?? "")}
          </Tag>
        </>
      ),
    },
    {
      title: "Check In / Out Status",
      key: "check_in_out_status",
      dataIndex: "check_in_out_status",
      render: (_, { check_in_out_status }) => (
        <>
          <Tag color={getCheckIn_outColor(check_in_out_status ?? "")}>
            {getCheckIn_out_text(check_in_out_status ?? "")}
          </Tag>
        </>
      ),
    },
    {
      title: "Check In Time",
      dataIndex: "check_in_time",
      key: "check_in_time",
      render: (text) => <span>{dayjs(text).format("YYYY-MM-DD hh:mm A")}</span>,
    },
    {
      title: "Check Out Time",
      dataIndex: "check_out_time",
      key: "check_out_time",
      render: (text) => <span>{dayjs(text).format("YYYY-MM-DD hh:mm A")}</span>,
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
    },
  ];

  const onSearch = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px", marginTop: "20px" }}
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
                <span>Report</span>
              </>
            ),
          },
          {
            title: (
              <div className="flex items-center gap-1">
                <TbFileReport color="#20a09e" />
                <span className="text-[#20a09e] font-semibold">
                  Room Booking Report
                </span>
              </div>
            ),
          },
        ]}
      />

      {/* <PrintableReport ref={componentRef} /> */}
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
              backgroundImage:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? `url('/bg/svg (3).png')`
                  : `url('/bg/svg (4).png')`,

              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col xl:flex-row justify-between items-center">
              <Form
                layout="vertical"
                className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px]"
              >
                <Form.Item label="Search By Date" style={{ width: "100%" }}>
                  <RangePicker
                    defaultValue={[
                      dayjs(formatDate(startOfWeek)),
                      dayjs(formatDate(endOfWeek)),
                    ]}
                    // onChange={handleDateChange}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        from_date:
                          (value && dayjs(value[0]).format("YYYY-MM-DD")) ||
                          formatDate(startOfWeek),
                        to_date:
                          (value && dayjs(value[1]).format("YYYY-MM-DD")) ||
                          formatDate(endOfWeek),
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item label="Serach By Room" style={{ width: "100%" }}>
                  <Select
                    defaultValue={""}
                    style={{ width: "100%" }}
                    placeholder="Select Room"
                    showSearch
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={roomTypeList}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        room_id: value ? value : "",
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Serach By Pay Status"
                  style={{ width: "100%" }}
                >
                  <Select
                    defaultValue={""}
                    style={{ width: "100%" }}
                    placeholder="Select Pay Status"
                    showSearch
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                      {
                        value: "",
                        label: "All",
                      },
                      {
                        value: "1",
                        label: "Pay",
                      },
                      {
                        value: "0",
                        label: "No Pay",
                      },
                    ]}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        pay_status: value !== "" ? parseInt(value, 10) : "",
                      })
                    }
                  />
                </Form.Item>
              </Form>

              <Button
                // onClick={handlePrint}
                onClick={handleCashierPrint}
                icon={<IoPrintOutline />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "100px",
                }}
              >
                Print
              </Button>
              {/* <Button
                  icon={<HiOutlineDocumentReport />}
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "140px",
                    marginLeft: "10px",
                  }}
                >
                  Excel Report
                </Button> */}
            </div>
          </Card>

          <div ref={cashiercomponentRef}>
            {data ? (
              <Table
                size="small"
                columns={[...reportListColumns]}
                dataSource={
                  data?.data && data?.data.length > 0 ? data?.data : []
                }
                key={"id"}
                rowKey="id"
                bordered
                scroll={{ x: true }}
                onChange={(pagination) => {
                  setFilter({
                    ...filter,
                    skip:
                      ((pagination.current || 1) - 1) *
                      (pagination.pageSize || 20),
                    limit: pagination.pageSize!,
                  });
                }}
                pagination={{
                  size: "default",
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30", "50", "100"],
                  defaultPageSize: 20,
                  // current: filter.skip + 1,
                  total: data?.total,
                  showTotal: (total) => `Total ${total} `,
                }}
                className="custom-table"
                summary={() => (
                  <Table.Summary.Row style={{ fontWeight: "bold" }}>
                    <Table.Summary.Cell colSpan={4} index={0} align="right">
                      Total Guest
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} index={1} align="left">
                      {data?.totalGuest}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={8} index={2} align="right">
                      Total Amount
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} index={3} align="left">
                      {data?.totalAmount}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            ) : (
              <Empty />
            )}
          </div>
        </Col>
      </Row>
      <div className="hidden">
        {/* <PrintableReport componentRef={componentRef} /> */}
      </div>
      {/* <div ref={ref}>hello</div> */}
    </>
  );
};

export default BookingReport;
