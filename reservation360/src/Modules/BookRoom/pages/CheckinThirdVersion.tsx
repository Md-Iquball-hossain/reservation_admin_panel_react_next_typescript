/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";

// import { useEffect } from "react";

import { useEffect } from "react";

import {
  useCreateCheckInMutation,
  useGetRoomBookingSingleDetailsQuery,
} from "../api/RoomBookingEndPoints";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

interface CheckInSecProps {
  bookingId: number | null;

  setIsModalOpen: any;
  isModalOpen: any;
}
const CheckinThirdVersion: React.FC<CheckInSecProps> = ({ bookingId }) => {
  // const navigate = useNavigate();

  //   console.log("data", data?.data);
  const { data: singleRoom } = useGetRoomBookingSingleDetailsQuery(
    Number(bookingId)
  );
  console.log("bookingId", bookingId);
  console.log("singleRoom", singleRoom?.data);
  const [createCheckIn, { isSuccess }] = useCreateCheckInMutation();

  const [form] = Form.useForm();

  //   useEffect(() => {
  //     if (singleRoom) {
  //       form.setFieldsValue({
  //         name: singleRoom?.data?.name,
  //         booking_id: singleRoom?.data?.id,
  //         check_in: dayjs(singleRoom?.data?.check_in_time).subtract(6, "hour"),
  //       });
  //     }
  //   }, [singleRoom, form]);

  const onFinish = (_values: any) => {
    const bookingCheckIn = {
      check_in: dayjs(singleRoom?.data?.check_in_time)
        .subtract(6, "hour")
        .format("YYYY-MM-DD HH:mm:ss"),
      booking_id: singleRoom?.data?.id,
    };
    createCheckIn(bookingCheckIn);
    console.log("bookingCheckIn", bookingCheckIn);
  };

  useEffect(() => {
    if (isSuccess) {
      //   form.resetFields();
      // navigate(`/check-in-check-out`);
    }
  }, [form, isSuccess]);

  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Button
          size="small"
          // type="primary"
          htmlType="submit"
          style={{
            borderRadius: "50px",
            backgroundColor: "#01adad",
            color: "white",
            fontSize: "small",
            width: "160px",
          }}
        >
          Room Check In
        </Button>
      </Form>
    </>
  );
};

export default CheckinThirdVersion;
