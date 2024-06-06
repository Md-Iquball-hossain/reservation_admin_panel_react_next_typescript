import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Select,
  Table,
  theme,
} from "antd";
import type { TableProps } from "antd";
import { useRef, useState } from "react";

import dayjs from "dayjs";
import { HomeOutlined } from "@ant-design/icons";
import { TbFileReport } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";

import { IoPrintOutline } from "react-icons/io5";

import moment from "moment";
import { useGetAllHallBookingReportListQuery } from "../api/HallBookingReportEndPoints";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const { RangePicker } = DatePicker;

const AllHallBookingReportList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [_dummy, _setDummy] = useState<any>({});
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });

  const { data: allhallBookingReport, isLoading } =
    useGetAllHallBookingReportListQuery({
      ...filter,
    });

  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Hall Booking Report`,
  });
  const columns: TableProps<any>["columns"] = [
    {
      title: "SL",
      dataIndex: "expense_tr_id",
      key: "0",
      render: (_text, _record, index) => <span>{index + 1 + filter.skip}</span>,
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "1",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Client Email",
      dataIndex: "client_mail",
      key: "client_mail",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Booking No.",
      dataIndex: "booking_no",
      key: "booking_no",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Number Of Hours",
      dataIndex: "number_of_hours",
      key: "number_of_hours",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Total Occupancy",
      dataIndex: "total_occupancy",
      key: "total_occupancy",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Booking Status",
      dataIndex: "booking_status",
      key: "booking_status",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Event Date",
      dataIndex: "event_date",
      key: "event_date",
      render: (text) => (
        <span>{moment(text).format("YYYY-MM-DD hh:mm A")}</span>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "booking_date",
      key: "booking_date",
      render: (text) => (
        <span>{moment(text).format("YYYY-MM-DD hh:mm A")}</span>
      ),
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => <span>{text}</span>,
    },
  ];

  //   console.log(hallBookingData);
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
              <div className="flex items-center gap-1">
                {/* <UserOutlined /> */}

                <span>Report</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <TbFileReport color="#20a09e" />
                <span className="text-[#20a09e] font-semibold">
                  Hall Booking Report
                </span>
              </div>
            ),
          },
        ]}
      />
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
            <Form.Item label="Search By Status" style={{ width: "100%" }}>
              <Select
                placeholder="Search By Status"
                style={{ width: "100%" }}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    booking_status: value ? value : "",
                  })
                }
                defaultValue="All"
                options={[
                  {
                    value: "",
                    label: "All",
                  },
                  {
                    value: "confirmed",
                    label: "Confirmed ",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },

                  {
                    value: "canceled",
                    label: "Canceled",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="Search By Date" style={{ width: "100%" }}>
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
            </Form.Item>
          </Form>

          <Button
            icon={<IoPrintOutline />}
            onClick={handleCashierPrint}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "100px",
            }}
          >
            Print
          </Button>
        </div>
      </Card>
      <div
        ref={cashiercomponentRef}
        // style={{
        //   padding: "0.5in",
        //   width: "8.27in",
        //   minHeight: "11.69in",
        //   position: "relative",
        // }}
      >
        <Table
          size="small"
          scroll={{ x: true }}
          columns={columns}
          loading={isLoading}
          bordered={true}
          dataSource={allhallBookingReport?.data || []}
          onChange={(pagination) => {
            setFilter({
              ...filter,
              skip:
                ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
              limit: pagination.pageSize!,
            });
          }}
          pagination={{
            size: "default",
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50", "100"],
            defaultPageSize: 20,
            total: allhallBookingReport?.total,
            showTotal: (total) => `Total ${total} `,
          }}
          summary={() => (
            <Table.Summary.Row style={{ fontWeight: "bold" }}>
              <Table.Summary.Cell colSpan={7} index={0} align="right">
                Total Amount
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1} index={1} align="left">
                {allhallBookingReport?.totalAmount}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>
    </>
  );
};

export default AllHallBookingReportList;
