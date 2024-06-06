import { Button, Col, Form, message } from "antd";
import dayjs from "dayjs";

import { useCreateCheckOutMutation } from "../api/RoomBookingEndPoints";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ICreateCheckOutResponse {
  success: boolean;
  other_due?: number; // Make other_due optional
  message: string;
  error?: {
    status: number;
    data: {
      success: boolean;
      data: {
        other_due: number;
      };
      message: string;
    };
  };

  isSuccess: any;
}

const CheckOutVersionThree = ({
  updateData,
  checkoutdate,
  GuestId,
  invoiceid,
  due,
}: any) => {
  const [CheckOut, { error, isSuccess }] =
    useCreateCheckOutMutation<ICreateCheckOutResponse>();
  console.log("response", error?.data?.data?.other_due);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const [test, _setTest] = useState<any>({ dddd: 0, hjhhh: "mmmm" });

  const onFinish = (_values: any) => {
    if (due && Number(due) <= 0) {
      const bookingCheckOut = {
        check_out: dayjs(checkoutdate)
          .subtract(6, "hour")
          .format("YYYY-MM-DD HH:mm:ss"),
      };

      CheckOut({ id: updateData, data: bookingCheckOut });
    } else {
      // message.error(`The guest has due amount of ${due}`);
      navigate(`/money-receipt/add-receipt/${GuestId}/${invoiceid}/room`);
    }
  };

  useEffect(() => {
    if (error?.data?.data?.other_due === 1) {
      navigate(`/money-receipt/add-receipt/${GuestId}/money-receipt/room`);
      // navigate(`/money-receipt/add-receipt/${GuestId}/${test}/room`);
    }
  }, [form, error]);
  useEffect(() => {
    if (isSuccess) {
      message.success("Checked Out Successfully");
    }
  }, [isSuccess]);

  return (
    <>
      {/* {dayjs(checkoutdate).subtract(6, "hour").format("YYYY-MM-DD HH:mm:ss")} */}
      {/* {GuestId},{invoiceid},{due} */}
      <Form onFinish={onFinish} layout="vertical" form={form}>
        {due && Number(due) > 0 ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              size="small"
              // icon={<EditOutlined />}
              style={{
                backgroundColor: "#ff7733",
                color: "white",
                borderRadius: "50px",
                // width: "160px",
                width: "100%",
                fontSize: "small",
              }}
              htmlType="submit"
            >
              Pay Due
            </Button>
          </Col>
        ) : (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              size="small"
              // icon={<EditOutlined />}
              style={{
                backgroundColor: "#33cc00",
                color: "white",
                borderRadius: "50px",
                // width: "160px",
                width: "100%",
                fontSize: "small",
              }}
              htmlType="submit"
            >
              Make Check Out
            </Button>
          </Col>
        )}
      </Form>
    </>
  );
};

export default CheckOutVersionThree;
