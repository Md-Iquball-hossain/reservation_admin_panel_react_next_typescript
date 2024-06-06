import { Card, Empty, Tag, Tooltip } from "antd";
import dayjs from "dayjs";

import { Link } from "react-router-dom";

const CommonRoomlist = ({ data, filterValue }: any) => {
  // const [bookInfo, _setRoomBookingInfo] = useState<any>({room_id:});
  return (
    <>
      {/* {filterValue?.from_date} && {filterValue?.to_date} */}
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mt-4 text-xs lg:text-base">
          {data?.data.map((item: any, index: number) => (
            <Card
              style={
                item?.available_status === 0
                  ? { backgroundColor: "#4a4747", color: "white" }
                  : {
                      backgroundColor: "#076262",
                      color: "white",
                    }
              }
              key={index}
            >
              {/* <Carousel
                autoplay={true}
                effect="fade"
                className="bg-slate-100 h-[150px]  overflow-hidden rounded mb-3 object-cover object-center"
              >
                {item?.room_images?.map((img: any, index: number) => (
                  <Image
                    key={index}
                    src={imageURL + img?.photo}
                    alt={img?.id}
                    // width={"auto"}
                    // height={400}
                    width={"auto"}
                    height={"auto"}
                    className="object-cover object-center"
                  />
                ))}
              </Carousel> */}
              <div className="grid gap-2 text-xs lg:text-base xl:text-xs">
                <div className="flex justify-between">
                  <span>Room Number</span>
                  <span>{item?.room_number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Room Type</span>
                  <span>{item?.room_type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bed Type</span>
                  <span>{item?.bed_type}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Refundable</span>
                  <span>
                    <Tag color={item?.refundable === 0 ? "orange" : "green"}>
                      {item?.refundable === 0
                        ? "Non-Refundable "
                        : "Refundable"}
                    </Tag>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>
                    <Tag color={item?.discount === 0 ? "orange" : "green"}>
                      {item?.discount === 0 ? "No" : "Yes"}
                    </Tag>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Discount Percent</span>
                  <span>
                    {item?.discount_percent
                      ? item?.discount_percent + "%"
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Adult</span>
                  <span>{item?.adult}</span>
                </div>
                <div className="flex justify-between">
                  <span>Child</span>
                  <span>{item?.child}</span>
                </div> */}

                <div className="flex justify-between">
                  <span>Status</span>

                  <Tag
                    color={
                      item?.available_status === 0
                        ? "#7e7d7d"
                        : "rgb(33 117 117)"
                    }
                    style={{ marginRight: "-10px" }}
                  >
                    {item?.available_status === 0 ? "Unavailable" : "Available"}
                  </Tag>
                </div>
                <div className="flex justify-between">
                  <Link
                    to={`/room_detail/${item?.id}`}
                    className={
                      item?.available_status === 0
                        ? "flex text-center text-orange-200 font-bold underline"
                        : "flex text-center text-white font-bold underline"
                    }
                    // target="_blank"
                  >
                    View More Details...
                  </Link>
                  {item?.available_status === 1 ? (
                    <Link
                      to={`/create_room_booking/${item?.id}/${filterValue?.from_date}/${filterValue?.to_date}`}
                      className="flex text-center text-white font-bold"
                    >
                      <span>Book Now</span>
                    </Link>
                  ) : (
                    <Tooltip
                      placement="top"
                      title={
                        <div className="grid gap-2 text-xs lg:text-base xl:text-xs">
                          <div className="flex justify-between">
                            <span>Guest Name</span>
                            <span>
                              {item?.guest_name ? item?.guest_name : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guest Email</span>
                            <span>
                              {item?.guest_email ? item?.guest_email : ""}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Check in Date</span>

                            <span>
                              {dayjs(item?.check_in_time)
                                .subtract(6, "hour")
                                .format("DD-MM-YYYY  (hh:mm A)")
                                ? dayjs(item?.check_in_time)
                                    .subtract(6, "hour")
                                    .format("DD-MM-YYYY  (hh:mm A)")
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <span>Check Out Date</span>
                            <span>
                              {dayjs(item?.check_out_time)
                                .subtract(6, "hour")
                                .format("DD-MM-YYYY  (hh:mm A)")
                                ? dayjs(item?.check_out_time)
                                    .subtract(6, "hour")
                                    .format("DD-MM-YYYY  (hh:mm A)")
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Grand Total</span>
                            <span>
                              {item?.grand_total ? item?.grand_total : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Due Amount</span>
                            <span>
                              {item?.due_amount ? item?.due_amount : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guest Last Balance</span>
                            <span>
                              {item?.user_last_balance
                                ? item?.user_last_balance
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      }
                    >
                      <span>Guest Info</span>
                    </Tooltip>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default CommonRoomlist;
