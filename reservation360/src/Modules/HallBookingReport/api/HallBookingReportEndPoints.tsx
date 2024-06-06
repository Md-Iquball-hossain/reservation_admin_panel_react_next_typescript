/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import {
  HallBookingReportParams,
  IHallBookingReportAllList,
} from "../types/HallbookingReportTypes";
import { HALLBOOKINGREPORT } from "./HallBookingReportConstant";

export const hallBookingReportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAllHallBookingReportList: build.query<
      HTTPResponse<IHallBookingReportAllList[]>,
      HallBookingReportParams
    >({
      query: (params) => {
        const url = `/reservation/report/hall-booking`;
        return {
          url,
          params,
        };
      },
      providesTags: () => [
        { type: "HallBookingReport", id: HALLBOOKINGREPORT },
      ],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const { useGetAllHallBookingReportListQuery } =
  hallBookingReportEndPoint;
