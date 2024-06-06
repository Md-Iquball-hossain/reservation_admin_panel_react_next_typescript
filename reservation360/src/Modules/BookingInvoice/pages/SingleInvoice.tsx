import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetInvoiceDetailsQuery } from "../api/BookingInvoiceEndPoints";

import { IoPrintOutline } from "react-icons/io5";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import InvoiceVersionTwo from "../../../common/Invoice/InvoiceVersionTwo";
import InvoiceForPrint from "../../../common/Invoice/InvoiceForPrint";

const SingleInvoice = () => {
  const { id } = useParams();
  const { data } = useGetInvoiceDetailsQuery(Number(id));

  const theme = localStorage.getItem("theme");
  console.log("id", id, theme);

  // const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 0;
  //     }
  //     @media print {
  //       body {
  //         margin: 0;
  //       }
  //     }
  //   `,
  // });
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  return (
    <>
      <Breadcrumb
        className="my-5"
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
                <span>Invoice</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  View Invoice
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5 borde0 border-[#20a09e]" />

      <div className="flex justify-start gap-3">
        <Link to={`/invoice/booking-invoice`}>
          <Col xs={24} sm={12} md={12} lg={3}>
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
              }}
            >
              Retun to Invoice List
            </Button>
          </Col>
        </Link>

        <Button
          style={{
            backgroundColor: "#01adad",
            color: "white",
            borderRadius: "50px",
            width: "100px",
          }}
          // onClick={handlePrint}
          onClick={handleCashierPrint}
          icon={<IoPrintOutline />}
        >
          Print
        </Button>
      </div>

      <InvoiceVersionTwo data={data} />

      <InvoiceForPrint cashiercomponentRef={cashiercomponentRef} data={data} />
    </>
  );
};

export default SingleInvoice;
