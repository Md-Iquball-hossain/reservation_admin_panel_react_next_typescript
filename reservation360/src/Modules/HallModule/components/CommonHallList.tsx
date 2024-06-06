import { Card, Col, Tag } from "antd";

import { Link } from "react-router-dom";

const CommonHallList = ({ data, filterValue }: any) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mt-4 text-xs lg:text-base">
        {data?.data.map((item: any, index: number) => (
          <Col key={index} xs={24} md={24}>
            <Card
              // style={
              //   item?.available_status === 0
              //     ? { backgroundColor: "#4a4747", color: "white" }
              //     : {
              //         backgroundImage: `url('/bg/Shiny Overlay.svg')`,
              //         color: "white",
              //       }
              // }
              style={
                item?.available_status === 0
                  ? { backgroundColor: "#4a4747", color: "white" }
                  : {
                      backgroundColor: "#076262",
                      color: "white",
                    }
              }
            >
              {/* <Carousel
                autoplay={true}
                effect="fade"
                className="bg-slate-100 h-[150px]  overflow-hidden rounded mb-3"
              >
                {item?.hall_images?.map((img: any, index: number) => (
                  <Image
                    key={index}
                    src={imageURL + img?.photo}
                    alt={img?.id}
                    width={"auto"}
                    height={400}
                    className="object-cover object-center"
                  />
                ))}
              </Carousel> */}
              <div className="grid gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Hall Name</span>
                  <span>{item?.hall_name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hall Size</span>
                  <span>
                    {item?.hall_size ? `${item?.hall_size} sqft` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hall Capacity</span>
                  <span>
                    {item?.capacity ? `${item?.capacity} People` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rate Per Hour</span>
                  <span>
                    {item?.rate_per_hour ? `${item?.rate_per_hour}` : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>
                  <span>
                    <Tag
                      color={
                        item?.available_status === 0
                          ? "#7e7d7d"
                          : "rgb(33 117 117)"
                      }
                      style={{ marginRight: "-10px" }}
                    >
                      {item?.available_status === 0
                        ? "Unavailable"
                        : "Available"}
                    </Tag>
                  </span>
                </div>
                <div className="flex justify-between">
                  <Link
                    to={`/hall-details/${item?.hall_id}`}
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
                      to={`/create-hall-booking/${item?.hall_id}/${filterValue?.event_date}/${filterValue?.start_time}/${filterValue?.end_time}`}
                      className="flex text-center text-white font-bold"
                    >
                      <span>Book Now</span>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </div>
    </>
  );
};

export default CommonHallList;
