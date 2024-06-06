/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Row,
  Space,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import GlobalLoader from "../../../components/loader/GlobalLoader";
import { useGetSingleExpenseQuery } from "../api/ExpenseEndPoint";
import { InvoiceHeader } from "../../../common/FormItem/InvoiceHeader";

const ExpenseView = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetSingleExpenseQuery(Number(id));

  const {
    ac_type,
    account_name,
    bank_name,
    // branch,
    expense_created_at,
    expense_details,
    expense_items,
    expense_name,
    voucher_no,
    // remaining_balance,
    total_cost,
    hotel_phone,
    hotel_website,
    hotel_logo,
    hotel_address,
    hotel_name,
  } = data?.data || {};

  // const theme = localStorage.getItem("theme");

  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  if (isLoading) {
    return <GlobalLoader />;
  }
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
                  <span>Expense</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Expense View</span>,
            },
          ]}
        />
      </div>

      <Space style={{ marginBottom: "1rem" }}>
        <Link to="/expense/expense-list">
          <Button
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeftOutlined />
            Return to All Expense List
          </Button>
        </Link>
        <Button
          onClick={handleCashierPrint}
          style={{
            backgroundColor: "#01adad",
            color: "white",
            borderRadius: "50px",
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PrinterOutlined />
          Print
        </Button>
      </Space>
      <ConfigProvider
      // theme={{
      //   algorithm: theme.defaultAlgorithm,
      // }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "9in",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              border: "1px solid lightgray",
            }}
          >
            <div
              ref={cashiercomponentRef}
              style={{
                padding: "0.5in",
                width: "8.27in",
                minHeight: "11.69in",
                position: "relative", // Set the parent container to relative positioning
              }}
            >
              <div style={{ margin: "5px 0px", padding: "5px 0px" }}>
                <InvoiceHeader
                  createdDate={expense_created_at}
                  phone={hotel_phone}
                  address={hotel_address}
                  website={hotel_website}
                  logo={hotel_logo}
                  name={hotel_name}
                />
                <hr className="my-4" />
                <div className="space-y-1 ">
                  <div style={{ textAlign: "left", color: "black" }}>
                    <Typography.Text strong className="text-black">
                      <div
                        className="w-[8rem] "
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        Voucher No.
                      </div>
                      : {voucher_no}
                    </Typography.Text>
                    <br />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <Typography.Text strong className="text-black">
                      <div
                        className="w-[8rem]"
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        Pay Type
                      </div>
                      : {ac_type}
                    </Typography.Text>
                    <br />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <Typography.Text strong className="text-black">
                      <div
                        className="w-[8rem]"
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        Bank Name
                      </div>
                      : {bank_name}
                    </Typography.Text>
                    <br />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <Typography.Text strong className="text-black">
                      <div
                        className="w-[8rem]"
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        Account Name
                      </div>
                      : {account_name}
                    </Typography.Text>
                    <br />
                  </div>
                </div>

                {expense_details && (
                  <div className="mt-10">
                    <Typography.Text
                      strong
                      style={{ marginTop: "5px" }}
                      className="text-black"
                    >
                      Note : {expense_details}
                    </Typography.Text>
                  </div>
                )}

                <Row justify="center" style={{ margin: "20px 0px" }}>
                  <Typography.Title
                    underline
                    level={3}
                    style={{ color: "black" }}
                  >
                    Expense
                  </Typography.Title>
                </Row>
                <div className="text-black">
                  <table className="table-auto border border-collapse  w-full">
                    <thead className="bg-[#E3E9EB] text-Black">
                      <tr>
                        <th className="border ps-5 py-1 text-left">SL</th>
                        <th className="border ps-5 py-1 text-left">
                          Expense Name
                        </th>
                        <th className="border ps-5 py-1 text-left">
                          Expense Head
                        </th>

                        <th className="border ps-5 py-1 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expense_items?.map((item: any, index: number) => (
                        <tr key={item.id}>
                          <td className="border px-5 py-1">{index + 1}</td>
                          <td className="border px-5 py-1">
                            {expense_name ? expense_name : "N/A"}
                          </td>
                          <td className="border px-5 py-1">
                            {item?.expense_head}
                          </td>

                          <td className="border px-5 py-1">{item?.amount}</td>
                        </tr>
                      ))}

                      <tr>
                        <td
                          colSpan={3}
                          className="border pe-14 py-1 text-right "
                        >
                          Total
                        </td>
                        <td className="border px-5 py-1  "> {total_cost}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    position: "absolute", // Position these divs absolutely within the parent container
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem 0", // Add some margin for separation
                  }}
                >
                  <div>
                    <div
                      style={{
                        background: "black",
                        marginLeft: "20px",
                        width: "127px",
                        height: "1px",
                        color: "black",
                      }}
                    />
                    <Typography.Text
                      style={{ marginLeft: "20px", color: "black" }}
                      strong
                    >
                      Customer Signature
                    </Typography.Text>
                  </div>
                  <div className="text-black">
                    <strong>This is software generated</strong>
                  </div>
                  <div>
                    <div
                      style={{
                        background: "black",
                        marginRight: "20px",
                        width: "113px",
                        height: "1px",
                        color: "black",
                      }}
                    />
                    <Typography.Text
                      style={{ marginRight: "20px", color: "black" }}
                      strong
                    >
                      Authority Signature
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default ExpenseView;
