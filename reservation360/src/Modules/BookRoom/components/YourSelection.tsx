import { Card, Divider } from "antd";

import dayjs from "dayjs";

const YourSelection = ({
  date,
  date_out,
  bookList,
  // form,
  roomHistoryList,
  updatedBookingRooms,
  sum,
  selectedRoom,
  numberOfNights,
  Payment,
  bookListPartial,
  EMAIL,
  NAME,
}: any) => {
  return (
    <>
      <Card
        title={
          <span className="text-base text-emerald-800 font-bold">
            Your Selection
          </span>
        }
        className="w-[500px] 2xl:w-[700px] mb-[500px] mt-[50px] overflow-hidden hidden xl:block text-xs xl:text-base"
      >
        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-emerald-600 font-bold">Check-In</span>
          <span className="text-emerald-600 font-bold">------------</span>
          <span className="text-emerald-600 font-bold text-sm 2xl:text-base">
            Check-Out
          </span>
        </div>

        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-base">
            {date && dayjs(date).format("DD-MM-YYYY (hh:mm a)")}
          </span>
          <span className="text-sm 2xl:text-base">
            {date_out && dayjs(date_out).format("DD-MM-YYYY (hh:mm a)")}
          </span>
        </div>

        <div className="grid gap-5 mt-5 text-sm 2xl:text-base">
          <div className="flex justify-between items-baseline ">
            <span className="font-bold">Guest Name</span>
            <span className="font-bold"></span>
            {/* <span>{bookList?.name ? bookList?.name : "-"}</span> */}
            <span>{NAME ? NAME : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline ">
            <span className=" font-bold">E-mail</span>
            <span className="font-bold"></span>
            {/* <span>{bookList?.email ? bookList?.email : "-"}</span> */}
            <span>{EMAIL ? EMAIL : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline ">
            <span className=" font-bold  ">NID No.</span>
            <span className="font-bold"></span>
            <span>{bookList?.nid_no ? bookList?.nid_no : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline text-sm 2xl:text-base">
            <span className=" font-bold">Passport No.</span>
            <span className="font-bold"></span>
            <span>{bookList?.passport_no ? bookList?.passport_no : "-"}</span>
          </div>
          {/* {form.getFieldValue("payment_method") === 2 ? (
            <>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Discount Amount</span>
                <span className="font-bold"></span>
                <span className="">
                  {bookList?.discount_amount ? bookList?.discount_amount : 0}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Tax Amount</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.tax_amount ? bookList?.tax_amount : 0}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Paid Amount</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.paid_amount ? bookList?.paid_amount : 0}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Payment Type</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.payment_type ? bookList?.payment_type : "-"}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Account Name</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.ac_tr_ac_id ? bookList?.ac_tr_ac_id : "-"}
                </span>
              </div>
            </>
          ) : (
            ""
          )} */}

          <div className="flex justify-between items-baseline text-sm 2xl:text-base">
            <span className=" font-bold text-sm 2xl:text-base">
              Total no of guests
            </span>
            <span className="font-bold"></span>
            <span className="">
              {bookList?.total_occupancy ? bookList?.total_occupancy : 0}
            </span>
          </div>
        </div>
        <Divider />
        <div className="mt-10">
          <div className="flex justify-center text-base font-bold mb-5">
            {roomHistoryList.length === 1 || roomHistoryList.length === 0 ? (
              <span>Selected Room</span>
            ) : (
              <span>List Of Selected Rooms</span>
            )}
          </div>
          {roomHistoryList.length > 0 ? (
            <>
              {roomHistoryList?.map((value: any, index: number) => (
                <div
                  className="grid gap-5 mt-5 border-b-2 border-dotted border-slate-300 pb-4"
                  key={index}
                >
                  <div className="flex flex-col gap-1">
                    {/* <span className="text-base font-bold">{index + 1} Room</span> */}
                    <div className="flex gap-2 items-baseline text-sm 2xl:text-base">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold ">
                          {index + 1} &#41;
                        </span>
                        <span className="text-base font-bold">
                          {value.room_type}
                        </span>
                      </div>

                      <span className="font-bold">-</span>
                      <span className="text-base font-bold text-slate-500">
                        &#40;{value.room_number}&#41;
                      </span>
                    </div>
                    <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                      {value.bed_type}
                    </span>
                    <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                      Max {value.adult} Adluts | {value.child} child Per Room
                    </span>
                    <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                      {value.rate_per_night
                        ? `Rate per night : ${value.rate_per_night}`
                        : ""}
                    </span>
                    <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                      {value.discout_amount
                        ? `Room discount : ${value.discout_amount}`
                        : ""}
                    </span>
                    {/* <span className="text-slate-600 font-semibold ml-3">
                    {value.discout_amount > 0
                      ? `Total cost per night :  ${
                          value.rate_per_night - value.discout_amount
                        }`
                      : ""}
                  </span> */}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {updatedBookingRooms?.map((value: any, index: number) => (
                <div
                  className="grid gap-5 mt-5 border-b-2 border-dotted border-slate-300 pb-4"
                  key={index}
                >
                  <div className="flex flex-col gap-1 text-sm 2xl:text-base">
                    {/* <span className="text-base font-bold">{index + 1} Room</span> */}
                    <div className="flex gap-2 items-baseline">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold ">
                          {index + 1} &#41;
                        </span>
                        <span className="text-base font-bold">
                          {value.room_type}
                        </span>
                      </div>

                      <span className="font-bold">-</span>
                      <span className="text-base font-bold text-slate-500">
                        &#40;{value.room_number}&#41;
                      </span>
                    </div>
                    <span className="text-slate-600 font-semibold ml-3">
                      {value.bed_type}
                    </span>
                    <span className="text-slate-600 font-semibold ml-3">
                      Max {value.adult} Adluts | {value.child} child Per Room
                    </span>
                    <span className="text-slate-600 font-semibold ml-3">
                      {value.rate_per_night
                        ? `Rate per night : ${value.rate_per_night}`
                        : ""}
                    </span>
                    <span className="text-slate-600 font-semibold ml-3">
                      {value.discout_amount
                        ? `Room discount : ${value.discout_amount}`
                        : ""}
                    </span>
                    {/* <span className="text-slate-600 font-semibold ml-3">
                    {value.discout_amount > 0
                      ? `Total cost per night :  ${
                          value.rate_per_night - value.discout_amount
                        }`
                      : ""}
                  </span> */}
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="grid gap-2 mt-5 border-b-2 border-slate-400 pb-2 text-sm 2xl:text-base">
            <div className="flex justify-between font-semibold text-blue-600">
              <span className="font-semibold">Total no. of Adult</span>
              <span>{sum?.totaladults}</span>
            </div>
            <div className="flex justify-between font-semibold text-yellow-600">
              <span className="font-semibold">Total no. of Child</span>
              <span>+ {sum?.totalchild}</span>
            </div>
          </div>
          <div
            // className={`flex justify-between font-semibold text-fuchsia-500 mt-2 ${
            //   bookList?.total_occupancy > sum?.totalGuest
            //     ? "animate-pulse"
            //     : ""
            // }`}

            className="flex justify-between font-semibold text-fuchsia-500 mt-2 text-sm 2xl:text-base"
          >
            {/* <div
              className={`flex justify-between font-semibold text-fuchsia-500 mt-2 ${
                sum?.totalGuest
                  ? bookList?.total_occupancy > sum?.totalGuest
                    ? "animate-pulse"
                    : ""
                  : bookList?.total_occupancy >
                    selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
                  ? "animate-pulse"
                  : ""
              }`}
            > */}
            <span className="font-semibold text-sm 2xl:text-base">
              Total no. of Room Capacity
            </span>
            {/* <span>{sum?.totalGuest}</span> */}
            <span>
              {sum?.totalGuest
                ? sum?.totalGuest
                : selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
                ? selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
                : 0}
            </span>
          </div>
          <div className="flex justify-between mt-2 text-sm 2xl:text-base">
            <span className="font-semibold">Total no. of Rooms</span>

            {/* <span>{roomHistoryList.length}</span> */}
            <span>
              {roomHistoryList && roomHistoryList.length > 0
                ? roomHistoryList.length
                : selectedRoom && selectedRoom.length}
            </span>
          </div>
          {/* <div className="flex justify-between font-semibold mt-2">
            <span className="font-semibold">Total Room Cost </span>
            <span>
              {sum?.totalRoomCharge
                ? sum?.totalRoomCharge
                : selectedRoom?.[0]?.rate_per_night
                ? selectedRoom?.[0]?.rate_per_night
                : 0}
       
            </span>
          </div> */}
          {/* <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2">
            <span className="font-semibold">Extra Charge</span>
            <span>+{bookList?.extra_charge ? bookList?.extra_charge : 0}</span>
          </div> */}
          <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
            <span className="font-semibold">Payment Mode</span>
            {Payment === 0 || Payment === 2 || Payment === 1 ? (
              <>
                {Payment === 0 && <span>Partial Payment</span>}
                {Payment === 2 && <span>Full Payment</span>}
                {Payment === 1 && <span>No Payment</span>}
              </>
            ) : (
              "Select Payment Mode"
            )}
          </div>

          {(date && date_out && Payment === 0) ||
          Payment === 2 ||
          Payment === 1 ? (
            <>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">Extra Charge</span>
                <span>
                  +{bookList?.extra_charge ? bookList?.extra_charge : 0}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">Tax Amount</span>
                {Payment === 1 && <span>{bookList?.tax_amount ?? 0}</span>}
                {Payment === 0 && (
                  <span>+{bookListPartial?.tax_amount ?? 0}</span>
                )}
                {Payment === 2 && <span>+{bookList?.tax_amount ?? 0}</span>}
              </div>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">Discount Amount</span>

                {Payment === 0 && (
                  <span>-{bookListPartial?.discount_amount ?? 0}</span>
                )}
                {Payment === 2 && (
                  <span>-{bookList?.discount_amount ?? 0}</span>
                )}
                {Payment === 1 && (
                  <span>-{bookList?.discount_amount ?? 0}</span>
                )}
              </div>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">
                  Total Cost
                  {numberOfNights === 1 || numberOfNights === 0
                    ? ` for 1 day`
                    : ` for ${numberOfNights} days`}
                </span>
                <span>
                  {/* {(
                    (sum?.totalRoomCharge ?? 0) +
                    (bookList?.extra_charge ?? 0) +
                    (bookList?.tax_amount ? bookList?.tax_amount : 0) -
                    (bookList?.discount_amount ? bookList?.discount_amount : 0)
                  ).toLocaleString()} */}
                  {Payment === 2 &&
                    (sum?.totalRoomCharge
                      ? (sum?.totalRoomCharge ?? 0) +
                        (bookList?.extra_charge ?? 0) +
                        (bookList?.tax_amount ?? 0) -
                        (bookList?.discount_amount ?? 0)
                      : numberOfNights !== 0
                      ? numberOfNights *
                        (Number(
                          (selectedRoom &&
                            selectedRoom.length > 0 &&
                            selectedRoom?.[0]?.rate_per_night) ??
                            0
                        ) +
                          Number(bookList?.extra_charge ?? 0) +
                          Number(bookList?.tax_amount ?? 0) -
                          Number(bookList?.discount_amount ?? 0))
                      : 1 *
                        (Number(
                          (selectedRoom &&
                            selectedRoom.length > 0 &&
                            selectedRoom?.[0]?.rate_per_night) ??
                            0
                        ) +
                          Number(bookList?.extra_charge ?? 0) +
                          Number(bookList?.tax_amount ?? 0) -
                          Number(bookList?.discount_amount ?? 0)))}
                  {Payment === 0 &&
                    (sum?.totalRoomCharge
                      ? (sum?.totalRoomCharge ?? 0) +
                        (bookListPartial?.extra_charge ?? 0) +
                        (bookListPartial?.tax_amount ?? 0) -
                        (bookListPartial?.discount_amount ?? 0)
                      : numberOfNights !== 0
                      ? numberOfNights *
                        (Number(
                          (selectedRoom &&
                            selectedRoom.length > 0 &&
                            selectedRoom?.[0]?.rate_per_night) ??
                            0
                        ) +
                          Number(bookListPartial?.extra_charge ?? 0) +
                          Number(bookListPartial?.tax_amount ?? 0) -
                          Number(bookListPartial?.discount_amount ?? 0))
                      : 1 *
                        (Number(
                          (selectedRoom &&
                            selectedRoom.length > 0 &&
                            selectedRoom?.[0]?.rate_per_night) ??
                            0
                        ) +
                          Number(bookListPartial?.extra_charge ?? 0) +
                          Number(bookListPartial?.tax_amount ?? 0) -
                          Number(bookListPartial?.discount_amount ?? 0)))}
                  {Payment === 1 &&
                    (sum?.totalRoomCharge
                      ? (sum?.totalRoomCharge ?? 0) +
                        (bookListPartial?.extra_charge ?? 0) +
                        (bookListPartial?.tax_amount ?? 0) -
                        (bookListPartial?.discount_amount ?? 0)
                      : numberOfNights !== 0
                      ? numberOfNights *
                        (Number(
                          (selectedRoom &&
                            selectedRoom.length > 0 &&
                            selectedRoom?.[0]?.rate_per_night) ??
                            0
                        ) +
                          Number(bookListPartial?.extra_charge ?? 0) +
                          Number(bookListPartial?.tax_amount ?? 0) -
                          Number(bookListPartial?.discount_amount ?? 0))
                      : 1 *
                        (Number(
                          (selectedRoom &&
                            selectedRoom.length > 0 &&
                            selectedRoom?.[0]?.rate_per_night) ??
                            0
                        ) +
                          Number(bookListPartial?.extra_charge ?? 0) +
                          Number(bookListPartial?.tax_amount ?? 0) -
                          Number(bookListPartial?.discount_amount ?? 0)))}
                  {/* {Payment === 1 &&
                  (sum?.totalRoomCharge
                    ? (sum?.totalRoomCharge ?? 0) +
                      (bookList?.extra_charge ?? 0)
                    : 0)} */}
                  {/* {sum?.totalRoomCharge
                  ? (sum?.totalRoomCharge ?? 0) +
                    (bookList?.extra_charge ?? 0) +
                    (bookList?.tax_amount ? bookList?.tax_amount : 0) -
                    (bookList?.discount_amount ? bookList?.discount_amount : 0)
                  : numberOfNights != 0
                  ? numberOfNights *
                    (Number(
                      (selectedRoom &&
                        selectedRoom.length > 0 &&
                        selectedRoom?.[0]?.rate_per_night) ??
                        0
                    ) +
                      Number(bookList?.extra_charge ?? 0) +
                      Number(bookList?.tax_amount ? bookList?.tax_amount : 0) -
                      Number(
                        bookList?.discount_amount
                          ? bookList?.discount_amount
                          : 0
                      ))
                  : 1 *
                    (Number(
                      (selectedRoom &&
                        selectedRoom.length > 0 &&
                        selectedRoom?.[0]?.rate_per_night) ??
                        0
                    ) +
                      Number(bookList?.extra_charge ?? 0) +
                      Number(bookList?.tax_amount ? bookList?.tax_amount : 0) -
                      Number(
                        bookList?.discount_amount
                          ? bookList?.discount_amount
                          : 0
                      ))} */}
                </span>
              </div>
            </>
          ) : (
            <div className="font-semibold mt-2 text-sm 2xl:text-base">
              Select <strong> Check in & Check out date and time </strong> and
              select
              <strong> Mode of Payment</strong> to see total cost
            </div>
          )}
          {/* {date && date_out ? (
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2">
                <span className="font-semibold">
                  Total Discount Ammount
                  {numberOfNights === 1
                    ? ` for ${numberOfNights} day`
                    : ` for ${numberOfNights} days`}
                </span>
                <span>
                  - {sum?.totaldiscountAmmount ? sum?.totaldiscountAmmount : 0}
                </span>
              </div>
            ) : (
              ""
            )}
            {date && date_out ? (
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2">
                <span className="font-semibold">
                  Total Cost
                  {numberOfNights === 1
                    ? ` for ${numberOfNights} day`
                    : ` for ${numberOfNights} days`}{" "}
                  with Discount
                </span>
                <span>
                  {(
                    (sum?.totalcostwithdiscount ?? 0) +
                    (bookList?.extra_charge ?? 0)
                  ).toLocaleString()}
                </span>
              </div>
            ) : (
              ""
            )} */}
        </div>
      </Card>
    </>
  );
};

export default YourSelection;
