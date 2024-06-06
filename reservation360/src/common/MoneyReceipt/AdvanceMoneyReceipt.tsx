import { ConfigProvider, Row, Typography } from "antd";
import dayjs from "dayjs";
import { useGetSingleHotelQuery } from "../../Modules/Settings/api/SettingsEndPoints";
import { ResponsiveInvoiceHeader } from "../FormItem/InvoiceHeader";
const AdvanceMoneyReceipt = ({ data }: any) => {
  const { data: hotel_info } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // {},
  // {
  //   refetchOnMountOrArgChange: true,
  // }

  const MoneyData = [
    {
      client_copy: "Client Copy",
      header: (
        <ResponsiveInvoiceHeader
          createdDate={hotel_info?.data.founded_year}
          phone={hotel_info?.data.phone}
          address={hotel_info?.data.address}
          website={hotel_info?.data.website}
          logo={hotel_info?.data.logo}
          name={hotel_info?.data.name}
        />
      ),
      money_receipt_no: data?.data?.money_receipt_no,
      created_at: dayjs(data?.data?.created_at).format("DD-MM-YYYY"),
      guest_name: data?.data?.guest_name,
      payment_type: data?.data?.payment_type,
      returned_amount: data?.data?.returned_amount,
      return_date: dayjs(data?.data?.return_date).format("DD-MM-YYYY"),
      remarks: data?.data?.remarks,
      margin: "0px 0px",
      padding: "0px 0px",
      border_b: "border-b-2 border-dashed w-full mt-8 border-black",
    },
    {
      client_copy: "Office Copy",
      header: (
        <ResponsiveInvoiceHeader
          createdDate={hotel_info?.data.founded_year}
          phone={hotel_info?.data.phone}
          address={hotel_info?.data.address}
          website={hotel_info?.data.website}
          logo={hotel_info?.data.logo}
          name={hotel_info?.data.name}
        />
      ),
      money_receipt_no: data?.data?.money_receipt_no,
      created_at: dayjs(data?.data?.created_at).format("DD-MM-YYYY"),
      return_date: dayjs(data?.data?.return_date).format("DD-MM-YYYY"),
      guest_name: data?.data?.guest_name,
      payment_type: data?.data?.payment_type,
      returned_amount: data?.data?.returned_amount,
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
        <div className="w-[2.5in] md:w-[5in] lg:w-[7in] xl:w-[9in] lg:h-[11in] xl:h-[11.69in] flex justify-center bg-white border border-lightgray ">
          <div
            className="p-[0.2in] w-[8.27in] min-h-[11.69in]
               relative text-black"
          >
            {MoneyData.map((card, index) => (
              <div key={index}>
                <div style={{ margin: card?.margin, padding: card?.padding }}>
                  {card?.header}
                  <Row
                    justify="center"
                    style={{ margin: "5px 0px" }}
                    className="flex items-center text-center"
                  >
                    <div className="flex flex-col ">
                      <h2 className="text-lg font-semibold">
                        ADVANCE PAYMENT RECEIPT
                      </h2>
                      <span>({card?.client_copy})</span>
                    </div>
                  </Row>
                  <div className="grid gap-5">
                    <div className="flex justify-end items-center">
                      <div className="flex flex-col md:flex-row items-baseline gap-1">
                        <span>Date: </span>

                        <span className="border-b border-b-black border-dashed w-full">
                          {card?.created_at}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-baseline gap-1">
                      <span>Received with thanks from:</span>

                      <span className="border-b border-b-black border-dashed w-full">
                        {card?.guest_name}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="flex items-baseline gap-1">
                        <span>Paid Via: </span>

                        <span className="border-b border-b-black border-dashed ">
                          {card?.payment_type}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row items-baseline gap-1">
                        <span>Ammount: </span>

                        <span className="border-b border-b-black border-dashed ">
                          {card?.returned_amount}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row items-baseline gap-1">
                        <span>Return Date: </span>

                        <span className="border-b border-b-black border-dashed ">
                          {card?.return_date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-baseline gap-1 ">
                      <span>For the purpose of: </span>

                      <span className="border-b border-b-black border-dashed w-full">
                        {card?.remarks}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-9 ">
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
                      <div className="text-black hidden md:block">
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
                <div className={card?.border_b}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdvanceMoneyReceipt;
