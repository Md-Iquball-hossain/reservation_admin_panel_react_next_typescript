import { ConfigProvider, Row, Typography } from "antd";
import dayjs from "dayjs";
import { InvoiceHeader } from "../FormItem/InvoiceHeader";
import { useGetSingleHotelQuery } from "../../Modules/Settings/api/SettingsEndPoints";

const PrintMoneyReceipt = ({ cashiercomponentRef, data }: any) => {
  const { data: hotel_info } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const MoneyData = [
    {
      client_copy: "Client Copy",
      founded_year: hotel_info?.data.founded_year,
      phone: hotel_info?.data.phone,
      address: hotel_info?.data.address,
      website: hotel_info?.data.website,
      logo: hotel_info?.data.logo,
      name: hotel_info?.data.name,
      money_receipt_no: data?.data?.money_receipt_no,
      created_at: dayjs(data?.data?.created_at).format("DD-MM-YYYY"),
      customer_name: data?.data?.customer_name,
      payment_type: data?.data?.payment_type,
      total_collected_amount: data?.data?.total_collected_amount,
      remarks: data?.data?.remarks,
      margin: "0px 0px",
      padding: "0px 0px",
      border_b: "border-b-2 border-dashed w-full mt-8 border-black",
    },
    {
      client_copy: "Office Copy",
      founded_year: hotel_info?.data.founded_year,
      phone: hotel_info?.data.phone,
      address: hotel_info?.data.address,
      website: hotel_info?.data.website,
      logo: hotel_info?.data.logo,
      name: hotel_info?.data.name,
      money_receipt_no: data?.data?.money_receipt_no,
      created_at: dayjs(data?.data?.created_at).format("DD-MM-YYYY"),
      customer_name: data?.data?.customer_name,
      payment_type: data?.data?.payment_type,
      total_collected_amount: data?.data?.total_collected_amount,
      remarks: data?.data?.remarks,
      margin: "5px 0px",
      padding: "5px 0px",
      border_b: "",
    },
  ];
  return (
    <ConfigProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          // style={{
          //   width: "9in",
          //   display: "flex",
          //   justifyContent: "center",
          //   backgroundColor: "white",
          //   border: "1px solid lightgray",
          //   height: "16.5in",
          // }}
          style={{
            width: "9in",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            border: "1px solid lightgray",
            height: "11.69in",
            color: "black",
          }}
        >
          <div
            ref={cashiercomponentRef}
            style={{
              padding: "0.2in",
              width: "8.27in",
              minHeight: "11.69in",
              position: "relative",
              color: "black",
            }}
          >
            {MoneyData.map((card, index) => (
              <div key={index}>
                <div style={{ margin: card?.margin, padding: card?.padding }}>
                  <InvoiceHeader
                    createdDate={card?.founded_year}
                    phone={card?.phone}
                    address={card?.address}
                    website={card?.website}
                    logo={card?.logo}
                    name={card?.name}
                  />
                  <Row
                    justify="center"
                    style={{ margin: "5px 0px" }}
                    className="flex items-center text-center"
                  >
                    <div className="flex flex-col ">
                      <h2 className="text-lg font-semibold">MONEY RECEIPT</h2>
                      <span>({card?.client_copy})</span>
                    </div>
                  </Row>
                  <div className="grid gap-5 text-black">
                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-1">
                        <span>Receipt No: </span>
                        <div className="flex flex-col">
                          <span>{card?.money_receipt_no}</span>
                          <span className="-mt-[15px]">
                            ................................
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span>Date: </span>
                        <div className="flex flex-col">
                          <span>
                            {dayjs(card?.created_at).format("DD-MM-YYYY")}
                          </span>
                          <span className="-mt-[15px]">
                            ................................
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span>Received with thanks from:</span>
                      <div className="flex flex-col">
                        <span>{card?.customer_name}</span>
                        <span className="-mt-[15px]">
                          ..........................................................................................................................
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-1">
                        <span>Paid Via: </span>
                        <div className="flex flex-col">
                          <span>{card?.payment_type}</span>
                          <span className="-mt-[15px]">
                            ..........................................................................................................
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span>Balance: </span>
                        <div className="flex flex-col">
                          <span>{card?.total_collected_amount}</span>
                          <span className="-mt-[15px]">
                            ...................................................
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span>For the purpose of: </span>
                      <div className="flex flex-col">
                        <span>{card?.remarks}</span>
                        <span className="-mt-[15px]">
                          ...........................................................................................................................................................................................
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-9 ">
                      <div>
                        <div
                          style={{
                            background: "black",
                            marginLeft: "20px",
                            width: "127px",
                            height: "1px",
                          }}
                        />
                        <Typography.Text
                          style={{ marginLeft: "20px", color: "black" }}
                          strong
                        >
                          Customer Signature
                        </Typography.Text>
                      </div>
                      <div>
                        <strong>This is software generated</strong>
                      </div>
                      <div>
                        <div
                          style={{
                            background: "black",
                            marginRight: "20px",
                            width: "113px",
                            height: "1px",
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

                <div className={card?.border_b}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PrintMoneyReceipt;
